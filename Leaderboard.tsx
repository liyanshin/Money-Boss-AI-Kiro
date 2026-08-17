import React from 'react';
import { LeaderboardUser } from '../types';
import { ArrowLeft, Trophy, ArrowUpRight, Crown } from 'lucide-react';

interface LeaderboardScreenProps {
  users: LeaderboardUser[];
  onNavigate: (screen: any) => void;
}

export const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ users, onNavigate }) => {
  const currentUser = users.find((u) => u.isCurrentUser) || users[3];

  return (
    <div className="min-h-full bg-black text-white pb-24 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="pt-12 px-6 flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('home')} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition active:scale-95">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="font-['Space_Grotesk'] text-xl font-extrabold text-white flex items-center gap-2">
              Global Leaderboard <Crown size={18} className="text-amber-400" />
            </h1>
            <p className="text-xs text-neutral-400">Anonymized savings & discipline rankings</p>
          </div>
        </div>
      </div>

      {/* User Pinned Rank */}
      <div className="mx-6 p-5 rounded-3xl bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-black border border-purple-500/40 shadow-[0_0_30px_rgba(123,46,255,0.3)] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-600/30 border border-purple-400/40 flex items-center justify-center text-2xl font-black font-['Space_Grotesk'] text-purple-300">
            #{currentUser.rank}
          </div>
          <div>
            <div className="text-xs text-purple-300 font-bold uppercase tracking-wider">Your Pinned Position</div>
            <div className="font-['Space_Grotesk'] text-lg font-extrabold text-white flex items-center gap-1.5">
              {currentUser.name} <span className="text-xs font-normal text-emerald-400">(You)</span>
            </div>
            <div className="text-xs text-neutral-400 mt-0.5">
              🔥 {currentUser.streak}-day streak • 💰 {currentUser.savedPct}% saved
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-['Space_Grotesk'] text-2xl font-black text-amber-400">
            {currentUser.score.toLocaleString()}
          </div>
          <div className="text-[10px] text-emerald-400 font-bold flex items-center justify-end gap-0.5">
            <ArrowUpRight size={12} /> +{currentUser.rankChange} Ranks
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="px-6 space-y-3">
        <h3 className="font-['Space_Grotesk'] text-base font-bold text-white flex items-center gap-2">
          Top Savings Bosses <Trophy size={16} className="text-amber-400" />
        </h3>
        <div className="bg-white/5 border border-white/10 rounded-3xl divide-y divide-white/5 overflow-hidden">
          {users.map((u) => {
            const rankColor =
              u.rank === 1 ? 'text-amber-400 bg-amber-500/20 border-amber-500/40'
              : u.rank === 2 ? 'text-neutral-300 bg-neutral-400/20 border-neutral-400/40'
              : u.rank === 3 ? 'text-amber-600 bg-amber-700/20 border-amber-700/40'
              : 'text-neutral-500 bg-white/5 border-white/5';

            return (
              <div
                key={u.rank}
                className={`p-4 flex items-center justify-between transition ${u.isCurrentUser ? 'bg-purple-900/20 border-l-4 border-l-purple-500' : 'hover:bg-white/5'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center font-['Space_Grotesk'] font-extrabold text-sm ${rankColor}`}>
                    {u.rank === 1 ? '🥇' : u.rank === 2 ? '🥈' : u.rank === 3 ? '🥉' : u.rank}
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">{u.avatar}</div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-1.5">
                        {u.name} {u.isCurrentUser && <span className="text-[10px] text-purple-400">(You)</span>}
                      </div>
                      <div className="text-[10px] text-neutral-400">🔥 {u.streak}d streak • {u.savedPct}% saved</div>
                      {u.badge && (
                        <span className="inline-block mt-0.5 text-[9px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/25">
                          {u.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-['Space_Grotesk'] text-base font-extrabold text-purple-300">{u.score.toLocaleString()}</div>
                  <div className="text-[9px] text-neutral-500 uppercase tracking-wider font-semibold">Score</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
