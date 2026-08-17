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
