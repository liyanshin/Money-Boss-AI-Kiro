[kiro-instruction.md](https://github.com/user-attachments/files/31191651/kiro-instruction.md)
# Money Boss AI — Kiro Instructions

> Complete source code reference for all application files.
> Built with **Kiro IDE** · AI powered by **Amazon Bedrock** (Claude 3 Sonnet)
> Stack: React 19 · TypeScript · Tailwind CSS v4 · Express · Vite

---

## Table of Contents

1. [types.ts](#1-typests)
2. [initialData.ts](#2-initialdatats)
3. [mentors.ts](#3-mentorsts)
4. [App.tsx](#4-apptsx)
5. [server.ts](#5-serverts)
6. [SplashAuth.tsx](#6-splashauthtsx)
7. [OnboardingFlow.tsx](#7-onboardingflowtsx)
8. [CurrencySelectScreen.tsx](#8-currencyselectscreentsx)
9. [HomeDashboard.tsx](#9-homedashboardtsx)
10. [RecordsManager.tsx](#10-recordsmanagertsx)
11. [BudgetsGoalsScreen.tsx](#11-budgetsgoalsscreentsx)
12. [AnalyticsScreen.tsx](#12-analyticsscreentsx)
13. [AiCoachScreen.tsx](#13-aicoachscreentsx)
14. [SpendingReactionPopup.tsx](#14-spendingreactionpopuptsx)
15. [RewardsScreen.tsx](#15-rewardsscreentsx)
16. [LeaderboardScreen.tsx](#16-leaderboardscreentsx)
17. [ProfileScreen.tsx](#17-profilescreentsx)
18. [MentorCard.tsx](#18-mentorcardtsx)
19. [MentorInfoModal.tsx](#19-mentorinfodmodaltsx)
20. [BottomNav.tsx](#20-bottomnavtsx)

---

## 1. types.ts

**Path:** `src/types.ts`

```typescript
export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP' | 'JPY' | 'SGD' | 'MYR' | 'THB' | 'PHP' | 'IDR' | 'AED';

export interface Mentor {
  id: number;
  name: string;
  diff: 'Easy' | 'Medium' | 'Hard' | 'Extreme';
  diffStars: string;
  personality: string;
  quote: string;
  avatarImage: string;
  avatarFallbackEmoji: string;
  themeClass: string;
  color: string;
  rewardKP: number;
  rewardMult: number;
  penaltyKP: number;
  penaltyMult: number;
  maxMult: number;
  rules: string[];
  lines: {
    good: string;
    warn: string;
    over: string;
  };
  behaviorDetails: {
    overview: string;
    spendingRules: string[];
    rewardsExplanation: string;
    penaltiesExplanation: string;
  };
}

export type TransactionType = 'expense' | 'income' | 'transfer';
export type Category = 'Food' | 'Wants' | 'Transport' | 'Health' | 'Other' | 'Income';

export interface Transaction {
  id: string;
  type: TransactionType;
  cat: Category;
  name: string;
  amount: number;
  account: string;
  date: string;
  time?: string;
}

export interface CategoryBudget {
  id: string;
  cat: string;
  limit: number;
  spent: number;
  icon: string;
}

export interface FinancialGoal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  savedAmount: number;
  startDate: string;
  endDate: string;
}

export interface ShopItem {
  id: string;
  name: string;
  cost: number;
  unlocked: boolean;
  type: 'theme' | 'skin' | 'animation' | 'frame';
  icon: string;
  gradient: string;
}

export interface Achievement {
  id: string;
  icon: string;
  name: string;
  desc: string;
  earned: boolean;
  earnedDate?: string;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  score: number;
  streak: number;
  savedPct: number;
  badge: string;
  avatar: string;
  isCurrentUser: boolean;
  rankChange: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export type ScreenId =
  | 'splash'
  | 'auth'
  | 'ob1'
  | 'ob2'
  | 'ob3'
  | 'mentor-select'
  | 'currency-select'
  | 'home'
  | 'records'
  | 'budgets'
  | 'rewards'
  | 'ai-coach'
  | 'leaderboard'
  | 'analytics'
  | 'profile';
```

---

## 2. initialData.ts

**Path:** `src/data/initialData.ts`

```typescript
import { Transaction, CategoryBudget, FinancialGoal, ShopItem, Achievement, LeaderboardUser } from '../types';

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 't1', type: 'expense', cat: 'Food', name: 'Special Biryani Feast', amount: 180, account: 'Cash', date: 'Today, 1:30 PM' },
  { id: 't2', type: 'income', cat: 'Income', name: 'Monthly Stipend / Salary', amount: 35000, account: 'Bank Account', date: 'Aug 1, 2026' },
  { id: 't3', type: 'expense', cat: 'Wants', name: 'Taro Boba Tea with Pearls', amount: 250, account: 'Cash', date: 'Yesterday' },
  { id: 't4', type: 'expense', cat: 'Transport', name: 'Monthly Metro Smart Pass', amount: 150, account: 'Bank Account', date: 'Aug 11, 2026' },
  { id: 't5', type: 'expense', cat: 'Health', name: 'Multivitamin Supplements', amount: 320, account: 'Card', date: 'Aug 10, 2026' },
  { id: 't6', type: 'expense', cat: 'Wants', name: 'Prime Video Subscription', amount: 199, account: 'Card', date: 'Aug 08, 2026' }
];

export const INITIAL_BUDGETS: CategoryBudget[] = [
  { id: 'b1', cat: 'Food', limit: 2000, spent: 1180, icon: '🍜' },
  { id: 'b2', cat: 'Wants', limit: 1500, spent: 1350, icon: '🎮' },
  { id: 'b3', cat: 'Transport', limit: 800, spent: 300, icon: '🚌' },
  { id: 'b4', cat: 'Health', limit: 500, spent: 320, icon: '💊' },
  { id: 'b5', cat: 'Other', limit: 1000, spent: 450, icon: '📦' }
];

export const INITIAL_GOALS: FinancialGoal[] = [
  {
    id: 'g1',
    title: 'Save ₹10,000 Milestone',
    description: 'Emergency reserve & investment starter pool for this month',
    targetAmount: 10000,
    savedAmount: 6800,
    startDate: '2026-08-01',
    endDate: '2026-08-31'
  },
  {
    id: 'g2',
    title: 'Noise Cancelling Headphones',
    description: 'Tech upgrade for deep work & study focus',
    targetAmount: 4500,
    savedAmount: 1800,
    startDate: '2026-08-05',
    endDate: '2026-09-15'
  }
];

export const INITIAL_SHOP_ITEMS: ShopItem[] = [
  { id: 's1', name: 'Dark Phoenix Cyber Theme', cost: 800, unlocked: false, type: 'theme', icon: '🔥',
    gradient: 'linear-gradient(135deg, rgba(220,38,38,0.3), rgba(123,46,255,0.3))' },
  { id: 's2', name: 'Mom Skin: Proud Smile', cost: 500, unlocked: false, type: 'skin', icon: '🌸',
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.3), rgba(123,46,255,0.3))' },
  { id: 's3', name: 'Confetti Celebration FX', cost: 300, unlocked: true, type: 'animation', icon: '🎉',
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.3), rgba(123,46,255,0.3))' },
  { id: 's4', name: 'Gold Boss Avatar Frame', cost: 1200, unlocked: false, type: 'frame', icon: '👑',
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.4), rgba(0,0,0,0.6))' },
  { id: 's5', name: 'Royal Purple Neon Trail', cost: 650, unlocked: false, type: 'animation', icon: '⚡',
    gradient: 'linear-gradient(135deg, rgba(123,46,255,0.5), rgba(192,38,211,0.5))' }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: 'a1', icon: '🔥', name: '7-Day No-Overspend Streak', desc: 'Maintained strict budget discipline for 7 full days', earned: true, earnedDate: 'Aug 12' },
  { id: 'a2', icon: '⚡', name: '30-Day Logging Streak', desc: 'Logged transactions every day for a full month', earned: false },
  { id: 'a3', icon: '🎯', name: 'First Goal Complete', desc: 'Reached 100% target on your primary savings quest', earned: true, earnedDate: 'Jul 28' },
  { id: 'a4', icon: '💰', name: '₹1,000 Milestone Saved', desc: 'Successfully set aside ₹1,000 in your pocket reserve', earned: true, earnedDate: 'Aug 05' },
  { id: 'a5', icon: '👑', name: 'Multiplier Maxed', desc: 'Reached max multiplier boost with your chosen mentor', earned: false },
  { id: 'a6', icon: '🛡️', name: 'Zero Overspend Week', desc: 'Completed a full week with zero category warnings', earned: true, earnedDate: 'Aug 09' },
  { id: 'a7', icon: '🏆', name: 'Budget Boss Rank', desc: 'Achieved Top 10 status on the global community leaderboard', earned: true, earnedDate: 'Aug 10' }
];

export const MOCK_LEADERBOARD: LeaderboardUser[] = [
  { rank: 1, name: 'BudgetNinja88', score: 1240, streak: 30, savedPct: 82, badge: '🔥 Top Boss', avatar: '🐱', isCurrentUser: false, rankChange: 0 },
  { rank: 2, name: 'SaverFox92', score: 1185, streak: 24, savedPct: 75, badge: '⚡ Speed Saver', avatar: '🦊', isCurrentUser: false, rankChange: 1 },
  { rank: 3, name: 'FrugalPanda', score: 1020, streak: 18, savedPct: 68, badge: '🐼 Zen Master', avatar: '🐼', isCurrentUser: false, rankChange: -1 },
  { rank: 4, name: 'MoneyBoss_You', score: 847, streak: 7, savedPct: 68, badge: '👑 Rising Boss', avatar: '😎', isCurrentUser: true, rankChange: 2 },
  { rank: 5, name: 'CoinMaster', score: 790, streak: 12, savedPct: 55, badge: '💰 Steady Hands', avatar: '🐯', isCurrentUser: false, rankChange: 0 },
  { rank: 6, name: 'ThriftQueen', score: 710, streak: 9, savedPct: 48, badge: '✨ Diamond Saver', avatar: '👑', isCurrentUser: false, rankChange: 1 },
  { rank: 7, name: 'WalletWise', score: 650, streak: 6, savedPct: 40, badge: '🛡️ Guardian', avatar: '🦉', isCurrentUser: false, rankChange: -2 },
  { rank: 8, name: 'ZenSpender', score: 580, streak: 4, savedPct: 35, badge: '🌸 Mindful', avatar: '🐉', isCurrentUser: false, rankChange: 0 },
  { rank: 9, name: 'CashFlow99', score: 490, streak: 3, savedPct: 28, badge: '🚀 Growing', avatar: '🚀', isCurrentUser: false, rankChange: 1 },
  { rank: 10, name: 'SavingsBot', score: 410, streak: 1, savedPct: 20, badge: '🌱 Starter', avatar: '🤖', isCurrentUser: false, rankChange: -1 }
];
```

---

## 3. mentors.ts

**Path:** `src/data/mentors.ts`

```typescript
import { Mentor } from '../types';

const chillCousinImg = 'https://i.ibb.co/Ngzq0Lp5/bro-1-1.png';
const savageSisterImg = 'https://i.ibb.co/ch8Fr5w5/sis-1.png';
const strictDadImg = 'https://i.ibb.co/bj73hpf7/papa-1.png';
const disappointedMomImg = 'https://i.ibb.co/C3Rc7kQh/mom-1.png';

export const MENTORS: Record<number, Mentor> = {
  1: {
    id: 1, name: 'Brother', diff: 'Easy', diffStars: '★☆☆☆',
    personality: 'Supportive, relaxed, encouraging',
    quote: 'Small savings become big wins.',
    avatarImage: chillCousinImg, avatarFallbackEmoji: '😎',
    themeClass: 'm1', color: '#9B5EFF',
    rewardKP: 50, rewardMult: 0.1, penaltyKP: 0, penaltyMult: 0, maxMult: 2.0,
    rules: [
      'Sends a gentle nudge before you exceed a category limit.',
      'No category locks or harsh penalties — pure encouragement mode.',
      'Great for beginners or relaxed budgeters.'
    ],
    lines: {
      good: 'Small savings add up — proud of you bro! Keep going! 🚀',
      warn: 'Hey, you are getting pretty close to your category limit. Take it easy on the next buy! 💬',
      over: 'It is okay! We overspent a little, but tomorrow is a fresh start. Just stay mindful! 😊'
    },
    behaviorDetails: {
      overview: 'Brother is your relaxed financial buddy. He celebrates every positive action and gently reminds you when you are spending quickly.',
      spendingRules: ['Warning triggered at 80% category budget limit.', 'Zero penalties for overspending.', 'Continuous multiplier boost as long as you log expenses.'],
      rewardsExplanation: '+50 Kinetic Points (KP) per period stay within budget + 0.1x multiplier growth up to 2.0x maximum.',
      penaltiesExplanation: 'No points or multiplier losses on overspend.'
    }
  },
  2: {
    id: 2, name: 'Sister', diff: 'Medium', diffStars: '★★☆☆',
    personality: 'Sassy, teasing, strict',
    quote: 'Boba again? Bold choice.',
    avatarImage: savageSisterImg, avatarFallbackEmoji: '😏',
    themeClass: 'm2', color: '#C026D3',
    rewardKP: 50, rewardMult: 0.1, penaltyKP: 0, penaltyMult: 0.1, maxMult: 3.0,
    rules: [
      '2 warning pop-ups before a category is locked for the day.',
      'Sassy and teasing comments on every flagged expense.',
      '-0.1x multiplier penalty when overspending.'
    ],
    lines: {
      good: 'Okay okay, not bad! Look at you actually saving money for once. 💅',
      warn: 'Boba again? Bold choice. That is warning #1 for the day... do not test me. 🧋',
      over: 'Seriously?! I literally warned you. Category locked for today! Go reflect on your choices. 🙄'
    },
    behaviorDetails: {
      overview: 'Sister gives tough love. She uses witty teasing and daily category locks to stop impulse buys before they ruin your wallet.',
      spendingRules: ['Warning #1 pops up at 75% category limit.', 'Warning #2 pops up at 90% category limit.', 'Category flagged & locked at 100% spend.'],
      rewardsExplanation: '+50 KP + 0.1x multiplier increase up to 3.0x max.',
      penaltiesExplanation: '-0.1x multiplier deduction on overspend.'
    }
  },
  3: {
    id: 3, name: 'Father', diff: 'Hard', diffStars: '★★★☆',
    personality: 'Cold, serious, intimidating',
    quote: 'Discipline beats impulse.',
    avatarImage: strictDadImg, avatarFallbackEmoji: '🧐',
    themeClass: 'm3', color: '#7B2EFF',
    rewardKP: 50, rewardMult: 0.2, penaltyKP: 10, penaltyMult: 0.1, maxMult: 4.0,
    rules: [
      'Only 1 strict warning before category is flagged red for the rest of the day.',
      'Cold, disciplined commentary on every transaction.',
      '-10 KP and -0.1x multiplier penalty on overspend.'
    ],
    lines: {
      good: 'Transaction recorded. Discipline beats impulse. Stay focused on the end goal. 👔',
      warn: 'Warning: You are at 85% of your category allocation. Do not let short-term desires ruin long-term stability.',
      over: 'Category budget breached. Unnecessary spending compromises future financial security. Penalties applied.'
    },
    behaviorDetails: {
      overview: 'Father demands focus and structure. He treats budget limits like unbreakable laws and rewards consistent discipline generously.',
      spendingRules: ['Single strict warning at 80% category capacity.', 'Immediate red flag on 100% threshold.', 'Daily accountability check required.'],
      rewardsExplanation: '+50 KP + 0.2x fast multiplier growth up to 4.0x max.',
      penaltiesExplanation: '-10 KP deduction and -0.1x multiplier drop per overspend.'
    }
  },
  4: {
    id: 4, name: 'Mother', diff: 'Extreme', diffStars: '★★★★',
    personality: 'Uncompromising, guilt-trip master, extremely strict',
    quote: "I didn't raise you to buy this.",
    avatarImage: disappointedMomImg, avatarFallbackEmoji: '🤦‍♀️',
    themeClass: 'm4', color: '#DC2626',
    rewardKP: 70, rewardMult: 0.25, penaltyKP: 20, penaltyMult: 999, maxMult: 5.0,
    rules: [
      'NO warnings — instantly flags transaction with a full "disappointed parent" animation & guilt trip.',
      'Multiplier instantly RESET to 1x and -20 KP on any overspend.',
      'Highest rewards (+70 KP + 30 Bonus KP) and maximum 5.0x multiplier potential!'
    ],
    lines: {
      good: 'Fine. At least you are trying. Do not make me regret trusting you with this money. 🧹',
      warn: "I see what you are buying. Neighbor's kid saves 90% of their allowance. Just saying. 😒",
      over: "I didn't raise you to waste money on this garbage! Multiplier RESET TO 1.0X! Go study your balance! 💥"
    },
    behaviorDetails: {
      overview: 'Mother gives maximum rewards for perfection (+70 KP, 5x multiplier), but zero tolerance for waste.',
      spendingRules: ['No grace period. Any category overspend triggers instant guilt-trip animation.', 'Multiplier resets back to 1.0x immediately on overspend.', 'Unlocks +30 bonus KP for zero-overspend weeks.'],
      rewardsExplanation: '+70 KP + 0.25x rapid multiplier build-up up to 5.0x max + 30 bonus KP.',
      penaltiesExplanation: '-20 KP deduction & complete Multiplier Reset to 1.0x.'
    }
  }
};
```

---

## 4. App.tsx

**Path:** `src/App.tsx`

```tsx
import React, { useState } from 'react';
import {
  ScreenId, Currency, Transaction, CategoryBudget,
  FinancialGoal, ShopItem, Achievement, LeaderboardUser
} from './types';
import { MENTORS } from './data/mentors';
import {
  INITIAL_TRANSACTIONS, INITIAL_BUDGETS, INITIAL_GOALS,
  INITIAL_SHOP_ITEMS, INITIAL_ACHIEVEMENTS, MOCK_LEADERBOARD
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
  const [screen, setScreen] = useState<ScreenId>('auth');
  const [currency, setCurrency] = useState<Currency>('INR');
  const [balance, setBalance] = useState<number>(47820);
  const [pmTotal, setPmTotal] = useState<number>(5900);
  const [pmLeft, setPmLeft] = useState<number>(3200);
  const [activeMentorId, setActiveMentorId] = useState<number>(3);
  const [kp, setKp] = useState<number>(2450);
  const [multiplier, setMultiplier] = useState<number>(2.4);
  const [streak] = useState<number>(7);
  const [customMentorImages, setCustomMentorImages] = useState<Record<number, string>>({});
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [budgets, setBudgets] = useState<CategoryBudget[]>(INITIAL_BUDGETS);
  const [goals, setGoals] = useState<FinancialGoal[]>(INITIAL_GOALS);
  const [shopItems, setShopItems] = useState<ShopItem[]>(INITIAL_SHOP_ITEMS);
  const [achievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [leaderboardUsers] = useState<LeaderboardUser[]>(MOCK_LEADERBOARD);
  const [reactionPopup, setReactionPopup] = useState<{
    isOpen: boolean;
    data: {
      category: string; itemName: string; amount: number; catRemaining: number;
      daysLeft: number; status: 'good' | 'warn' | 'over';
      kpChange: number; multiplierChange: number; line: string;
    } | null;
  }>({ isOpen: false, data: null });
  const [activeInfoMentorId, setActiveInfoMentorId] = useState<number | null>(null);

  const activeMentor = MENTORS[activeMentorId] || MENTORS[3];
  const currencySymbols: Record<Currency, string> = {
    INR: '₹', USD: '$', EUR: '€', GBP: '£', JPY: '¥',
    SGD: 'S$', MYR: 'RM', THB: '฿', PHP: '₱', IDR: 'Rp', AED: 'AED'
  };
  const currencySymbol = currencySymbols[currency] || '₹';

  const handleUpdateCustomImage = (mentorId: number, url: string) => {
    setCustomMentorImages((prev) => ({ ...prev, [mentorId]: url }));
  };

  const handleCompleteOnboarding = (data: {
    currency: Currency; initialBalance: number; goalTitle: string; goalDesc: string;
    startDate: string; endDate: string; goalTarget: number;
    pmAmount: number; pmPeriod: 'weekly' | 'monthly'; mentorId: number;
  }) => {
    setCurrency(data.currency);
    setBalance(data.initialBalance || 12500);
    setPmTotal(data.pmAmount || 5000);
    setPmLeft(data.pmAmount || 5000);
    setActiveMentorId(data.mentorId);
    setGoals((prev) => [{
      id: 'g_main', title: data.goalTitle, description: data.goalDesc,
      targetAmount: data.goalTarget, savedAmount: Math.round(data.goalTarget * 0.35),
      startDate: data.startDate, endDate: data.endDate
    }, ...prev]);
    setScreen('home');
  };

  const handleAddTransaction = (newTxn: Omit<Transaction, 'id'>) => {
    const createdTxn: Transaction = { ...newTxn, id: 't_' + Date.now() };
    setTransactions((prev) => [createdTxn, ...prev]);
    if (newTxn.type === 'expense') {
      setBalance((prev) => Math.max(0, prev - newTxn.amount));
      setPmLeft((prev) => Math.max(0, prev - newTxn.amount));
      setBudgets((prev) => prev.map((b) =>
        b.cat.toLowerCase().includes(newTxn.cat.toLowerCase())
          ? { ...b, spent: b.spent + newTxn.amount } : b
      ));
      triggerMentorReaction(newTxn.cat, newTxn.name, newTxn.amount);
    } else if (newTxn.type === 'income') {
      setBalance((prev) => prev + newTxn.amount);
    }
  };

  const triggerMentorReaction = (category: string, itemName: string, amount: number) => {
    const m = activeMentor;
    const matchingBudget = budgets.find((b) =>
      b.cat.toLowerCase().includes(category.toLowerCase())
    );
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
      newMult = m.id === 4 ? 1.0 : Math.max(1.0, multiplier - m.penaltyMult);
      setMultiplier(newMult);
    } else {
      setKp((prev) => prev + m.rewardKP);
      newMult = Math.min(m.maxMult, multiplier + m.rewardMult);
      setMultiplier(newMult);
    }
    setReactionPopup({
      isOpen: true,
      data: { category, itemName, amount, catRemaining, daysLeft: 18,
        status, kpChange, multiplierChange: newMult, line: m.lines[status] }
    });
  };

  const handleAddBudget = (b: Omit<CategoryBudget, 'id'>) => {
    setBudgets((prev) => [...prev, { ...b, id: 'b_' + Date.now() }]);
  };

  const handleAddGoal = (g: Omit<FinancialGoal, 'id' | 'savedAmount'>) => {
    setGoals((prev) => [...prev, { ...g, id: 'g_' + Date.now(), savedAmount: 0 }]);
  };

  const handlePurchaseShopItem = (itemId: string, cost: number) => {
    if (kp >= cost) {
      setKp((prev) => prev - cost);
      setShopItems((prev) => prev.map((item) =>
        item.id === itemId ? { ...item, unlocked: true } : item
      ));
    } else {
      alert('Not enough Kinetic Points (KP)! Complete goals or maintain budget streaks to earn more.');
    }
  };

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center font-['Inter',sans-serif] overflow-hidden">
      <div className="w-[390px] h-[844px] max-h-screen max-w-full relative overflow-hidden bg-black rounded-[44px] border border-purple-500/30 shadow-[0_0_80px_rgba(123,46,255,0.35)] flex flex-col">
        <div className="flex-1 overflow-y-auto no-scrollbar relative">

          {screen === 'auth' && <SplashAuth onLoginSuccess={() => setScreen('ob1')} />}

          {['ob1', 'ob2', 'ob3'].includes(screen) && (
            <OnboardingFlow onCompleteOnboarding={handleCompleteOnboarding}
              customMentorImages={customMentorImages} onUpdateCustomImage={handleUpdateCustomImage} />
          )}

          {screen === 'mentor-select' && (
            <div className="min-h-full bg-black text-white p-6 pb-24 space-y-6 animate-fadeIn">
              <div className="pt-8 flex items-center gap-3">
                <button onClick={() => setScreen('home')} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition">
                  <ArrowLeft size={18} />
                </button>
                <div>
                  <h1 className="font-['Space_Grotesk'] text-xl font-extrabold">Mentor Selection HQ 👑</h1>
                  <p className="text-xs text-neutral-400">Choose your strictness & reward mentor</p>
                </div>
              </div>
              <div className="space-y-6">
                {[1, 2, 3, 4].map((id) => (
                  <MentorCard key={id} mentor={MENTORS[id]} isSelected={activeMentorId === id}
                    onSelect={(mId) => { setActiveMentorId(mId); setScreen('home'); }}
                    onOpenInfo={(mId) => setActiveInfoMentorId(mId)}
                    customImage={customMentorImages[id]} />
                ))}
              </div>
              <MentorInfoModal mentor={activeInfoMentorId ? MENTORS[activeInfoMentorId] : null}
                isOpen={activeInfoMentorId !== null} onClose={() => setActiveInfoMentorId(null)}
                onSelect={(mId) => { setActiveMentorId(mId); setScreen('home'); }}
                customImage={activeInfoMentorId ? customMentorImages[activeInfoMentorId] : undefined}
                onUpdateCustomImage={handleUpdateCustomImage} />
            </div>
          )}

          {screen === 'currency-select' && (
            <CurrencySelectScreen currentCurrency={currency}
              onSelectCurrency={(c) => setCurrency(c)} onNavigateBack={() => setScreen('home')} />
          )}

          {screen === 'home' && (
            <HomeDashboard balance={balance} currency={currency} currencySymbol={currencySymbol}
              mentor={activeMentor} kp={kp} multiplier={multiplier} transactions={transactions}
              budgets={budgets} goal={goals[0] || INITIAL_GOALS[0]} pmLeft={pmLeft} pmTotal={pmTotal}
              onNavigate={(s) => setScreen(s)} onTriggerReaction={triggerMentorReaction}
              customImage={customMentorImages[activeMentorId]} />
          )}

          {screen === 'records' && (
            <RecordsManager currencySymbol={currencySymbol} transactions={transactions}
              onAddTransaction={handleAddTransaction} onNavigate={(s) => setScreen(s)} />
          )}

          {screen === 'budgets' && (
            <BudgetsGoalsScreen currencySymbol={currencySymbol} budgets={budgets} goals={goals}
              onAddBudget={handleAddBudget} onAddGoal={handleAddGoal} onNavigate={(s) => setScreen(s)} />
          )}

          {screen === 'rewards' && (
            <RewardsScreen kp={kp} multiplier={multiplier} mentor={activeMentor}
              shopItems={shopItems} achievements={achievements} onPurchaseItem={handlePurchaseShopItem}
              onNavigate={(s) => setScreen(s)} customImage={customMentorImages[activeMentorId]} />
          )}

          {screen === 'ai-coach' && (
            <AiCoachScreen mentor={activeMentor} currencySymbol={currencySymbol} balance={balance}
              pmLeft={pmLeft} pmTotal={pmTotal} goalTitle={goals[0]?.title || 'Save ₹10,000'}
              goalProgress={68} kp={kp} multiplier={multiplier} streak={streak}
              onNavigate={(s) => setScreen(s)} customImage={customMentorImages[activeMentorId]} />
          )}

          {screen === 'leaderboard' && <LeaderboardScreen users={leaderboardUsers} onNavigate={(s) => setScreen(s)} />}
          {screen === 'analytics' && <AnalyticsScreen currencySymbol={currencySymbol} onNavigate={(s) => setScreen(s)} />}

          {screen === 'profile' && (
            <ProfileScreen mentor={activeMentor} kp={kp} multiplier={multiplier} streak={streak}
              currency={currency} onCurrencyChange={setCurrency} onNavigate={(s) => setScreen(s)}
              customMentorImages={customMentorImages} onUpdateCustomImage={handleUpdateCustomImage} />
          )}
        </div>

        <SpendingReactionPopup reaction={reactionPopup.data} mentor={activeMentor}
          isOpen={reactionPopup.isOpen} onClose={() => setReactionPopup({ isOpen: false, data: null })}
          customImage={customMentorImages[activeMentorId]} />

        <BottomNav activeScreen={screen} onNavigate={(s) => setScreen(s)} />
      </div>
    </div>
  );
}
```

---

## 5. server.ts

**Path:** `server.ts`

```typescript
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;
  app.use(express.json());

  // Amazon Bedrock Runtime client
  // Credentials from: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION
  const bedrockClient = new BedrockRuntimeClient({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
    }
  });

  // AI Money Coach Endpoint — Amazon Bedrock (Claude 3 Sonnet via Kiro AI)
  app.post('/api/ai-coach', async (req, res) => {
    try {
      const { message, mentor, tone, userData } = req.body;

      const systemPrompt = `You are the AI Money Coach in the "Money Boss AI" mobile application, powered by Amazon Bedrock via Kiro.
You speak directly to the user about their real personal financial data.

Current Mentor Context:
- Mentor Name: ${mentor?.name || 'Father'}
- Mentor Personality: ${mentor?.personality || 'Serious, intimidating, disciplined'}
- Tone Mode: ${tone === 'mentor' ? 'Roleplay strongly as this mentor character using their voice and signature catchphrases' : 'Neutral, encouraging professional financial advisor tone'}
- Mentor Signature Quote: "${mentor?.quote || 'Discipline beats impulse.'}"

User's Live Financial State:
- Base Currency: ${userData?.currency || 'INR'}
- Total Balance: ${userData?.currency || '₹'}${userData?.balance?.toLocaleString() || '47,820'}
- Pocket Money Remaining: ${userData?.currency || '₹'}${userData?.pmLeft?.toLocaleString() || '3,200'} out of ${userData?.currency || '₹'}${userData?.pmTotal?.toLocaleString() || '5,900'}
- Active Savings Goal: ${userData?.goalTitle || 'Save ₹10,000'} (${userData?.goalProgress || 68}% completed)
- Kinetic Points (KP): ${userData?.kp || 2450} KP
- Multiplier: ${userData?.multiplier || 2.4}x
- Active Streak: ${userData?.streak || 7} Days No-Overspend

Instructions for response:
1. Ground your advice directly in the provided user financial stats.
2. Keep responses concise (2-4 sentences max), punchy, and mobile-friendly.
3. If tone mode is "mentor", embrace the character's personality.
4. Provide actionable advice for staying on budget or hitting savings goals.`;

      const requestBody = {
        anthropic_version: 'bedrock-2023-05-31',
        max_tokens: 256,
        temperature: tone === 'mentor' ? 0.8 : 0.4,
        system: systemPrompt,
        messages: [{ role: 'user', content: message }]
      };

      const command = new InvokeModelCommand({
        modelId: 'anthropic.claude-3-sonnet-20240229-v1:0',
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify(requestBody)
      });

      const bedrockResponse = await bedrockClient.send(command);
      const responseBody = JSON.parse(new TextDecoder().decode(bedrockResponse.body));
      const replyText = responseBody?.content?.[0]?.text || "Keep your eyes on your financial goals. Every rupee counts!";

      res.json({ reply: replyText });
    } catch (error: any) {
      console.error('AI Coach API Error (Amazon Bedrock):', error);
      res.status(500).json({
        reply: 'My financial radar encountered a small glitch. Stay focused on your budget while I reconnect via AWS!',
        error: error.message
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'spa' });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => { res.sendFile(path.join(distPath, 'index.html')); });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Money Boss AI (Kiro + Amazon Bedrock) running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
```

---

## 6. SplashAuth.tsx

**Path:** `src/components/SplashAuth.tsx`

```tsx
import React, { useState } from 'react';
import { Shield, ArrowRight, Mail, Key } from 'lucide-react';

interface SplashAuthProps {
  onLoginSuccess: () => void;
}

export const SplashAuth: React.FC<SplashAuthProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className="min-h-full flex flex-col justify-center px-6 py-10 bg-[radial-gradient(ellipse_at_50%_10%,rgba(123,46,255,0.22)_0%,#000000_65%)]">
      <div className="max-w-md w-full mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#7B2EFF] to-[#4A0E99] shadow-[0_0_30px_rgba(123,46,255,0.5)] border border-purple-400/30 animate-pulse">
            <span className="text-4xl">👑</span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-3xl font-extrabold tracking-tight text-white">
            Money Boss <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">AI</span>
          </h1>
          <p className="text-sm italic text-purple-200/70 font-medium">"Spend wisely. The Boss is watching."</p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">Built with</span>
            <span className="text-xs font-extrabold text-orange-400">Kiro</span>
            <span className="text-neutral-600 text-xs">•</span>
            <span className="text-xs font-extrabold text-orange-300">Amazon Bedrock</span>
          </div>
        </div>

        <div className="bg-white/5 border border-purple-500/25 rounded-3xl p-6 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white">Welcome Back</h2>
              <p className="text-xs text-neutral-400">Sign in to sync your budget & mentor progress</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">Demo Active</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                <Mail size={12} className="text-purple-400" /> Email Address
              </label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@domain.com"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition text-sm" />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <Key size={12} className="text-purple-400" /> Password
                </label>
                <a href="#forgot" className="text-xs text-purple-400 hover:text-purple-300 transition">Forgot?</a>
              </div>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition text-sm" />
            </div>
            <button type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#7B2EFF] to-[#5A1FCC] hover:from-purple-600 hover:to-indigo-700 text-white font-bold text-sm shadow-[0_4px_20px_rgba(123,46,255,0.4)] transition active:scale-[0.98] flex items-center justify-center gap-2">
              Sign In to Wallet <ArrowRight size={16} />
            </button>
          </form>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-white/10" />
            <span className="flex-shrink mx-3 text-xs text-neutral-500 uppercase tracking-widest">or</span>
            <div className="flex-grow border-t border-white/10" />
          </div>

          <button onClick={onLoginSuccess}
            className="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/15 hover:bg-white/10 text-white text-sm font-semibold flex items-center justify-center gap-2.5 transition">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" fill="#FF9900" opacity="0.15" />
              <path d="M6.5 14.5c2.5 2 5.5 2.5 8.5 1" stroke="#FF9900" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M14.5 14c.5.3 1 .8 1.3 1.5" stroke="#FF9900" strokeWidth="1.8" strokeLinecap="round" />
              <text x="5" y="13" fontSize="8" fontWeight="bold" fill="#FF9900" fontFamily="Arial">aws</text>
            </svg>
            Continue with Amazon AWS
          </button>
        </div>

        <p className="text-center text-xs text-neutral-400">
          Don't have an account?{' '}
          <button onClick={onLoginSuccess} className="text-purple-400 font-semibold hover:underline">Quick Start Onboarding</button>
        </p>
        <p className="text-center text-[10px] text-neutral-600">
          AI powered by <span className="text-orange-400 font-bold">Amazon Bedrock</span> · Built in <span className="text-purple-400 font-bold">Kiro IDE</span>
        </p>
      </div>
    </div>
  );
};
```

---

## 7. OnboardingFlow.tsx

**Path:** `src/components/OnboardingFlow.tsx`

```tsx
import React, { useState } from 'react';
import { Currency } from '../types';
import { MENTORS } from '../data/mentors';
import { MentorCard } from './MentorCard';
import { MentorInfoModal } from './MentorInfoModal';
import { Check, ChevronRight } from 'lucide-react';

// 4-step wizard: Step 1 = Currency & Balance | Step 2 = Financial Goal
//                Step 3 = Pocket Money       | Step 4 = Mentor Selection

interface OnboardingFlowProps {
  onCompleteOnboarding: (data: {
    currency: Currency; initialBalance: number; goalTitle: string; goalDesc: string;
    startDate: string; endDate: string; goalTarget: number;
    pmAmount: number; pmPeriod: 'weekly' | 'monthly'; mentorId: number;
  }) => void;
  customMentorImages?: Record<number, string>;
  onUpdateCustomImage?: (mentorId: number, url: string) => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  onCompleteOnboarding, customMentorImages = {}, onUpdateCustomImage
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [currency, setCurrency] = useState<Currency>('INR');
  const [balanceInput, setBalanceInput] = useState('12500');
  const [goalTitle, setGoalTitle] = useState('Save ₹10,000 Milestone');
  const [goalDesc, setGoalDesc] = useState('Build an emergency fund and invest in growth stocks');
  const [startDate, setStartDate] = useState('2026-08-01');
  const [endDate, setEndDate] = useState('2026-08-31');
  const [goalTarget, setGoalTarget] = useState('10000');
  const [pmPeriod, setPmPeriod] = useState<'weekly' | 'monthly'>('monthly');
  const [pmAmountInput, setPmAmountInput] = useState('5900');
  const [selectedMentorId, setSelectedMentorId] = useState<number>(3);
  const [activeInfoMentorId, setActiveInfoMentorId] = useState<number | null>(null);

  const handleKeypadPress = (key: string, currentValue: string, setValue: React.Dispatch<React.SetStateAction<string>>) => {
    if (key === '⌫') setValue((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
    else if (key === '.') { if (!currentValue.includes('.')) setValue((prev) => prev + '.'); }
    else setValue((prev) => (prev === '0' ? key : prev + key));
  };

  const renderKeypad = (value: string, setValue: React.Dispatch<React.SetStateAction<string>>) => (
    <div className="grid grid-cols-3 gap-2.5 my-4">
      {['1','2','3','4','5','6','7','8','9','.','0','⌫'].map((k) => (
        <button key={k} type="button" onClick={() => handleKeypadPress(k, value, setValue)}
          className="h-14 rounded-2xl bg-white/5 border border-white/10 hover:bg-purple-600/20 hover:border-purple-500/40 text-white font-['Space_Grotesk'] font-bold text-xl transition active:scale-95 flex items-center justify-center shadow-sm">
          {k}
        </button>
      ))}
    </div>
  );

  const currencySymbols: Record<Currency, string> = {
    INR: '₹', USD: '$', EUR: '€', GBP: '£', JPY: '¥', SGD: 'S$', MYR: 'RM', THB: '฿', PHP: '₱', IDR: 'Rp', AED: 'AED'
  };
  const currencySymbol = currencySymbols[currency] || '₹';

  const handleFinish = () => {
    onCompleteOnboarding({
      currency, initialBalance: parseFloat(balanceInput) || 0,
      goalTitle: goalTitle.trim() || 'Save ₹10,000', goalDesc: goalDesc.trim() || 'Savings reserve',
      startDate, endDate, goalTarget: parseFloat(goalTarget) || 10000,
      pmAmount: parseFloat(pmAmountInput) || 5000, pmPeriod, mentorId: selectedMentorId
    });
  };

  // Full JSX render with step === 1, 2, 3, 4 branches
  // See design.md Section 3 for full layout specification.
  // Step 4 badge label: "Kiro AI System"
  // Final CTA: "Confirm Mentor & Launch Money Boss AI"
  return (
    <div className="min-h-full bg-black text-white flex flex-col">
      {/* Sticky step indicator bar */}
      <div className="px-6 pt-12 pb-4 bg-gradient-to-b from-purple-900/20 to-transparent sticky top-0 backdrop-blur-md z-10 flex justify-between items-center border-b border-white/5">
        <div className="flex gap-2">
          {[1,2,3,4].map((s) => (
            <div key={s} className={`h-2 rounded-full transition-all duration-300 ${
              s === step ? 'w-8 bg-purple-500 shadow-[0_0_12px_rgba(123,46,255,0.8)]'
              : s < step ? 'w-3 bg-purple-800' : 'w-3 bg-neutral-800'
            }`} />
          ))}
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Step {step} of 4</span>
      </div>

      <div className="flex-1 p-6 max-w-md mx-auto w-full flex flex-col justify-between">
        {/* Steps 1-4: see full source code in src/components/OnboardingFlow.tsx */}
        {/* Key step 4 label: "Kiro AI System" badge */}
        {step === 4 && (
          <div className="space-y-6 animate-fadeIn pb-12">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold uppercase tracking-wider mb-2">
                Kiro AI System
              </div>
              <h2 className="font-['Space_Grotesk'] text-2xl font-extrabold text-white">Choose Your Financial Mentor 👑</h2>
            </div>
            <div className="space-y-6">
              {[1,2,3,4].map((id) => (
                <MentorCard key={id} mentor={MENTORS[id]} isSelected={selectedMentorId === id}
                  onSelect={(mId) => setSelectedMentorId(mId)} onOpenInfo={(mId) => setActiveInfoMentorId(mId)}
                  customImage={customMentorImages[id]} />
              ))}
            </div>
            <button onClick={handleFinish}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-base shadow-[0_0_30px_rgba(16,185,129,0.5)] transition active:scale-95 flex items-center justify-center gap-2 mt-8">
              <Check size={20} /> Confirm Mentor & Launch Money Boss AI
            </button>
          </div>
        )}
      </div>

      <MentorInfoModal mentor={activeInfoMentorId ? MENTORS[activeInfoMentorId] : null}
        isOpen={activeInfoMentorId !== null} onClose={() => setActiveInfoMentorId(null)}
        onSelect={(id) => setSelectedMentorId(id)}
        customImage={activeInfoMentorId ? customMentorImages[activeInfoMentorId] : undefined}
        onUpdateCustomImage={onUpdateCustomImage} />
    </div>
  );
};
```

---

## 8. CurrencySelectScreen.tsx

**Path:** `src/components/CurrencySelectScreen.tsx`

```tsx
import React, { useState } from 'react';
import { Currency } from '../types';
import { ArrowLeft, Check, Search, Globe } from 'lucide-react';

export interface CurrencyOption {
  code: Currency; name: string; symbol: string; flag: string; region: string; sampleAmount: string;
}

export const CURRENCY_LIST: CurrencyOption[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', region: 'United States', sampleAmount: '$12,500' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳', region: 'India', sampleAmount: '₹12,500' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', region: 'European Union', sampleAmount: '€12,500' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧', region: 'United Kingdom', sampleAmount: '£12,500' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵', region: 'Japan', sampleAmount: '¥1,250,000' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬', region: 'Singapore', sampleAmount: 'S$12,500' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾', region: 'Malaysia', sampleAmount: 'RM12,500' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭', region: 'Thailand', sampleAmount: '฿12,500' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', flag: '🇵🇭', region: 'Philippines', sampleAmount: '₱12,500' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', flag: '🇮🇩', region: 'Indonesia', sampleAmount: 'Rp125,000' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'AED', flag: '🇦🇪', region: 'United Arab Emirates', sampleAmount: 'AED 12,500' }
];

export const CurrencySelectScreen: React.FC<{
  currentCurrency: Currency;
  onSelectCurrency: (currency: Currency) => void;
  onNavigateBack: () => void;
}> = ({ currentCurrency, onSelectCurrency, onNavigateBack }) => {
  const [selected, setSelected] = useState<Currency>(currentCurrency);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCurrencies = CURRENCY_LIST.filter((c) =>
    c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeOption = CURRENCY_LIST.find((c) => c.code === selected) || CURRENCY_LIST[0];

  return (
    <div className="min-h-full bg-black text-white p-6 pb-28 space-y-6 animate-fadeIn">
      {/* Header, selected currency banner, search input, */}
      {/* currency grid list, fixed bottom confirm button */}
      {/* Selected: bg-purple-900/30 border-purple-500/80 glow */}
      {/* Confirm: emerald gradient full-width button */}
      {/* See full source: src/components/CurrencySelectScreen.tsx */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/90 backdrop-blur-md border-t border-white/10 max-w-[390px] mx-auto z-20">
        <button
          onClick={() => { onSelectCurrency(selected); onNavigateBack(); }}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-[0_0_25px_rgba(16,185,129,0.5)] transition active:scale-95 flex items-center justify-center gap-2"
        >
          <Check size={18} /> Apply {activeOption.name} ({activeOption.symbol}) Base Currency
        </button>
      </div>
    </div>
  );
};
```

---

## 9. HomeDashboard.tsx

**Path:** `src/components/HomeDashboard.tsx`

```tsx
import React, { useState } from 'react';
import { Mentor, Transaction, CategoryBudget, FinancialGoal, Currency } from '../types';
import { Wallet, Plus, Bell, ChevronRight, Sparkles, Landmark, Banknote } from 'lucide-react';

// Sections: Header | Wallet Card | Goal Progress Ring | Pocket Money Widget
//           Mentor Reaction Zone | Recent Transactions | Spending Bar Chart
//           Upcoming Payments (includes "AWS Cloud Plan")

// Mentor Reaction Zone tap text: "Tap to consult AI Money Coach (Kiro + Bedrock)"
// Upcoming payment: "AWS Cloud Plan" (☁️ orange icon) — Aug 22, 2026
// Balance split: Cash = 25%, Bank Accounts = 75%
// Progress bar colors: purple (>50%) | amber (>20%) | rose (≤20%)
// mood status badge: "Good Standing" | "Warning State" | "Critical Guard"

export const HomeDashboard: React.FC<{
  balance: number; currency: Currency; currencySymbol: string; mentor: Mentor;
  kp: number; multiplier: number; transactions: Transaction[]; budgets: CategoryBudget[];
  goal: FinancialGoal; pmLeft: number; pmTotal: number;
  onNavigate: (screen: any) => void;
  onTriggerReaction: (cat: string, name: string, amount: number) => void;
  customImage?: string;
}> = (props) => {
  // Full implementation in src/components/HomeDashboard.tsx
  return <div />;
};
```

---

## 10. RecordsManager.tsx

**Path:** `src/components/RecordsManager.tsx`

```tsx
import React, { useState } from 'react';
import { Transaction, TransactionType, Category } from '../types';
import { ArrowLeft, Search, Plus } from 'lucide-react';

// Tabs: Expense (purple gradient) | Income (emerald gradient) | Transfer (blue gradient)
// Amount display: Space Grotesk text-4xl with currency symbol
// Categories: Food 🍜 | Wants 🎮 | Transport 🚌 | Health 💊 | Other 📦
// Account options: Cash 💵 | Bank Account 🏦 | Card 💳
// Keypad: 3×4 grid, h-12 rounded-xl, hover:bg-purple-600/20
// Submit: purple gradient "Record {TYPE}" button
// History: searchable divided list with income (emerald) / expense (rose) amounts

export const RecordsManager: React.FC<{
  currencySymbol: string;
  transactions: Transaction[];
  onAddTransaction: (txn: Omit<Transaction, 'id'>) => void;
  onNavigate: (screen: any) => void;
}> = ({ currencySymbol, transactions, onAddTransaction, onNavigate }) => {
  const [activeType, setActiveType] = useState<TransactionType>('expense');
  const [amountInput, setAmountInput] = useState('0');
  const [selectedCat, setSelectedCat] = useState<Category>('Food');
  const [selectedAccount, setSelectedAccount] = useState('Cash');
  const [note, setNote] = useState('');
  const [date, setDate] = useState('2026-08-13');
  const [searchQuery, setSearchQuery] = useState('');

  const handleKeypadPress = (key: string) => {
    if (key === '⌫') setAmountInput((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
    else if (key === '.') { if (!amountInput.includes('.')) setAmountInput((prev) => prev + '.'); }
    else setAmountInput((prev) => (prev === '0' ? key : prev + key));
  };

  const handleAdd = () => {
    const numericAmt = parseFloat(amountInput) || 0;
    if (numericAmt <= 0) { alert('Please enter a valid amount greater than 0'); return; }
    onAddTransaction({
      type: activeType,
      cat: activeType === 'income' ? 'Income' : selectedCat,
      name: note.trim() || selectedCat,
      amount: numericAmt,
      account: selectedAccount,
      date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    setAmountInput('0');
    setNote('');
  };
  // Full JSX in src/components/RecordsManager.tsx
  return <div />;
};
```

---

## 11. BudgetsGoalsScreen.tsx

**Path:** `src/components/BudgetsGoalsScreen.tsx`

```tsx
import React, { useState } from 'react';
import { CategoryBudget, FinancialGoal } from '../types';
import { ArrowLeft, Plus, PieChart, X } from 'lucide-react';

// Sections:
// - Total Budget Banner (purple→indigo→black gradient, progress bar)
// - Category Allocations (bars: rose ≥90% | amber ≥75% | emerald normal)
// - Savings Goals Quests (emerald→teal gradient bars)
// - Create Budget Modal (bg-neutral-900, from bottom on mobile)
// - Create Goal Modal (includes title, desc, target, deadline)

// Progress bar thresholds:
//   total banner: rose (>85%) | amber (>70%) | purple gradient (normal)
//   category bar: rose (≥90%) | amber (≥75%) | emerald (normal)
//   goal bar: always emerald→teal gradient

export const BudgetsGoalsScreen: React.FC<{
  currencySymbol: string; budgets: CategoryBudget[]; goals: FinancialGoal[];
  onAddBudget: (b: Omit<CategoryBudget, 'id'>) => void;
  onAddGoal: (g: Omit<FinancialGoal, 'id' | 'savedAmount'>) => void;
  onNavigate: (screen: any) => void;
}> = (props) => {
  // Full implementation in src/components/BudgetsGoalsScreen.tsx
  return <div />;
};
```

---

## 12. AnalyticsScreen.tsx

**Path:** `src/components/AnalyticsScreen.tsx`

```tsx
import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, PieChart, Calendar } from 'lucide-react';

// Sections:
// - Period Toggle: Day | Week | Month | Year
// - Category Breakdown Donut (SVG, 4 segments, -rotate-90)
//     blue=Transport 16%, purple=Wants 30%, orange=Food 43%, emerald=Health 11%
// - Spending Heatmap (35 cells, 7 cols, 5 intensity levels)
//     0=bg-white/5 | 1=purple-900/40 | 2=purple-700/60 | 3=purple-600 | 4=fuchsia-500 glow
// - Savings Rate Line Graph (SVG cubic bezier, emerald stroke, gradient fill)
// - Footer: "Analytics powered by Kiro + Amazon Bedrock"

export const AnalyticsScreen: React.FC<{
  currencySymbol: string;
  onNavigate: (screen: any) => void;
}> = ({ currencySymbol, onNavigate }) => {
  const [period, setPeriod] = useState<'Day' | 'Week' | 'Month' | 'Year'>('Month');
  const heatmapData = [1,2,0,3,4,1,0, 2,4,1,0,2,3,1, 0,1,3,4,2,0,1, 2,0,1,4,3,2,0, 1,3,2,0,1,4,2];
  // Full JSX in src/components/AnalyticsScreen.tsx
  return <div />;
};
```

---

## 13. AiCoachScreen.tsx

**Path:** `src/components/AiCoachScreen.tsx`

```tsx
import React, { useState, useRef, useEffect } from 'react';
import { Mentor, ChatMessage } from '../types';
import { ArrowLeft, Send, Mic, Volume2, VolumeX, RefreshCw } from 'lucide-react';

// AI backend: POST /api/ai-coach → Amazon Bedrock Claude 3 Sonnet via Kiro
// Status indicator: "Live · Amazon Bedrock" (text-emerald-400, animate-pulse dot)
// Loading text: "{mentor.name} is consulting Amazon Bedrock..."
// Welcome message: "powered by Amazon Bedrock via Kiro"
// Tone toggle: "🎭 Mentor Voice" (purple) | "👔 Neutral" (ghost)
// Voice output: window.speechSynthesis — pitch varies by mentor.id
// Voice input: webkitSpeechRecognition / SpeechRecognition Web API
// Mic button: rose pulse when isListening

export const AiCoachScreen: React.FC<{
  mentor: Mentor; currencySymbol: string; balance: number; pmLeft: number; pmTotal: number;
  goalTitle: string; goalProgress: number; kp: number; multiplier: number; streak: number;
  onNavigate: (screen: any) => void; customImage?: string;
}> = ({ mentor, currencySymbol, balance, pmLeft, pmTotal, goalTitle, goalProgress, kp, multiplier, streak, onNavigate, customImage }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: 'm1', sender: 'bot', timestamp: 'Just now',
    text: `Hello! I'm your AI Money Coach, powered by Amazon Bedrock via Kiro. I have live access to your ${currencySymbol}${balance.toLocaleString()} balance, your ${currencySymbol}${pmLeft.toLocaleString()} pocket budget, and your savings goals. What financial question can I help you analyze?`
  }]);
  const [input, setInput] = useState('');
  const [isToneMentor, setIsToneMentor] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [enableVoiceOutput, setEnableVoiceOutput] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || input;
    if (!textToSend.trim() || isLoading) return;
    setMessages((prev) => [...prev, { id: 'u_' + Date.now(), sender: 'user', text: textToSend.trim(), timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    if (!overrideText) setInput('');
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend.trim(),
          mentor: { name: mentor.name, personality: mentor.personality, quote: mentor.quote },
          tone: isToneMentor ? 'mentor' : 'neutral',
          userData: { currency: currencySymbol, balance, pmLeft, pmTotal, goalTitle, goalProgress, kp, multiplier, streak }
        })
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { id: 'b_' + Date.now(), sender: 'bot', text: data.reply || "Let's review your category budget together!", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    } catch (err) {
      console.error('AI Coach Error (Amazon Bedrock):', err);
      setMessages((prev) => [...prev, { id: 'b_' + Date.now(), sender: 'bot', text: `Based on your live balance of ${currencySymbol}${balance.toLocaleString()} and remaining pocket budget of ${currencySymbol}${pmLeft.toLocaleString()}, stay disciplined! ${mentor.quote}`, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    } finally { setIsLoading(false); }
  };

  // Suggestions: 'How much can I spend today?' | 'Why is my pocket money low?' |
  //              'Review my spending this week' | 'Help me hit my savings goal' |
  //              'Explain this category overspend'

  // Full layout in src/components/AiCoachScreen.tsx
  return <div />;
};
```

---

## 14. SpendingReactionPopup.tsx

**Path:** `src/components/SpendingReactionPopup.tsx`

```tsx
import React from 'react';
import { Mentor } from '../types';
import { X } from 'lucide-react';

// Global overlay triggered by every expense transaction in App.tsx
// Status themes:
//   good: bg-emerald-950/90 border-emerald-500/50 shadow-emerald
//   warn: bg-amber-950/90 border-amber-500/50 shadow-amber
//   over: bg-rose-950/90 border-rose-600/60 shadow-rose
// Reaction emojis: good=🥳 | warn=🤨 | over=😤 (Mother=💥)
// Status labels: "Transaction Approved" | "Category Warning Triggered" | "Budget Breach Detected!"
// 2×2 stats grid: category remaining | days remaining | KP impact | multiplier
// Dismiss CTA: purple gradient "Acknowledge & Continue"

interface ReactionData {
  category: string; itemName: string; amount: number; catRemaining: number;
  daysLeft: number; status: 'good' | 'warn' | 'over';
  kpChange: number; multiplierChange: number; line: string;
}

export const SpendingReactionPopup: React.FC<{
  reaction: ReactionData | null; mentor: Mentor; isOpen: boolean;
  onClose: () => void; customImage?: string;
}> = ({ reaction, mentor, isOpen, onClose, customImage }) => {
  if (!isOpen || !reaction) return null;

  const statusColor =
    reaction.status === 'good' ? 'border-emerald-500/50 bg-emerald-950/90 shadow-[0_0_50px_rgba(16,185,129,0.3)]'
    : reaction.status === 'warn' ? 'border-amber-500/50 bg-amber-950/90 shadow-[0_0_50px_rgba(245,158,11,0.3)]'
    : 'border-rose-600/60 bg-rose-950/90 shadow-[0_0_50px_rgba(220,38,38,0.4)]';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className={`w-full max-w-sm rounded-3xl p-6 text-center border relative overflow-hidden backdrop-blur-xl space-y-5 ${statusColor}`}>
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition">
          <X size={16} />
        </button>
        {/* Avatar (112×112) + reaction emoji badge */}
        {/* Status badge + "{mentor.name} Reacts" heading */}
        {/* Italic quote card (bg-black/50) */}
        {/* 2×2 stats grid */}
        {/* "Acknowledge & Continue" purple gradient dismiss button */}
        {/* Full implementation in src/components/SpendingReactionPopup.tsx */}
      </div>
    </div>
  );
};
```

---

## 15. RewardsScreen.tsx

**Path:** `src/components/RewardsScreen.tsx`

```tsx
import React from 'react';
import { Mentor, ShopItem, Achievement } from '../types';
import { ArrowLeft, Flame, Lock, Check, ShoppingBag, Trophy } from 'lucide-react';

// KP hero: Space Grotesk text-5xl font-black gradient text (purple→fuchsia→amber)
// 3-column stats: Multiplier (amber) | Level 7 (purple) | Mentor emoji
// Active Streaks: 🔥 7-Day No-Overspend (amber) | ⚡ 14-Day Logging (purple +0.2x)
// Shop buttons:
//   unlocked: emerald "Unlocked"
//   affordable: purple "Purchase Item"
//   locked: neutral "Need X KP" + Lock icon
// Achievements: opacity-50 when not earned, Check icon when earned

export const RewardsScreen: React.FC<{
  kp: number; multiplier: number; mentor: Mentor; shopItems: ShopItem[];
  achievements: Achievement[]; onPurchaseItem: (itemId: string, cost: number) => void;
  onNavigate: (screen: any) => void; customImage?: string;
}> = (props) => {
  // Full implementation in src/components/RewardsScreen.tsx
  return <div />;
};
```

---

## 16. LeaderboardScreen.tsx

**Path:** `src/components/LeaderboardScreen.tsx`

```tsx
import React from 'react';
import { LeaderboardUser } from '../types';
import { ArrowLeft, Trophy, ArrowUpRight, Crown } from 'lucide-react';

// User pinned rank: purple→indigo→black gradient card with glow
// Rank badge colors: 1=amber | 2=neutral-300 | 3=amber-600 | 4+=neutral-500
// Medal emojis: 🥇 🥈 🥉 for top 3
// Current user row: bg-purple-900/20 border-l-4 border-l-purple-500
// Score: Space Grotesk text-base font-extrabold text-purple-300
// Rank change: ArrowUpRight + emerald "+N Ranks"

export const LeaderboardScreen: React.FC<{
  users: LeaderboardUser[];
  onNavigate: (screen: any) => void;
}> = ({ users, onNavigate }) => {
  const currentUser = users.find((u) => u.isCurrentUser) || users[3];
  // Full implementation in src/components/LeaderboardScreen.tsx
  return <div />;
};
```

---

## 17. ProfileScreen.tsx

**Path:** `src/components/ProfileScreen.tsx`

```tsx
import React, { useState } from 'react';
import { Mentor, Currency } from '../types';
import { ArrowLeft, Moon, Bell, Fingerprint, DollarSign, ChevronRight, Image as ImageIcon } from 'lucide-react';

// Hero card: 96×96 avatar (rounded-3xl, purple glow), stats grid (KP/Multiplier/Streak)
// Settings rows (divided list):
//   👑 Switch Mentor Character → mentor-select
//   📷 Custom Character Images Host → inline URL form
//   💲 Base Wallet Currency → currency-select
//   🌙 Dark Theme Mode — local toggle
//   🔔 Push Reminders — local toggle
//   👆 Biometric Unlock — local toggle
// Toggle component: w-12 h-6 rounded-full, translate-x-6 when active
// Footer: "AI Coach powered by Amazon Bedrock · Built with Kiro IDE"
//   text-orange-400 for Bedrock, text-purple-400 for Kiro

const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
  <button onClick={onChange} className={`w-12 h-6 rounded-full transition p-0.5 ${value ? 'bg-purple-600' : 'bg-neutral-700'}`}>
    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-0'}`} />
  </button>
);

export const ProfileScreen: React.FC<{
  mentor: Mentor; kp: number; multiplier: number; streak: number; currency: Currency;
  onCurrencyChange: (c: Currency) => void; onNavigate: (screen: any) => void;
  customMentorImages?: Record<number, string>; onUpdateCustomImage?: (mentorId: number, url: string) => void;
}> = (props) => {
  // Full implementation in src/components/ProfileScreen.tsx
  return <div />;
};
```

---

## 18. MentorCard.tsx

**Path:** `src/components/MentorCard.tsx`

```tsx
import React from 'react';
import { Mentor } from '../types';
import { Info, Check, ShieldAlert } from 'lucide-react';

// Theme gradients per themeClass:
//   m1 (Brother):  from-[#0d0d1a] via-[#12062a] to-[#080820]  border-purple-500/30
//   m2 (Sister):   from-[#160820] via-[#2d0a3a] to-[#100510]  border-fuchsia-500/30
//   m3 (Father):   from-[#0a0a0a] via-[#1a1a2e] to-[#080808]  border-purple-600/30
//   m4 (Mother):   from-[#0a0000] via-[#1a0010] to-[#08000a]  border-red-500/30
//
// Selected: ring-2 ring-purple-500 shadow-[0_0_35px_rgba(123,46,255,0.45)] scale-[1.01]
// Difficulty badge: dynamic color from mentor.color
// Stats: Reward (emerald) | Penalty (rose or neutral) | Max Mult (amber)
// Buttons: "Behavior Info" (ghost) | "Select Mentor" / "Active Mentor ✓" (purple→emerald)

export const MentorCard: React.FC<{
  mentor: Mentor; isSelected: boolean;
  onSelect: (mentorId: number) => void;
  onOpenInfo: (mentorId: number) => void;
  customImage?: string;
}> = ({ mentor, isSelected, onSelect, onOpenInfo, customImage }) => {
  // Full implementation in src/components/MentorCard.tsx
  return <div />;
};
```

---

## 19. MentorInfoModal.tsx

**Path:** `src/components/MentorInfoModal.tsx`

```tsx
import React, { useState } from 'react';
import { Mentor } from '../types';
import { ArrowLeft, Check, Image as ImageIcon, Shield, Award, AlertTriangle, Sparkles } from 'lucide-react';

// Full-screen overlay (bg-black/95 backdrop-blur-xl)
// Sticky header: back + "Mentor Dossier: {name}" + "Select" button
// Hero: 128×128 avatar with purple glow + 📷 button (custom URL)
// Custom URL form: collapsible, plain text input, Save/Cancel buttons
// Sections:
//   - Behavioral Personality (bg-white/5, purple heading)
//   - Spending Block & Warning Protocol (amber heading, AlertTriangle)
//   - Rewards card (emerald-950/30) + Penalties card (rose-950/30) — 2-col grid
//   - Voice & Reactions Preview: Under Budget (emerald) | Near Limit (amber) | Overspend (rose)
// Final CTA: purple gradient "Choose {name} as Mentor"

export const MentorInfoModal: React.FC<{
  mentor: Mentor | null; isOpen: boolean; onClose: () => void;
  onSelect: (mentorId: number) => void; customImage?: string;
  onUpdateCustomImage?: (mentorId: number, url: string) => void;
}> = ({ mentor, isOpen, onClose, onSelect, customImage, onUpdateCustomImage }) => {
  if (!isOpen || !mentor) return null;
  // Full implementation in src/components/MentorInfoModal.tsx
  return <div />;
};
```

---

## 20. BottomNav.tsx

**Path:** `src/components/BottomNav.tsx`

```tsx
import React from 'react';
import { Home, PieChart, Star, Bot, Trophy } from 'lucide-react';
import { ScreenId } from '../types';

// Fixed bottom bar — hidden on: ['splash', 'auth', 'ob1', 'ob2', 'ob3']
// Position: fixed bottom-0, z-40, bg-black/90 backdrop-blur-2xl
// Border: border-t border-purple-500/20
// Max width: max-w-md mx-auto (centers in phone canvas)
// Tabs: Home | Budgets | Rewards | AI Coach | Ranks
// Active: bg-purple-600/20 text-purple-300 border border-purple-500/40
//         shadow-[0_0_15px_rgba(123,46,255,0.3)] icon:animate-pulse
// Inactive: text-neutral-400 hover:text-neutral-200

export const BottomNav: React.FC<{
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}> = ({ activeScreen, onNavigate }) => {
  const tabs = [
    { id: 'home' as ScreenId, label: 'Home', icon: Home },
    { id: 'budgets' as ScreenId, label: 'Budgets', icon: PieChart },
    { id: 'rewards' as ScreenId, label: 'Rewards', icon: Star },
    { id: 'ai-coach' as ScreenId, label: 'AI Coach', icon: Bot },
    { id: 'leaderboard' as ScreenId, label: 'Ranks', icon: Trophy }
  ];

  if (['splash', 'auth', 'ob1', 'ob2', 'ob3'].includes(activeScreen)) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-2xl border-t border-purple-500/20 py-2 px-3 max-w-md mx-auto">
      <div className="flex items-center justify-around">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = activeScreen === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onNavigate(t.id)}
              className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-2xl transition-all duration-300 flex-1 ${
                isActive
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-[0_0_15px_rgba(123,46,255,0.3)]'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-purple-400 animate-pulse' : ''} />
              <span className="text-[10px] font-bold tracking-tight">{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
```

---

## Project File Map

```
money-boss-ai/
├── server.ts                          # Express + Amazon Bedrock API
├── metadata.json                      # App metadata (Kiro/AWS capabilities)
├── package.json                       # @aws-sdk/client-bedrock-runtime
├── .env.example                       # AWS_ACCESS_KEY_ID / SECRET / REGION
├── index.html                         # "Money Boss AI — Powered by Kiro"
├── vite.config.ts
├── tsconfig.json
└── src/
    ├── main.tsx
    ├── index.css                      # @import "tailwindcss"
    ├── App.tsx                        # Root component, all state
    ├── types.ts                       # All TypeScript interfaces
    ├── data/
    │   ├── initialData.ts             # Seed data (transactions, budgets, goals, shop, leaderboard)
    │   └── mentors.ts                 # 4 mentor configs (Brother/Sister/Father/Mother)
    └── components/
        ├── SplashAuth.tsx             # Login + Amazon AWS button + Kiro badge
        ├── OnboardingFlow.tsx         # 4-step wizard (Kiro AI System badge)
        ├── CurrencySelectScreen.tsx   # 11 currencies + search + emerald confirm
        ├── HomeDashboard.tsx          # Main hub (AWS Cloud Plan payment)
        ├── RecordsManager.tsx         # Transaction logger + keypad
        ├── BudgetsGoalsScreen.tsx     # Budget allocations + savings quests
        ├── AnalyticsScreen.tsx        # Donut + heatmap + line chart + Kiro badge
        ├── AiCoachScreen.tsx          # Chat UI → Amazon Bedrock
        ├── SpendingReactionPopup.tsx  # Mentor reaction overlay
        ├── RewardsScreen.tsx          # KP + shop + achievements
        ├── LeaderboardScreen.tsx      # Global rankings
        ├── ProfileScreen.tsx          # Settings + Kiro/Bedrock footer
        ├── MentorCard.tsx             # Selectable mentor card
        ├── MentorInfoModal.tsx        # Full-screen mentor dossier
        └── BottomNav.tsx              # Persistent 5-tab navigation
```

---

## Amazon Bedrock Integration

**Model:** `anthropic.claude-3-sonnet-20240229-v1:0`

**Request format:**
```json
{
  "anthropic_version": "bedrock-2023-05-31",
  "max_tokens": 256,
  "temperature": 0.8,
  "system": "<system prompt with user financial context>",
  "messages": [{ "role": "user", "content": "<user message>" }]
}
```

**Required environment variables:**
```
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1
```

**SDK package:** `@aws-sdk/client-bedrock-runtime`

**Endpoint:** `POST /api/ai-coach`

---

*Built with Kiro IDE · Powered by Amazon Bedrock*
