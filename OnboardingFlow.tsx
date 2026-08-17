import React, { useState } from 'react';
import { Currency } from '../types';
import { MENTORS } from '../data/mentors';
import { MentorCard } from './MentorCard';
import { MentorInfoModal } from './MentorInfoModal';
import { Check, ChevronRight } from 'lucide-react';

interface OnboardingFlowProps {
  onCompleteOnboarding: (data: {
    currency: Currency;
    initialBalance: number;
    goalTitle: string;
    goalDesc: string;
    startDate: string;
    endDate: string;
    goalTarget: number;
    pmAmount: number;
    pmPeriod: 'weekly' | 'monthly';
    mentorId: number;
  }) => void;
  customMentorImages?: Record<number, string>;
  onUpdateCustomImage?: (mentorId: number, url: string) => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  onCompleteOnboarding,
  customMentorImages = {},
  onUpdateCustomImage
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1
  const [currency, setCurrency] = useState<Currency>('INR');
  const [balanceInput, setBalanceInput] = useState('12500');
  // Step 2
  const [goalTitle, setGoalTitle] = useState('Save ₹10,000 Milestone');
  const [goalDesc, setGoalDesc] = useState('Build an emergency fund and invest in growth stocks');
  const [startDate, setStartDate] = useState('2026-08-01');
  const [endDate, setEndDate] = useState('2026-08-31');
  const [goalTarget, setGoalTarget] = useState('10000');
  // Step 3
  const [pmPeriod, setPmPeriod] = useState<'weekly' | 'monthly'>('monthly');
  const [pmAmountInput, setPmAmountInput] = useState('5900');
  // Step 4
  const [selectedMentorId, setSelectedMentorId] = useState<number>(3);
  const [activeInfoMentorId, setActiveInfoMentorId] = useState<number | null>(null);

  const handleKeypadPress = (key: string, currentValue: string, setValue: React.Dispatch<React.SetStateAction<string>>) => {
    if (key === '⌫') {
      setValue((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
    } else if (key === '.') {
      if (!currentValue.includes('.')) setValue((prev) => prev + '.');
    } else {
      setValue((prev) => (prev === '0' ? key : prev + key));
    }
  };

  const renderKeypad = (value: string, setValue: React.Dispatch<React.SetStateAction<string>>) => {
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'];
    return (
      <div className="grid grid-cols-3 gap-2.5 my-4">
        {keys.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => handleKeypadPress(k, value, setValue)}
            className="h-14 rounded-2xl bg-white/5 border border-white/10 hover:bg-purple-600/20 hover:border-purple-500/40 text-white font-['Space_Grotesk'] font-bold text-xl transition active:scale-95 flex items-center justify-center shadow-sm"
          >
            {k}
          </button>
        ))}
      </div>
    );
  };

  const currencySymbols: Record<Currency, string> = {
    INR: '₹', USD: '$', EUR: '€', GBP: '£', JPY: '¥',
    SGD: 'S$', MYR: 'RM', THB: '฿', PHP: '₱', IDR: 'Rp', AED: 'AED'
  };
  const currencySymbol = currencySymbols[currency] || '₹';

  const handleFinish = () => {
    onCompleteOnboarding({
      currency,
      initialBalance: parseFloat(balanceInput) || 0,
      goalTitle: goalTitle.trim() || 'Save ₹10,000',
      goalDesc: goalDesc.trim() || 'Savings reserve',
      startDate,
      endDate,
      goalTarget: parseFloat(goalTarget) || 10000,
      pmAmount: parseFloat(pmAmountInput) || 5000,
      pmPeriod,
      mentorId: selectedMentorId
    });
  };

  return (
    <div className="min-h-full bg-black text-white flex flex-col">
      {/* Step Indicator */}
      <div className="px-6 pt-12 pb-4 bg-gradient-to-b from-purple-900/20 to-transparent sticky top-0 backdrop-blur-md z-10 flex justify-between items-center border-b border-white/5">
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${
                s === step ? 'w-8 bg-purple-500 shadow-[0_0_12px_rgba(123,46,255,0.8)]'
                : s < step ? 'w-3 bg-purple-800' : 'w-3 bg-neutral-800'
              }`}
            />
          ))}
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Step {step} of 4</span>
      </div>

      <div className="flex-1 p-6 max-w-md mx-auto w-full flex flex-col justify-between">

        {/* STEP 1: CURRENCY & BALANCE */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-3xl mb-4 shadow-[0_0_25px_rgba(123,46,255,0.4)] animate-bounce">💳</div>
              <h2 className="font-['Space_Grotesk'] text-2xl font-extrabold">Set Up Your Wallet</h2>
              <p className="text-xs text-neutral-400 mt-1">Choose your base currency and enter your starting cash/wallet balance.</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center justify-between">
                <span>Select Base Currency</span>
                <span className="text-[10px] text-neutral-400 font-normal">Tap to choose</span>
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto no-scrollbar pr-1">
                {[
                  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
                  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
                  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
                  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
                  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
                  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
                  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾' },
                  { code: 'AED', name: 'UAE Dirham', symbol: 'AED', flag: '🇦🇪' }
                ].map((c) => {
                  const isSel = currency === c.code;
                  return (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => setCurrency(c.code as Currency)}
                      className={`p-3 rounded-2xl border text-left transition flex items-center gap-2.5 ${
                        isSel ? 'bg-purple-900/40 border-purple-500 shadow-[0_0_15px_rgba(123,46,255,0.4)]' : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-2xl">{c.flag}</span>
                      <div className="overflow-hidden">
                        <div className="text-xs font-bold text-white truncate">{c.name}</div>
                        <div className="text-[10px] text-emerald-400 font-mono font-extrabold">{c.symbol} ({c.code})</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white/5 border border-purple-500/30 rounded-3xl p-6 text-center shadow-lg">
              <div className="text-xs text-purple-300 uppercase tracking-widest font-semibold mb-1">Starting Cash & Wallet Balance</div>
              <div className="font-['Space_Grotesk'] text-4xl font-extrabold text-white tracking-tight">
                <span className="text-purple-400 mr-1">{currencySymbol}</span>
                {parseFloat(balanceInput).toLocaleString() || '0'}
              </div>
            </div>

            {renderKeypad(balanceInput, setBalanceInput)}

            <button onClick={() => setStep(2)} className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#7B2EFF] to-[#5A1FCC] hover:from-purple-600 hover:to-indigo-700 text-white font-bold text-sm shadow-[0_4px_25px_rgba(123,46,255,0.4)] transition active:scale-95 flex items-center justify-center gap-2">
              Continue to Goal Setup <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* STEP 2: FINANCIAL GOAL */}
        {step === 2 && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-fuchsia-600 to-purple-600 flex items-center justify-center text-3xl mb-4 shadow-[0_0_25px_rgba(192,38,211,0.4)]">🎯</div>
              <h2 className="font-['Space_Grotesk'] text-2xl font-extrabold">Financial Goal Setup</h2>
              <p className="text-xs text-neutral-400 mt-1">Mandatory commitment — your mentor holds you accountable to this goal!</p>
            </div>

            <div className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Main Goal Title</label>
                <input type="text" value={goalTitle} onChange={(e) => setGoalTitle(e.target.value)} placeholder="e.g. Save ₹10,000 for emergency fund" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Goal Description</label>
                <textarea value={goalDesc} onChange={(e) => setGoalDesc(e.target.value)} rows={2} placeholder="Why is this goal critical to your financial freedom?" className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Start Date</label>
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Target Date</label>
                  <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Target Amount ({currencySymbol})</label>
                <input type="number" value={goalTarget} onChange={(e) => setGoalTarget(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-['Space_Grotesk'] font-bold text-base focus:outline-none focus:border-purple-500" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30 space-y-2">
              <div className="flex justify-between text-xs text-neutral-400">
                <span>Start: {startDate}</span><span>End: {endDate}</span>
              </div>
              <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 bottom-0 w-[35%] bg-gradient-to-r from-purple-600 to-fuchsia-400 rounded-full" />
              </div>
              <p className="text-center text-xs font-semibold text-purple-300">Quest Initialized — Your mentor will monitor weekly milestone deposits!</p>
            </div>

            <button onClick={() => setStep(3)} className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#7B2EFF] to-[#5A1FCC] hover:from-purple-600 hover:to-indigo-700 text-white font-bold text-sm shadow-[0_4px_25px_rgba(123,46,255,0.4)] transition active:scale-95 flex items-center justify-center gap-2">
              Continue to Pocket Budget <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* STEP 3: POCKET MONEY */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-purple-600 flex items-center justify-center text-3xl mb-4 shadow-[0_0_25px_rgba(245,158,11,0.4)]">💰</div>
              <h2 className="font-['Space_Grotesk'] text-2xl font-extrabold">Pocket Money Commitment</h2>
              <p className="text-xs text-neutral-400 mt-1">How much pocket money can you set aside as your spending pool?</p>
            </div>

            <div className="flex bg-white/5 border border-white/10 rounded-xl p-1">
              {(['weekly', 'monthly'] as const).map((p) => (
                <button key={p} onClick={() => setPmPeriod(p)} className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${pmPeriod === p ? 'bg-purple-600 text-white shadow-md' : 'text-neutral-400'}`}>
                  {p === 'weekly' ? 'Weekly Allowance' : 'Monthly Pocket Pool'}
                </button>
              ))}
            </div>

            <div className="bg-white/5 border border-purple-500/30 rounded-3xl p-5 text-center shadow-lg">
              <div className="text-xs text-purple-300 uppercase tracking-widest font-semibold mb-1">{pmPeriod === 'weekly' ? 'Weekly' : 'Monthly'} Pocket Budget</div>
              <div className="font-['Space_Grotesk'] text-4xl font-extrabold text-white">
                <span className="text-purple-400 mr-1">{currencySymbol}</span>
                {parseFloat(pmAmountInput).toLocaleString() || '0'}
              </div>
            </div>

            {renderKeypad(pmAmountInput, setPmAmountInput)}

            <div className="p-4 rounded-2xl bg-purple-900/20 border border-purple-500/30 italic text-center text-xs text-purple-200">
              "Discipline today, freedom tomorrow."
            </div>

            <button
              onClick={() => {
                if ((parseFloat(pmAmountInput) || 0) <= 0) { alert('Please enter a pocket money allowance greater than zero!'); return; }
                setStep(4);
              }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#7B2EFF] to-[#5A1FCC] hover:from-purple-600 hover:to-indigo-700 text-white font-bold text-sm shadow-[0_4px_25px_rgba(123,46,255,0.4)] transition active:scale-95 flex items-center justify-center gap-2"
            >
              Select Your Mentor <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* STEP 4: MENTOR SELECTION */}
        {step === 4 && (
          <div className="space-y-6 animate-fadeIn pb-12">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold uppercase tracking-wider mb-2">
                Kiro AI System
              </div>
              <h2 className="font-['Space_Grotesk'] text-2xl font-extrabold text-white">Choose Your Financial Mentor 👑</h2>
              <p className="text-xs text-neutral-300 mt-1">
                Scroll through the 4 mentor cards below. Your mentor determines warning rules, spending blocks, rewards (+KP), penalties, and reaction popup tone!
              </p>
            </div>

            <div className="space-y-6">
              {[1, 2, 3, 4].map((id) => (
                <MentorCard
                  key={id}
                  mentor={MENTORS[id]}
                  isSelected={selectedMentorId === id}
                  onSelect={(mId) => setSelectedMentorId(mId)}
                  onOpenInfo={(mId) => setActiveInfoMentorId(mId)}
                  customImage={customMentorImages[id]}
                />
              ))}
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-base shadow-[0_0_30px_rgba(16,185,129,0.5)] transition active:scale-95 flex items-center justify-center gap-2 mt-8"
            >
              <Check size={20} /> Confirm Mentor & Launch Money Boss AI
            </button>
          </div>
        )}
      </div>

      <MentorInfoModal
        mentor={activeInfoMentorId ? MENTORS[activeInfoMentorId] : null}
        isOpen={activeInfoMentorId !== null}
        onClose={() => setActiveInfoMentorId(null)}
        onSelect={(id) => setSelectedMentorId(id)}
        customImage={activeInfoMentorId ? customMentorImages[activeInfoMentorId] : undefined}
        onUpdateCustomImage={onUpdateCustomImage}
      />
    </div>
  );
};
