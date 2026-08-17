import React, { useState } from 'react';
import {
  ScreenId,
  Currency,
  Mentor,
  Transaction,
  CategoryBudget,
  FinancialGoal,
  ShopItem,
  Achievement,
  LeaderboardUser
} from './types';
import { MENTORS } from './data/mentors';
import {
  INITIAL_TRANSACTIONS,
  INITIAL_BUDGETS,
  INITIAL_GOALS,
  INITIAL_SHOP_ITEMS,
  INITIAL_ACHIEVEMENTS,
  MOCK_LEADERBOARD
} from './data/initialData';

import { SplashAuth } from './components/SplashAuth';
import { OnboardingFlow } from './components/OnboardingFlow';
import { HomeDashboard } from './components/HomeDashboard';
import { RecordsManager } from './components/RecordsManager';
import { BudgetsGoalsScreen } from './components/BudgetsGoalsScreen';
import { RewardsScreen } from './components/RewardsScreen';
import { AiCoachScreen } from './components/AiCoachScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';
import { AnalyticsScreen } from './components/AnalyticsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { CurrencySelectScreen } from './components/CurrencySelectScreen';
import { MentorCard } from './components/MentorCard';
import { MentorInfoModal } from './components/MentorInfoModal';
import { SpendingReactionPopup } from './components/SpendingReactionPopup';
import { BottomNav } from './components/BottomNav';
import { ArrowLeft } from 'lucide-react';

export default function App() {
  // Navigation State
  const [screen, setScreen] = useState<ScreenId>('auth');

  // Wallet & User State
  const [currency, setCurrency] = useState<Currency>('INR');
  const [balance, setBalance] = useState<number>(47820);
  const [pmTotal, setPmTotal] = useState<number>(5900);
  const [pmLeft, setPmLeft] = useState<number>(3200);

  // Mentor & Gamification State
  const [activeMentorId, setActiveMentorId] = useState<number>(3); // Strict Dad default
  const [kp, setKp] = useState<number>(2450);
  const [multiplier, setMultiplier] = useState<number>(2.4);
  const [streak, setStreak] = useState<number>(7);

  // Custom Character Image Links (Pasteable direct URLs for character choosing / customization)
  const [customMentorImages, setCustomMentorImages] = useState<Record<number, string>>({});

  // Collection States
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [budgets, setBudgets] = useState<CategoryBudget[]>(INITIAL_BUDGETS);
  const [goals, setGoals] = useState<FinancialGoal[]>(INITIAL_GOALS);
  const [shopItems, setShopItems] = useState<ShopItem[]>(INITIAL_SHOP_ITEMS);
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [leaderboardUsers, setLeaderboardUsers] = useState<LeaderboardUser[]>(MOCK_LEADERBOARD);

  // Reaction Popup State
  const [reactionPopup, setReactionPopup] = useState<{
    isOpen: boolean;
    data: {
      category: string;
      itemName: string;
      amount: number;
      catRemaining: number;
      daysLeft: number;
      status: 'good' | 'warn' | 'over';
      kpChange: number;
      multiplierChange: number;
      line: string;
    } | null;
  }>({
    isOpen: false,
    data: null
  });

  // Modal for standalone mentor selection screen
  const [activeInfoMentorId, setActiveInfoMentorId] = useState<number | null>(null);

  const activeMentor = MENTORS[activeMentorId] || MENTORS[3];

  const currencySymbols: Record<Currency, string> = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    SGD: 'S$',
    MYR: 'RM',
    THB: '฿',
    PHP: '₱',
    IDR: 'Rp',
    AED: 'AED'
  };

  const currencySymbol = currencySymbols[currency] || '₹';

  // Handler for custom image URL updates
  const handleUpdateCustomImage = (mentorId: number, url: string) => {
    setCustomMentorImages((prev) => ({
      ...prev,
      [mentorId]: url
    }));
  };

  // Onboarding completion
  const handleCompleteOnboarding = (data: {
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
  }) => {
    setCurrency(data.currency);
    setBalance(data.initialBalance || 12500);
    setPmTotal(data.pmAmount || 5000);
    setPmLeft(data.pmAmount || 5000);
    setActiveMentorId(data.mentorId);

    // Update primary goal
    setGoals((prev) => [
      {
        id: 'g_main',
        title: data.goalTitle,
        description: data.goalDesc,
        targetAmount: data.goalTarget,
        savedAmount: Math.round(data.goalTarget * 0.35),
        startDate: data.startDate,
        endDate: data.endDate
      },
      ...prev
    ]);

    setScreen('home');
  };

  // Add new transaction
  const handleAddTransaction = (newTxn: Omit<Transaction, 'id'>) => {
    const createdTxn: Transaction = {
      ...newTxn,
      id: 't_' + Date.now()
    };

    setTransactions((prev) => [createdTxn, ...prev]);

    if (newTxn.type === 'expense') {
      setBalance((prev) => Math.max(0, prev - newTxn.amount));
      setPmLeft((prev) => Math.max(0, prev - newTxn.amount));

      // Update matching category budget
      setBudgets((prev) =>
        prev.map((b) => {
          if (b.cat.toLowerCase().includes(newTxn.cat.toLowerCase())) {
            return { ...b, spent: b.spent + newTxn.amount };
          }
          return b;
        })
      );

      // Trigger reaction
      triggerMentorReaction(newTxn.cat, newTxn.name, newTxn.amount);
    } else if (newTxn.type === 'income') {
      setBalance((prev) => prev + newTxn.amount);
    }
  };

  // Trigger Mentor Reaction popup
  const triggerMentorReaction = (category: string, itemName: string, amount: number) => {
    const m = activeMentor;
    const matchingBudget = budgets.find((b) => b.cat.toLowerCase().includes(category.toLowerCase()));

    let catRemaining = 820;
    let status: 'good' | 'warn' | 'over' = 'good';

    if (matchingBudget) {
      catRemaining = Math.max(0, matchingBudget.limit - (matchingBudget.spent + amount));
      const pct = (matchingBudget.spent + amount) / matchingBudget.limit;
      if (pct >= 1.0) status = 'over';
      else if (pct >= 0.75) status = 'warn';
    }

    let kpChange = m.rewardKP;
    let newMult = multiplier;

    if (status === 'over') {
      kpChange = -m.penaltyKP;
      setKp((prev) => Math.max(0, prev - m.penaltyKP));

      if (m.id === 4) {
        newMult = 1.0; // Reset multiplier for Disappointed Mom
      } else {
        newMult = Math.max(1.0, multiplier - m.penaltyMult);
      }
      setMultiplier(newMult);
    } else {
      setKp((prev) => prev + m.rewardKP);
      newMult = Math.min(m.maxMult, multiplier + m.rewardMult);
      setMultiplier(newMult);
    }

    const line = m.lines[status];

    setReactionPopup({
      isOpen: true,
      data: {
        category,
        itemName,
        amount,
        catRemaining,
        daysLeft: 18,
        status,
        kpChange,
        multiplierChange: newMult,
        line
      }
    });
  };

  // Add Budget Category
  const handleAddBudget = (b: Omit<CategoryBudget, 'id'>) => {
    setBudgets((prev) => [...prev, { ...b, id: 'b_' + Date.now() }]);
  };

  // Add Goal
  const handleAddGoal = (g: Omit<FinancialGoal, 'id' | 'savedAmount'>) => {
    setGoals((prev) => [...prev, { ...g, id: 'g_' + Date.now(), savedAmount: 0 }]);
  };

  // Purchase Shop Item
  const handlePurchaseShopItem = (itemId: string, cost: number) => {
    if (kp >= cost) {
      setKp((prev) => prev - cost);
      setShopItems((prev) =>
        prev.map((item) => (item.id === itemId ? { ...item, unlocked: true } : item))
      );
    } else {
      alert('Not enough Kinetic Points (KP)! Complete goals or maintain budget streaks to earn more.');
    }
  };

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center font-['Inter',sans-serif] overflow-hidden">
      {/* Phone Canvas Container */}
      <div className="w-[390px] h-[844px] max-h-screen max-w-full relative overflow-hidden bg-black rounded-[44px] border border-purple-500/30 shadow-[0_0_80px_rgba(123,46,255,0.35)] flex flex-col">
        
        {/* Main Render Canvas */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative">
          
          {screen === 'auth' && (
            <SplashAuth onLoginSuccess={() => setScreen('ob1')} />
          )}

          {['ob1', 'ob2', 'ob3'].includes(screen) && (
            <OnboardingFlow
              onCompleteOnboarding={handleCompleteOnboarding}
              customMentorImages={customMentorImages}
              onUpdateCustomImage={handleUpdateCustomImage}
            />
          )}

          {screen === 'mentor-select' && (
            <div className="min-h-full bg-black text-white p-6 pb-24 space-y-6 animate-fadeIn">
              <div className="pt-8 flex items-center gap-3">
                <button
                  onClick={() => setScreen('home')}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition"
                >
                  <ArrowLeft size={18} />
                </button>
                <div>
                  <h1 className="font-['Space_Grotesk'] text-xl font-extrabold">
                    Mentor Selection HQ 👑
                  </h1>
                  <p className="text-xs text-neutral-400">Choose your strictness & reward mentor</p>
                </div>
              </div>

              <div className="space-y-6">
                {[1, 2, 3, 4].map((id) => {
                  const m = MENTORS[id];
                  return (
                    <MentorCard
                      key={id}
                      mentor={m}
                      isSelected={activeMentorId === id}
                      onSelect={(mId) => {
                        setActiveMentorId(mId);
                        setScreen('home');
                      }}
                      onOpenInfo={(mId) => setActiveInfoMentorId(mId)}
                      customImage={customMentorImages[id]}
                    />
                  );
                })}
              </div>

              <MentorInfoModal
                mentor={activeInfoMentorId ? MENTORS[activeInfoMentorId] : null}
                isOpen={activeInfoMentorId !== null}
                onClose={() => setActiveInfoMentorId(null)}
                onSelect={(mId) => {
                  setActiveMentorId(mId);
                  setScreen('home');
                }}
                customImage={activeInfoMentorId ? customMentorImages[activeInfoMentorId] : undefined}
                onUpdateCustomImage={handleUpdateCustomImage}
              />
            </div>
          )}

          {screen === 'currency-select' && (
            <CurrencySelectScreen
              currentCurrency={currency}
              onSelectCurrency={(c) => setCurrency(c)}
              onNavigateBack={() => setScreen('home')}
            />
          )}

          {screen === 'home' && (
            <HomeDashboard
              balance={balance}
              currency={currency}
              currencySymbol={currencySymbol}
              mentor={activeMentor}
              kp={kp}
              multiplier={multiplier}
              transactions={transactions}
              budgets={budgets}
              goal={goals[0] || INITIAL_GOALS[0]}
              pmLeft={pmLeft}
              pmTotal={pmTotal}
              onNavigate={(s) => setScreen(s)}
              onTriggerReaction={triggerMentorReaction}
              customImage={customMentorImages[activeMentorId]}
            />
          )}

          {screen === 'records' && (
            <RecordsManager
              currencySymbol={currencySymbol}
              transactions={transactions}
              onAddTransaction={handleAddTransaction}
              onNavigate={(s) => setScreen(s)}
            />
          )}

          {screen === 'budgets' && (
            <BudgetsGoalsScreen
              currencySymbol={currencySymbol}
              budgets={budgets}
              goals={goals}
              onAddBudget={handleAddBudget}
              onAddGoal={handleAddGoal}
              onNavigate={(s) => setScreen(s)}
            />
          )}

          {screen === 'rewards' && (
            <RewardsScreen
              kp={kp}
              multiplier={multiplier}
              mentor={activeMentor}
              shopItems={shopItems}
              achievements={achievements}
              onPurchaseItem={handlePurchaseShopItem}
              onNavigate={(s) => setScreen(s)}
              customImage={customMentorImages[activeMentorId]}
            />
          )}

          {screen === 'ai-coach' && (
            <AiCoachScreen
              mentor={activeMentor}
              currencySymbol={currencySymbol}
              balance={balance}
              pmLeft={pmLeft}
              pmTotal={pmTotal}
              goalTitle={goals[0]?.title || 'Save ₹10,000'}
              goalProgress={68}
              kp={kp}
              multiplier={multiplier}
              streak={streak}
              onNavigate={(s) => setScreen(s)}
              customImage={customMentorImages[activeMentorId]}
            />
          )}

          {screen === 'leaderboard' && (
            <LeaderboardScreen
              users={leaderboardUsers}
              onNavigate={(s) => setScreen(s)}
            />
          )}

          {screen === 'analytics' && (
            <AnalyticsScreen
              currencySymbol={currencySymbol}
              onNavigate={(s) => setScreen(s)}
            />
          )}

          {screen === 'profile' && (
            <ProfileScreen
              mentor={activeMentor}
              kp={kp}
              multiplier={multiplier}
              streak={streak}
              currency={currency}
              onCurrencyChange={setCurrency}
              onNavigate={(s) => setScreen(s)}
              customMentorImages={customMentorImages}
              onUpdateCustomImage={handleUpdateCustomImage}
            />
          )}

        </div>

        {/* Global Reaction Overlay */}
        <SpendingReactionPopup
          reaction={reactionPopup.data}
          mentor={activeMentor}
          isOpen={reactionPopup.isOpen}
          onClose={() => setReactionPopup({ isOpen: false, data: null })}
          customImage={customMentorImages[activeMentorId]}
        />

        {/* Persistent Mobile Bottom Navigation Bar */}
        <BottomNav activeScreen={screen} onNavigate={(s) => setScreen(s)} />
      </div>
    </div>
  );
}
