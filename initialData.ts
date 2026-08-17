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
  {
    id: 's1',
    name: 'Dark Phoenix Cyber Theme',
    cost: 800,
    unlocked: false,
    type: 'theme',
    icon: '🔥',
    gradient: 'linear-gradient(135deg, rgba(220,38,38,0.3), rgba(123,46,255,0.3))'
  },
  {
    id: 's2',
    name: 'Mom Skin: Proud Smile',
    cost: 500,
    unlocked: false,
    type: 'skin',
    icon: '🌸',
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.3), rgba(123,46,255,0.3))'
  },
  {
    id: 's3',
    name: 'Confetti Celebration FX',
    cost: 300,
    unlocked: true,
    type: 'animation',
    icon: '🎉',
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.3), rgba(123,46,255,0.3))'
  },
  {
    id: 's4',
    name: 'Gold Boss Avatar Frame',
    cost: 1200,
    unlocked: false,
    type: 'frame',
    icon: '👑',
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.4), rgba(0,0,0,0.6))'
  },
  {
    id: 's5',
    name: 'Royal Purple Neon Trail',
    cost: 650,
    unlocked: false,
    type: 'animation',
    icon: '⚡',
    gradient: 'linear-gradient(135deg, rgba(123,46,255,0.5), rgba(192,38,211,0.5))'
  }
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
