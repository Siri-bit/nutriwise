
import React from 'react';
import { PlanHistoryItem } from '../types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

interface ProgressChartProps {
  history: PlanHistoryItem[];
  onClear: () => void;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ history, onClear }) => {
  if (history.length === 0) return null;

  const data = history.map(item => ({
    date: new Date(item.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    calories: item.plan.dailyCalories,
    protein: item.plan.meals.reduce((acc, meal) => acc + meal.protein, 0),
    weight: item.profile.weight,
  }));

  return (
    <div className="glass-panel p-6 rounded-3xl shadow-xl border border-white space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Nutritional Trends</h3>
          <p className="text-sm text-gray-500">History of your generated plans</p>
        </div>
        <button 
          onClick={onClear}
          className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
        >
          Clear History
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="h-[300px] w-full bg-white/50 p-4 rounded-2xl border border-emerald-50">
          <h4 className="text-sm font-semibold text-emerald-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Daily Calorie Targets
          </h4>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorCal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="date" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Area type="monotone" dataKey="calories" stroke="#10b981" fillOpacity={1} fill="url(#colorCal)" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="h-[300px] w-full bg-white/50 p-4 rounded-2xl border border-blue-50">
          <h4 className="text-sm font-semibold text-blue-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            Daily Protein Trend (g)
          </h4>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="date" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Line type="monotone" dataKey="protein" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;
