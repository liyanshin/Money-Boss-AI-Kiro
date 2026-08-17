import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, PieChart, Calendar } from 'lucide-react';

interface AnalyticsScreenProps {
  currencySymbol: string;
  onNavigate: (screen: any) => void;
}

export const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({ currencySymbol, onNavigate }) => {
  const [period, setPeriod] = useState<'Day' | 'Week' | 'Month' | 'Year'>('Month');

  const heatmapData = [
    1, 2, 0, 3, 4, 1, 0,
    2, 4, 1, 0, 2, 3, 1,
    0, 1, 3, 4, 2, 0, 1,
    2, 0, 1, 4, 3, 2, 0,
    1, 3, 2, 0, 1, 4, 2
  ];

  return (
    <div className="min-h-full bg-black text-white pb-24 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="pt-12 px-6 flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition active:scale-95"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="font-['Space_Grotesk'] text-xl font-extrabold text-white">
              Detailed Analytics
            </h1>
            <p className="text-xs text-neutral-400">Deep spending, KP & habit patterns</p>
          </div>
        </div>
      </div>

      {/* Period Toggle */}
      <div className="mx-6 p-1 bg-white/5 border border-white/10 rounded-2xl flex text-xs font-bold">
        {(['Day', 'Week', 'Month', 'Year'] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`flex-1 py-2 rounded-xl transition ${
              period === p ? 'bg-purple-600 text-white shadow-lg' : 'text-neutral-400 hover:text-white'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Category Breakdown Donut */}
      <div className="mx-6 p-5 rounded-3xl bg-white/5 border border-white/10 space-y-4">
        <h3 className="font-['Space_Grotesk'] text-sm font-bold text-white flex items-center gap-2">
          <PieChart size={16} className="text-purple-400" /> Category Breakdown ({period})
        </h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
          <div className="relative w-36 h-36 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              <circle cx="50" cy="50" r="38" fill="none" stroke="#3b82f6" strokeWidth="12" strokeDasharray="60 238" strokeDashoffset="0" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#a855f7" strokeWidth="12" strokeDasharray="80 238" strokeDashoffset="-60" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#f97316" strokeWidth="12" strokeDasharray="50 238" strokeDashoffset="-140" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray="48 238" strokeDashoffset="-190" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-['Space_Grotesk'] text-base font-extrabold text-white">
                {currencySymbol}4,800
              </span>
              <span className="text-[9px] text-neutral-400">Total Spent</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs w-full">
            {[
              { color: 'bg-orange-500', label: 'Food (43%)', amount: '2,040' },
              { color: 'bg-purple-500', label: 'Wants (30%)', amount: '1,440' },
              { color: 'bg-blue-500', label: 'Transport (16%)', amount: '780' },
              { color: 'bg-emerald-500', label: 'Health (11%)', amount: '540' }
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 bg-black/40 p-2 rounded-xl border border-white/5">
                <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                <div>
                  <div className="text-[10px] text-neutral-400">{item.label}</div>
                  <div className="font-bold text-white">{currencySymbol}{item.amount}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Spending Heatmap */}
      <div className="mx-6 p-5 rounded-3xl bg-white/5 border border-white/10 space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-['Space_Grotesk'] text-sm font-bold text-white flex items-center gap-2">
            <Calendar size={16} className="text-purple-400" /> Spending Heatmap
          </h3>
          <span className="text-[10px] text-neutral-400">Last 5 Weeks (Mon–Sun)</span>
        </div>
        <div className="grid grid-cols-7 gap-1.5 pt-2">
          {heatmapData.map((level, idx) => {
            const bg =
              level === 0 ? 'bg-white/5'
              : level === 1 ? 'bg-purple-900/40 border border-purple-500/20'
              : level === 2 ? 'bg-purple-700/60 border border-purple-500/40'
              : level === 3 ? 'bg-purple-600 border border-purple-400'
              : 'bg-fuchsia-500 shadow-[0_0_10px_rgba(192,38,211,0.8)]';
            return (
              <div
                key={idx}
                className={`aspect-square rounded-md transition-all ${bg}`}
                title={`Day ${idx + 1}`}
              />
            );
          })}
        </div>
        <div className="flex items-center justify-end gap-1.5 text-[9px] text-neutral-400 pt-1">
          <span>Less</span>
          <span className="w-2.5 h-2.5 rounded bg-white/5" />
          <span className="w-2.5 h-2.5 rounded bg-purple-900/40" />
          <span className="w-2.5 h-2.5 rounded bg-purple-700/60" />
          <span className="w-2.5 h-2.5 rounded bg-purple-600" />
          <span className="w-2.5 h-2.5 rounded bg-fuchsia-500" />
          <span>More</span>
        </div>
      </div>

      {/* Savings Rate Line Graph */}
      <div className="mx-6 p-5 rounded-3xl bg-white/5 border border-white/10 space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-['Space_Grotesk'] text-sm font-bold text-white flex items-center gap-2">
            <TrendingUp size={16} className="text-emerald-400" /> Savings Rate Over Time
          </h3>
          <span className="text-xs font-bold text-emerald-400">+12.4% MoM</span>
        </div>
        <div className="pt-2">
          <svg className="w-full h-20 overflow-visible" viewBox="0 0 300 60" preserveAspectRatio="none">
            <defs>
              <linearGradient id="savingsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(16,185,129,0.4)" />
                <stop offset="100%" stopColor="rgba(16,185,129,0)" />
              </linearGradient>
            </defs>
            <path
              d="M0,45 C50,40 100,20 150,25 C200,30 250,10 300,8"
              fill="none"
              stroke="#10b981"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M0,45 C50,40 100,20 150,25 C200,30 250,10 300,8 L300,60 L0,60 Z"
              fill="url(#savingsGrad)"
            />
          </svg>
          <div className="flex justify-between text-[10px] text-neutral-500 pt-2">
            <span>Mar</span><span>Apr</span><span>May</span>
            <span>Jun</span><span>Jul</span><span>Aug</span>
          </div>
        </div>
      </div>

      {/* Powered by badge */}
      <div className="mx-6 pb-2">
        <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-600">
          <span>Analytics powered by</span>
          <span className="text-orange-400 font-bold">Kiro</span>
          <span>+</span>
          <span className="text-orange-300 font-bold">Amazon Bedrock</span>
        </div>
      </div>
    </div>
  );
};
