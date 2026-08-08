
import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, DietPlan, PlanHistoryItem } from './types';
import { generateDietPlan } from './geminiService';
import InputForm from './components/InputForm';
import PlanResult from './components/PlanResult';
import ProgressChart from './components/ProgressChart';

const STORAGE_KEY = 'nutriwise_history';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
  const [history, setHistory] = useState<PlanHistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const saveToHistory = (plan: DietPlan, profile: UserProfile) => {
    const newItem: PlanHistoryItem = {
      timestamp: Date.now(),
      plan,
      profile
    };
    const updatedHistory = [...history, newItem].slice(-10); // Keep last 10 entries
    setHistory(updatedHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    if (confirm("Are you sure you want to clear your progress history?")) {
      setHistory([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleGenerate = async (profile: UserProfile) => {
    setLoading(true);
    setError(null);
    setDietPlan(null);

    try {
      const plan = await generateDietPlan(profile);
      setDietPlan(plan);
      saveToHistory(plan, profile);
      
      // Smooth scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      console.error("Failed to generate diet plan:", err);
      setError("We encountered an issue generating your plan. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-100 rounded-2xl shadow-inner mb-2">
            <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Nutri<span className="text-emerald-600">Wise</span> AI
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the future of personalized nutrition. Our AI dietitian crafts balanced, 
            age-specific diet plans tailored precisely to your body and lifestyle goals.
          </p>
        </header>

        <main className="space-y-12">
          {/* Progress Section (Always visible if history exists) */}
          {history.length > 0 && (
            <section className="animate-in fade-in duration-1000">
              <ProgressChart history={history} onClear={clearHistory} />
            </section>
          )}

          {/* Form Section */}
          <section className="glass-panel p-8 rounded-3xl shadow-2xl border border-white">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm">
                {history.length > 0 ? history.length + 1 : '1'}
              </span>
              Update Profile & Generate
            </h2>
            <InputForm onSubmit={handleGenerate} isLoading={loading} />
          </section>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-xl animate-bounce">
              <div className="flex items-center gap-3">
                <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Result Section */}
          {dietPlan && (
            <div ref={resultsRef} className="pt-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center text-lg">✨</span>
                Latest Personalized Plan
              </h2>
              <PlanResult plan={dietPlan} />
              
              <div className="mt-12 text-center">
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-emerald-600 font-semibold hover:text-emerald-700 underline underline-offset-4 decoration-emerald-200 hover:decoration-emerald-400 transition-all"
                >
                  Adjust your profile? Back to top
                </button>
              </div>
            </div>
          )}
        </main>

        <footer className="mt-20 py-8 border-t border-emerald-100 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} NutriWise AI. Powered by Google Gemini.</p>
          <p className="mt-2 text-xs opacity-75 italic">Disclaimer: AI-generated plans are for educational purposes. Consult a medical professional before starting any new diet regimen.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
