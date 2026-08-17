import React from 'react';
import { Mentor, ShopItem, Achievement } from '../types';
import { ArrowLeft, Award, Flame, Lock, Check, ShoppingBag, Trophy } from 'lucide-react';

interface RewardsScreenProps {
  kp: number;
  multiplier: number;
  mentor: Mentor;
  shopItems: ShopItem[];
  achievements: Achievement[];
  onPurchaseItem: (itemId: string, cost: number) => void;
  onNavigate: (screen: any) => void;
  customImage?: string;
}

export const RewardsScreen: React.FC<RewardsScreenProps> = ({
  kp, multiplier, mentor, shopItems, achievements, onPurchaseItem, onNavigate, customImage
}) => {
  return (
    <div className="min-h-full bg-black text-white pb-24 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="pt-12 px-6 flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('home')} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition active:scale-95">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="font-['Space_Grotesk'] text-xl font-extrabold text-white">Gamified Rewards HQ</h1>
            <p className="text-xs text-neutral-400">Earn KP, level up & unlock shop items</p>
          </div>
        </div>
      </div>

      {/* KP Hero Counter */}
      <div className="mx-6 p-6 rounded-3xl bg-gradient-to-br from-purple-900/50 via-fuchsia-950/40 to-black border border-purple-500/40 text-center shadow-[0_0_40px_rgba(123,46,255,0.3)] space-y-3 relative overflow-hidden">
        <div className="text-xs font-bold uppercase tracking-widest text-purple-300">Kinetic Points (KP)</div>
        <div className="font-['Space_Grotesk'] text-5xl font-black bg-gradient-to-r from-purple-300 via-fuchsia-300 to-amber-300 bg-clip-text text-transparent">
          {kp.toLocaleString()} <span className="text-xl text-purple-400 font-bold">KP</span>
        </div>
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center">
          <div className="bg-black/40 p-2.5 rounded-2xl border border-white/5">
            <div className="text-base font-extrabold font-['Space_Grotesk'] text-amber-400">{multiplier.toFixed(1)}x</div>
            <div className="text-[9px] text-neutral-400 uppercase tracking-wider font-semibold">Multiplier</div>
          </div>
          <div className="bg-black/40 p-2.5 rounded-2xl border border-white/5">
            <div className="text-base font-extrabold font-['Space_Grotesk'] text-purple-300">Level 7</div>
            <div className="text-[9px] text-neutral-400 uppercase tracking-wider font-semibold">Rank</div>
          </div>
          <div className="bg-black/40 p-2.5 rounded-2xl border border-white/5 flex flex-col items-center justify-center">
            <div className="text-base font-bold text-white">{mentor.avatarFallbackEmoji}</div>
            <div className="text-[9px] text-neutral-400 uppercase tracking-wider font-semibold truncate max-w-full">{mentor.name.split(' ')[0]}</div>
          </div>
        </div>
      </div>

      {/* Active Streaks */}
      <div className="px-6 space-y-3">
        <h3 className="font-['Space_Grotesk'] text-base font-bold text-white flex items-center gap-1.5">
          <Flame size={18} className="text-amber-400" /> Active Streaks
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/30 to-black border border-amber-500/30 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-2xl">🔥</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">Active</span>
            </div>
            <div className="font-['Space_Grotesk'] text-lg font-extrabold text-white">7 Days</div>
            <div className="text-[10px] text-neutral-400">No-Overspend Streak</div>
          </div>
          <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-950/30 to-black border border-purple-500/30 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-2xl">⚡</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">+0.2x Boost</span>
            </div>
            <div className="font-['Space_Grotesk'] text-lg font-extrabold text-white">14 Days</div>
            <div className="text-[10px] text-neutral-400">Daily Logging Streak</div>
          </div>
        </div>
      </div>

      {/* Reward Shop */}
      <div className="px-6 space-y-3 pt-2">
        <div className="flex justify-between items-center">
          <h3 className="font-['Space_Grotesk'] text-base font-bold text-white flex items-center gap-1.5">
            <ShoppingBag size={18} className="text-purple-400" /> Reward Shop
          </h3>
          <span className="text-xs text-amber-400 font-bold">⚡ Spend KP to Unlock</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {shopItems.map((item) => (
            <div key={item.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 transition space-y-2 flex flex-col justify-between">
              <div>
                <div className="w-full h-16 rounded-xl flex items-center justify-center text-3xl mb-2" style={{ background: item.gradient }}>
                  {item.icon}
                </div>
                <h4 className="font-['Space_Grotesk'] text-xs font-bold text-white leading-tight">{item.name}</h4>
                <div className="text-[10px] text-amber-400 font-semibold mt-1">⚡ {item.cost} KP</div>
              </div>
              <button
                onClick={() => !item.unlocked && onPurchaseItem(item.id, item.cost)}
                disabled={item.unlocked}
                className={`w-full py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 ${
                  item.unlocked ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 cursor-default'
                  : kp >= item.cost ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-md active:scale-95'
                  : 'bg-white/5 border border-white/10 text-neutral-500 cursor-not-allowed'
                }`}
              >
                {item.unlocked ? <><Check size={12} /> Unlocked</> : kp >= item.cost ? 'Purchase Item' : <><Lock size={12} /> Need {item.cost - kp} KP</>}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="px-6 space-y-3 pt-2">
        <h3 className="font-['Space_Grotesk'] text-base font-bold text-white flex items-center gap-1.5">
          <Trophy size={18} className="text-amber-400" /> Badges & Achievements
        </h3>
        <div className="bg-white/5 border border-white/10 rounded-2xl divide-y divide-white/5 overflow-hidden">
          {achievements.map((a) => (
            <div key={a.id} className={`p-3.5 flex items-center justify-between ${!a.earned ? 'opacity-50' : ''}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${a.earned ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-white/5 text-neutral-500'}`}>
                  {a.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    {a.name}
                    {a.earned && <Check size={12} className="text-emerald-400" />}
                  </div>
                  <div className="text-[10px] text-neutral-400">{a.desc}</div>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${a.earned ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/5 text-neutral-500'}`}>
                {a.earned ? 'Earned' : 'Locked'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
