import React, { useState } from 'react';
import { Mentor, Transaction, CategoryBudget, FinancialGoal, Currency } from '../types';
import { Wallet, Plus, Bell, ChevronRight, Sparkles, Landmark, Banknote } from 'lucide-react';

interface HomeDashboardProps {
  balance: number;
  currency: Currency;
  currencySymbol: string;
  mentor: Mentor;
  kp: number;
  multiplier: number;
  transactions: Transaction[];
  budgets: CategoryBudget[];
  goal: FinancialGoal;
  pmLeft: number;
  pmTotal: number;
  onNavigate: (screen: any) => void;
  onTriggerReaction: (cat: string, name: string, amount: number) => void;
  customImage?: string;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  balance, currency, currencySymbol, mentor, kp, multiplier,
  transactions, budgets, goal, pmLeft, pmTotal,
  onNavigate, onTriggerReaction, customImage
}) => {
  const [chartPeriod, setChartPeriod] = useState<'W' | 'M'>('W');

  const goalPct = Math.min(100, Math.round((goal.savedAmount / goal.targetAmount) * 100));
  const pmPct = Math.max(0, Math.round((pmLeft / pmTotal) * 100));
  const displayImage = customImage || mentor.avatarImage;

  const moodStatus =
    pmPct > 50
      ? { text: `On track! ${pmPct}% pocket budget safe`, color: 'text-emerald-400', badge: 'Good Standing' }
      : pmPct > 20
      ? { text: 'Approaching category threshold limits', color: 'text-amber-400', badge: 'Warning State' }
      : { text: 'Overspend breach risk high!', color: 'text-rose-400', badge: 'Critical Guard' };

  return (
    <div className="min-h-full bg-black text-white pb-24 space-y-5 animate-fadeIn">
      {/* Header */}
      <div className="pt-12 px-6 flex items-center justify-between">
        <div>
          <span className="text-xs text-neutral-400 font-medium">Welcome Back 👋</span>
          <h1 className="font-['Space_Grotesk'] text-2xl font-extrabold text-white">
            Money Boss <span className="text-purple-400">HQ</span>
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onNavigate('analytics')}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-neutral-300 transition relative"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(123,46,255,1)]" />
          </button>
        </div>
      </div>

      {/* Wallet Card */}
      <div className="mx-6 p-6 rounded-3xl bg-gradient-to-br from-purple-900/30 via-indigo-900/40 to-black border border-purple-500/40 shadow-[0_8px_32px_rgba(0,0,0,0.6)] space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -right-2 -bottom-4 text-7xl font-mono font-extrabold text-purple-400/5 select-none pointer-events-none">₹ $</div>

        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
            <Wallet size={14} className="text-purple-400" /> Total Net Wallet
          </span>
          <button
            type="button"
            onClick={() => onNavigate('currency-select')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold transition active:scale-95 cursor-pointer"
          >
            <span className="text-emerald-400 font-extrabold">₹</span>
            <span className="text-neutral-500 text-[10px]">/</span>
            <span className="text-emerald-300 font-extrabold">$</span>
            <span className="text-[10px] text-neutral-200 font-bold ml-0.5">{currency}</span>
            <span className="text-[10px] text-emerald-400/80 uppercase font-semibold underline">Switch</span>
          </button>
        </div>

        <div className="font-['Space_Grotesk'] text-4xl font-extrabold text-white tracking-tight flex items-baseline">
          <span className="text-emerald-400 font-bold mr-1.5">{currencySymbol}</span>
          {balance.toLocaleString()}
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400"><Banknote size={14} /></div>
            <div>
              <div className="text-[10px] text-neutral-400">Cash Wallet</div>
              <div className="font-bold text-neutral-200">{currencySymbol}{(balance * 0.25).toFixed(0)}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400"><Landmark size={14} /></div>
            <div>
              <div className="text-[10px] text-neutral-400">Bank Accounts</div>
              <div className="font-bold text-neutral-200">{currencySymbol}{(balance * 0.75).toFixed(0)}</div>
            </div>
          </div>
          <button
            onClick={() => onNavigate('records')}
            className="px-3 py-1.5 rounded-xl bg-purple-600/80 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1 transition"
          >
            <Plus size={14} /> Add
          </button>
        </div>
      </div>

      {/* Goal Progress */}
      <div
        onClick={() => onNavigate('budgets')}
        className="mx-6 p-5 rounded-3xl bg-white/5 border border-purple-500/30 hover:border-purple-500/50 transition cursor-pointer flex items-center gap-5 shadow-lg"
      >
        <div className="relative w-20 h-20 flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path className="text-white/10" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path className="text-purple-400 transition-all duration-1000" strokeDasharray={`${goalPct}, 100`} strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-['Space_Grotesk'] text-lg font-extrabold text-white">{goalPct}%</div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Active Quest</span>
            <ChevronRight size={16} className="text-neutral-500" />
          </div>
          <h3 className="font-['Space_Grotesk'] text-base font-bold text-white truncate mt-0.5">{goal.title}</h3>
          <p className="text-xs text-neutral-400 truncate">{goal.description}</p>
          <div className="flex items-center gap-2 mt-2 text-xs">
            <span className="font-bold text-emerald-400">{currencySymbol}{goal.savedAmount.toLocaleString()} saved</span>
            <span className="text-neutral-500">•</span>
            <span className="text-neutral-400">Target: {currencySymbol}{goal.targetAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Pocket Money Widget */}
      <div className="mx-6 p-5 rounded-3xl bg-white/5 border border-white/10 space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <div className="font-['Space_Grotesk'] text-2xl font-extrabold text-white">
              {currencySymbol}{pmLeft.toLocaleString()}{' '}
              <span className="text-xs font-normal text-neutral-400">left</span>
            </div>
            <div className="text-xs text-neutral-400">Pocket Money Allowance Pool</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-amber-400">{pmPct}%</div>
            <div className="text-[10px] text-neutral-400">Remaining</div>
          </div>
        </div>
        <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              pmPct > 50 ? 'bg-gradient-to-r from-purple-500 to-indigo-500' : pmPct > 20 ? 'bg-amber-500' : 'bg-rose-500'
            }`}
            style={{ width: `${pmPct}%` }}
          />
        </div>
        <div className="grid grid-cols-4 gap-2 pt-1">
          {budgets.slice(0, 4).map((b) => (
            <div key={b.id} className="bg-white/5 border border-white/5 rounded-xl p-2 text-center">
              <div className="text-sm">{b.icon}</div>
              <div className="text-[9px] text-neutral-400 truncate mt-1">{b.cat}</div>
              <div className="text-xs font-bold text-neutral-200 mt-0.5">{currencySymbol}{(b.limit - b.spent).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mentor Reaction Zone */}
      <div
        onClick={() => onNavigate('ai-coach')}
        className="mx-6 p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-black border border-purple-500/40 hover:border-purple-400 transition cursor-pointer flex items-center gap-4 shadow-md"
      >
        <div className="w-14 h-14 rounded-2xl overflow-hidden border border-purple-400/40 flex-shrink-0 bg-neutral-900 relative">
          {displayImage ? (
            <img src={displayImage} alt={mentor.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
          ) : null}
          <div className="absolute inset-0 flex items-center justify-center text-2xl -z-10">{mentor.avatarFallbackEmoji}</div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Active Mentor: {mentor.name}</span>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/5 ${moodStatus.color}`}>{moodStatus.badge}</span>
          </div>
          <p className="text-xs font-semibold text-white mt-1 italic truncate">"{mentor.lines.warn}"</p>
          <div className="text-[10px] text-neutral-400 mt-1 flex items-center gap-1">
            <Sparkles size={10} className="text-purple-400" /> Tap to consult AI Money Coach (Kiro + Bedrock)
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-6 space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-['Space_Grotesk'] text-base font-bold text-white">Recent Transactions</h3>
          <button onClick={() => onNavigate('records')} className="text-xs text-purple-400 hover:text-purple-300 font-semibold">
            Full Records Manager →
          </button>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-3xl divide-y divide-white/5 overflow-hidden">
          {transactions.slice(0, 5).map((t) => (
            <div
              key={t.id}
              onClick={() => { if (t.type === 'expense') onTriggerReaction(t.cat, t.name, t.amount); }}
              className="p-4 flex items-center justify-between hover:bg-white/5 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${t.type === 'income' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-purple-500/20 text-purple-300'}`}>
                  {t.cat === 'Food' ? '🍜' : t.cat === 'Wants' ? '🎮' : t.cat === 'Transport' ? '🚌' : t.cat === 'Income' ? '💼' : '📦'}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-neutral-400">{t.cat} • {t.date}</div>
                </div>
              </div>
              <div className={`font-['Space_Grotesk'] text-sm font-extrabold ${t.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {t.type === 'income' ? '+' : '-'}{currencySymbol}{t.amount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spending Bar Chart */}
      <div className="mx-6 p-5 rounded-3xl bg-white/5 border border-white/10 space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-['Space_Grotesk'] text-sm font-bold text-white">30-Day Spending Breakdown</h3>
          <div className="flex gap-1 bg-black/40 p-1 rounded-lg border border-white/10 text-xs">
            {(['W', 'M'] as const).map((p) => (
              <button key={p} onClick={() => setChartPeriod(p)} className={`px-2.5 py-1 rounded-md font-bold transition ${chartPeriod === p ? 'bg-purple-600 text-white' : 'text-neutral-400'}`}>{p}</button>
            ))}
          </div>
        </div>
        <div className="h-28 flex items-end justify-between gap-2 pt-4">
          {[420, 380, 650, 290, 510, 480, 360, 590, 210, 430, 310, 520].map((val, idx) => {
            const hPct = Math.round((val / 650) * 100);
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                <div
                  className={`w-full rounded-t-md transition-all duration-500 ${idx === 7 ? 'bg-gradient-to-t from-purple-700 to-fuchsia-400' : 'bg-purple-600/30 group-hover:bg-purple-500/50'}`}
                  style={{ height: `${hPct}%` }}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-[10px] text-neutral-500">
          <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span>
        </div>
      </div>

      {/* Upcoming Payments */}
      <div className="px-6 space-y-3">
        <h3 className="font-['Space_Grotesk'] text-base font-bold text-white">Upcoming Planned Payments 📅</h3>
        <div className="space-y-2">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center text-base">📱</div>
              <div>
                <div className="text-xs font-bold text-white">Mobile Fiber Bill</div>
                <div className="text-[10px] text-neutral-400">Auto-debit • Aug 18, 2026</div>
              </div>
            </div>
            <div className="font-['Space_Grotesk'] text-xs font-bold text-neutral-200">{currencySymbol}599</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-300 flex items-center justify-center text-base">☁️</div>
              <div>
                <div className="text-xs font-bold text-white">AWS Cloud Plan</div>
                <div className="text-[10px] text-neutral-400">Scheduled • Aug 22, 2026</div>
              </div>
            </div>
            <div className="font-['Space_Grotesk'] text-xs font-bold text-neutral-200">{currencySymbol}799</div>
          </div>
        </div>
      </div>
    </div>
  );
};
