import React, { useState } from 'react';
import { CategoryBudget, FinancialGoal } from '../types';
import { ArrowLeft, Plus, PieChart, X } from 'lucide-react';

interface BudgetsGoalsScreenProps {
  currencySymbol: string;
  budgets: CategoryBudget[];
  goals: FinancialGoal[];
  onAddBudget: (b: Omit<CategoryBudget, 'id'>) => void;
  onAddGoal: (g: Omit<FinancialGoal, 'id' | 'savedAmount'>) => void;
  onNavigate: (screen: any) => void;
}

export const BudgetsGoalsScreen: React.FC<BudgetsGoalsScreenProps> = ({
  currencySymbol,
  budgets,
  goals,
  onAddBudget,
  onAddGoal,
  onNavigate
}) => {
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [newCat, setNewCat] = useState('Food');
  const [newLimit, setNewLimit] = useState('2500');
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalDesc, setNewGoalDesc] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('5000');
  const [newGoalEndDate, setNewGoalEndDate] = useState('2026-10-30');

  const totalLimit = budgets.reduce((acc, b) => acc + b.limit, 0);
  const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0);
  const totalRemaining = Math.max(0, totalLimit - totalSpent);
  const totalPct = totalLimit > 0 ? Math.min(100, Math.round((totalSpent / totalLimit) * 100)) : 0;

  const handleCreateBudget = () => {
    const limitNum = parseFloat(newLimit) || 0;
    if (limitNum <= 0) { alert('Please enter a valid budget limit'); return; }
    const icons: Record<string, string> = { Food: '🍜', Wants: '🎮', Transport: '🚌', Health: '💊', Other: '📦' };
    onAddBudget({ cat: newCat, limit: limitNum, spent: 0, icon: icons[newCat] || '📦' });
    setShowBudgetModal(false);
  };

  const handleCreateGoal = () => {
    const targetNum = parseFloat(newGoalTarget) || 0;
    if (!newGoalTitle.trim() || targetNum <= 0) { alert('Please enter a valid goal title and target amount'); return; }
    onAddGoal({
      title: newGoalTitle.trim(),
      description: newGoalDesc.trim() || 'Savings quest',
      targetAmount: targetNum,
      startDate: new Date().toISOString().split('T')[0],
      endDate: newGoalEndDate
    });
    setShowGoalModal(false);
    setNewGoalTitle('');
    setNewGoalDesc('');
  };

  return (
    <div className="min-h-full bg-black text-white pb-24 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="pt-12 px-6 flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('home')} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition active:scale-95">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="font-['Space_Grotesk'] text-xl font-extrabold text-white">Budgets & Goals</h1>
            <p className="text-xs text-neutral-400">Let's bake your budget! 🥐</p>
          </div>
        </div>
      </div>

      {/* Total Budget Banner */}
      <div className="mx-6 p-6 rounded-3xl bg-gradient-to-br from-purple-900/40 via-indigo-900/30 to-black border border-purple-500/40 shadow-xl space-y-3">
        <div className="flex justify-between items-center text-xs text-purple-300 font-semibold uppercase tracking-wider">
          <span className="flex items-center gap-1.5"><PieChart size={14} /> Total Monthly Budget Pool</span>
          <span>{totalPct}% Spent</span>
        </div>
        <div className="font-['Space_Grotesk'] text-3xl font-extrabold text-white">
          {currencySymbol}{totalSpent.toLocaleString()}{' '}
          <span className="text-sm font-normal text-neutral-400">/ {currencySymbol}{totalLimit.toLocaleString()}</span>
        </div>
        <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              totalPct > 85 ? 'bg-rose-500' : totalPct > 70 ? 'bg-amber-500' : 'bg-gradient-to-r from-purple-500 to-indigo-400'
            }`}
            style={{ width: `${totalPct}%` }}
          />
        </div>
        <div className="text-xs text-neutral-300">
          {currencySymbol}{totalRemaining.toLocaleString()} remaining in your total category allocations.
        </div>
      </div>

      {/* Category Budgets */}
      <div className="px-6 space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-['Space_Grotesk'] text-base font-bold text-white">Category Allocations</h3>
          <button onClick={() => setShowBudgetModal(true)} className="text-xs text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1">
            <Plus size={14} /> Add Budget
          </button>
        </div>
        <div className="space-y-3">
          {budgets.map((b) => {
            const pct = Math.min(100, Math.round((b.spent / b.limit) * 100));
            const barColor = pct >= 90 ? 'bg-rose-500' : pct >= 75 ? 'bg-amber-500' : 'bg-emerald-500';
            const remaining = Math.max(0, b.limit - b.spent);
            return (
              <div key={b.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{b.icon}</span>
                    <span className="text-sm font-bold text-white">{b.cat}</span>
                  </div>
                  <div className="text-xs text-neutral-300">
                    <span className="font-bold">{currencySymbol}{b.spent.toLocaleString()}</span> / {currencySymbol}{b.limit.toLocaleString()}
                  </div>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ${barColor}`} style={{ width: `${pct}%` }} />
                </div>
                <div className="flex justify-between text-[10px] text-neutral-400">
                  <span>{currencySymbol}{remaining.toLocaleString()} remaining</span>
                  <span className={`font-bold ${pct >= 90 ? 'text-rose-400' : pct >= 75 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {pct}% Used
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Savings Goals */}
      <div className="px-6 space-y-3 pt-2">
        <div className="flex justify-between items-center">
          <h3 className="font-['Space_Grotesk'] text-base font-bold text-white">Savings Goals Quests 🎯</h3>
          <button onClick={() => setShowGoalModal(true)} className="text-xs text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1">
            <Plus size={14} /> Create Goal
          </button>
        </div>
        <div className="space-y-3">
          {goals.map((g) => {
            const pct = Math.min(100, Math.round((g.savedAmount / g.targetAmount) * 100));
            return (
              <div key={g.id} className="p-5 rounded-3xl bg-gradient-to-br from-[#12062a] to-black border border-purple-500/30 space-y-3 shadow-md">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-['Space_Grotesk'] text-base font-bold text-white">{g.title}</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">{g.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-['Space_Grotesk'] text-sm font-extrabold text-white">{currencySymbol}{g.targetAmount.toLocaleString()}</div>
                    <div className="text-[10px] text-emerald-400 font-bold">{currencySymbol}{g.savedAmount.toLocaleString()} saved</div>
                  </div>
                </div>
                <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-400">Deadline: {g.endDate}</span>
                  <span className="font-extrabold text-emerald-400">{pct}% Complete</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Budget Modal */}
      {showBudgetModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="w-full max-w-md bg-neutral-900 border border-purple-500/40 rounded-3xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">Create Category Budget</h3>
              <button onClick={() => setShowBudgetModal(false)} className="p-1 text-neutral-400 hover:text-white"><X size={18} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-neutral-400 uppercase">Category</label>
                <select value={newCat} onChange={(e) => setNewCat(e.target.value)} className="w-full mt-1 p-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500">
                  <option value="Food" className="bg-neutral-900">🍜 Food</option>
                  <option value="Wants" className="bg-neutral-900">🎮 Wants</option>
                  <option value="Transport" className="bg-neutral-900">🚌 Transport</option>
                  <option value="Health" className="bg-neutral-900">💊 Health</option>
                  <option value="Other" className="bg-neutral-900">📦 Other</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-neutral-400 uppercase">Monthly Limit ({currencySymbol})</label>
                <input type="number" value={newLimit} onChange={(e) => setNewLimit(e.target.value)} placeholder="2500" className="w-full mt-1 p-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold focus:outline-none focus:border-purple-500" />
              </div>
            </div>
            <button onClick={handleCreateBudget} className="w-full py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-lg transition">
              Save Category Budget
            </button>
          </div>
        </div>
      )}

      {/* Goal Modal */}
      {showGoalModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="w-full max-w-md bg-neutral-900 border border-purple-500/40 rounded-3xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">Create Savings Quest 🎯</h3>
              <button onClick={() => setShowGoalModal(false)} className="p-1 text-neutral-400 hover:text-white"><X size={18} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-neutral-400 uppercase">Goal Title</label>
                <input type="text" value={newGoalTitle} onChange={(e) => setNewGoalTitle(e.target.value)} placeholder="e.g. Vacation Fund, Gaming Laptop" className="w-full mt-1 p-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500" />
              </div>
              <div>
                <label className="text-xs font-bold text-neutral-400 uppercase">Goal Description</label>
                <input type="text" value={newGoalDesc} onChange={(e) => setNewGoalDesc(e.target.value)} placeholder="Short motivation summary" className="w-full mt-1 p-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-400 uppercase">Target ({currencySymbol})</label>
                  <input type="number" value={newGoalTarget} onChange={(e) => setNewGoalTarget(e.target.value)} className="w-full mt-1 p-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold focus:outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-400 uppercase">Deadline</label>
                  <input type="date" value={newGoalEndDate} onChange={(e) => setNewGoalEndDate(e.target.value)} className="w-full mt-1 p-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500" />
                </div>
              </div>
            </div>
            <button onClick={handleCreateGoal} className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm shadow-lg transition">
              Launch Savings Quest 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
