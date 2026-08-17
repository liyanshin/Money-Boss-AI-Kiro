import React from 'react';
import { Home, PieChart, Star, Bot, Trophy } from 'lucide-react';
import { ScreenId } from '../types';

interface BottomNavProps {
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, onNavigate }) => {
  const tabs = [
    { id: 'home' as ScreenId, label: 'Home', icon: Home },
    { id: 'budgets' as ScreenId, label: 'Budgets', icon: PieChart },
    { id: 'rewards' as ScreenId, label: 'Rewards', icon: Star },
    { id: 'ai-coach' as ScreenId, label: 'AI Coach', icon: Bot },
    { id: 'leaderboard' as ScreenId, label: 'Ranks', icon: Trophy }
  ];

  if (['splash', 'auth', 'ob1', 'ob2', 'ob3'].includes(activeScreen)) {
    return null;
  }

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
