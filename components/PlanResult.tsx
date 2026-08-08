
import React from 'react';
import { DietPlan } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface PlanResultProps {
  plan: DietPlan;
}

const PlanResult: React.FC<PlanResultProps> = ({ plan }) => {
  const chartData = [
    { name: 'Protein', value: plan.macroRatio.protein, color: '#10b981' },
    { name: 'Carbs', value: plan.macroRatio.carbs, color: '#3b82f6' },
    { name: 'Fats', value: plan.macroRatio.fats, color: '#f59e0b' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-20">
      
      {/* Dynamic Header with Brain Score */}
      <div className="bg-white rounded-[2rem] p-1 shadow-2xl overflow-hidden border border-indigo-100">
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 p-8 text-white relative">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest">Balanced Architecture</span>
              </div>
              <h3 className="text-4xl font-black mb-2 flex items-center justify-center md:justify-start gap-3">
                 Holistic Energy Plan
              </h3>
              <p className="text-emerald-50 max-w-md opacity-90">
                A 50/50 synergy between physical metabolic health and cognitive peak performance.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    className="text-white/20"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={351.8}
                    strokeDashoffset={351.8 - (351.8 * plan.brainHealthScore) / 100}
                    className="text-white"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black leading-none">{plan.brainHealthScore}</span>
                  <span className="text-[10px] font-bold uppercase opacity-70">Neuro Score</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start">
            {plan.neuroPowerIngredients.map((item, i) => (
              <span key={i} className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl text-xs font-bold border border-white/20 flex items-center gap-2">
                🌟 {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Physical Stats */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-emerald-50">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="text-emerald-500">💪</span> Physical Fuel
          </h3>
          <div className="flex items-center justify-between">
             <div>
               <p className="text-emerald-600 text-5xl font-black mb-1">{plan.dailyCalories}</p>
               <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Total Calories</p>
             </div>
             <div className="h-32 w-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={chartData} cx="50%" cy="50%" innerRadius={30} outerRadius={45} paddingAngle={5} dataKey="value">
                      {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
             </div>
          </div>
        </div>

        {/* Cognitive Insight */}
        <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z"/></svg>
           </div>
           <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
             <span className="text-indigo-500">🧠</span> Cognitive Strategy
           </h3>
           <p className="text-indigo-800 leading-relaxed italic text-base">
             "{plan.brainHealthInsight}"
           </p>
        </div>
      </div>

      {/* Meal Breakdown */}
      <div className="space-y-10">
        <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
          <div className="w-2 h-8 bg-emerald-500 rounded-full"></div>
          Balanced Meal Sequence
        </h3>
        
        <div className="space-y-8">
          {plan.meals.map((meal, index) => (
            <div key={index} className="group bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-sm border border-gray-100 hover:shadow-2xl hover:border-emerald-200 transition-all duration-500">
              <div className="flex flex-col lg:flex-row gap-12">
                
                {/* Status Column */}
                <div className="lg:w-1/3 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest">
                      {meal.type}
                    </span>
                    <span className="text-gray-400 text-xs font-bold uppercase">{meal.calories} Kcal</span>
                  </div>
                  <h4 className="text-3xl font-black text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {meal.name}
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                      <p className="text-[10px] font-bold text-emerald-700 uppercase mb-1">Body Benefit</p>
                      <p className="text-xs font-medium text-gray-800 leading-tight">{meal.physicalBenefit}</p>
                    </div>
                    <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-100">
                      <p className="text-[10px] font-bold text-indigo-700 uppercase mb-1">Brain Benefit</p>
                      <p className="text-xs font-medium text-gray-800 leading-tight">{meal.cognitiveBenefit}</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <p className="text-xs text-gray-500 font-medium italic border-l-2 border-emerald-200 pl-3">
                      "{meal.mentalHealthImpact}"
                    </p>
                  </div>
                </div>

                {/* Detail Column */}
                <div className="lg:w-2/3 space-y-8">
                   <p className="text-gray-600 text-lg leading-relaxed font-light">
                     {meal.description}
                   </p>
                   
                   <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
                      <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Healing Synergy Breakdown</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {meal.ingredientBenefits.map((item, i) => (
                          <div key={i} className="flex gap-4 items-start">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0"></div>
                            <div>
                              <span className="block font-black text-gray-800 text-sm">{item.ingredient}</span>
                              <span className="text-xs text-gray-500 leading-relaxed">{item.benefit}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Holistic Wisdom Section */}
      <div className="bg-emerald-950 text-white rounded-[3rem] p-12 lg:p-16 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full"></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4">
            <h3 className="text-4xl font-black mb-4">Integrative Wellness</h3>
            <p className="text-emerald-200/70 text-sm leading-relaxed">
              Your South Indian nutrition plan is engineered to synchronize physical metabolism with neural efficiency.
            </p>
          </div>
          
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {plan.generalTips.map((tip, i) => (
              <div key={i} className="flex gap-5 items-start">
                <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                  <span className="text-emerald-400 font-bold">{i+1}</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanResult;
