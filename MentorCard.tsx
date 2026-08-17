import React from 'react';
import { Mentor } from '../types';
import { Info, Check, ShieldAlert } from 'lucide-react';

interface MentorCardProps {
  mentor: Mentor;
  isSelected: boolean;
  onSelect: (mentorId: number) => void;
  onOpenInfo: (mentorId: number) => void;
  customImage?: string;
}

export const MentorCard: React.FC<MentorCardProps> = ({
  mentor, isSelected, onSelect, onOpenInfo, customImage
}) => {
  const displayImage = customImage || mentor.avatarImage;

  return (
    <div
      className={`relative rounded-3xl overflow-hidden border transition-all duration-300 ${
        mentor.themeClass === 'm1' ? 'bg-gradient-to-br from-[#0d0d1a] via-[#12062a] to-[#080820] border-purple-500/30'
        : mentor.themeClass === 'm2' ? 'bg-gradient-to-br from-[#160820] via-[#2d0a3a] to-[#100510] border-fuchsia-500/30'
        : mentor.themeClass === 'm3' ? 'bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#080808] border-purple-600/30'
        : 'bg-gradient-to-br from-[#0a0000] via-[#1a0010] to-[#08000a] border-red-500/30'
      } ${isSelected ? 'ring-2 ring-purple-500 shadow-[0_0_35px_rgba(123,46,255,0.45)] scale-[1.01]' : 'hover:border-purple-500/50'}`}
    >
      {/* Header Row */}
      <div className="p-6 pb-4 flex gap-4 items-start">
        <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 shadow-lg bg-neutral-900">
          {displayImage ? (
            <img src={displayImage} alt={mentor.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
          ) : null}
          <div className="absolute inset-0 flex items-center justify-center text-4xl bg-black/40 -z-10">{mentor.avatarFallbackEmoji}</div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-[11px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full border"
              style={{ color: mentor.color, borderColor: `${mentor.color}40`, backgroundColor: `${mentor.color}15` }}
            >
              {mentor.diff} ({mentor.diffStars})
            </span>
          </div>
          <h3 className="font-['Space_Grotesk'] text-xl font-extrabold text-white truncate">{mentor.name}</h3>
          <p className="text-xs text-neutral-400 mb-2 truncate">{mentor.personality}</p>
          <div className="pl-2.5 py-1 text-xs italic text-neutral-300 border-l-2 leading-relaxed" style={{ borderColor: mentor.color }}>
            "{mentor.quote}"
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="px-6 py-2">
        <div className="grid grid-cols-3 gap-2 bg-black/40 border border-white/5 rounded-2xl p-2.5 text-center">
          <div>
            <div className="text-sm font-extrabold font-['Space_Grotesk'] text-emerald-400">+{mentor.rewardKP} KP</div>
            <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Reward</div>
          </div>
          <div>
            <div className={`text-sm font-extrabold font-['Space_Grotesk'] ${mentor.penaltyKP > 0 || mentor.penaltyMult > 0 ? 'text-rose-400' : 'text-neutral-400'}`}>
              {mentor.id === 4 ? 'Reset 1x' : mentor.penaltyKP > 0 ? `-${mentor.penaltyKP} KP` : mentor.penaltyMult > 0 ? `-${mentor.penaltyMult}x` : 'None'}
            </div>
            <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Penalty</div>
          </div>
          <div>
            <div className="text-sm font-extrabold font-['Space_Grotesk'] text-amber-400">{mentor.maxMult}x</div>
            <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Max Mult</div>
          </div>
        </div>
      </div>

      {/* Rules Box */}
      <div className="px-6 py-3">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-xs text-neutral-300 space-y-1.5 leading-relaxed">
          <div className="font-bold text-white text-[11px] uppercase tracking-wider flex items-center gap-1">
            <ShieldAlert size={12} className="text-purple-400" /> Spending Rules:
          </div>
          {mentor.rules.map((rule, idx) => (
            <div key={idx} className="flex gap-2 items-start text-neutral-300">
              <span className="text-purple-400 font-bold">•</span>
              <span>{rule}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="p-6 pt-2 grid grid-cols-2 gap-3">
        <button
          onClick={() => onOpenInfo(mentor.id)}
          className="py-3 px-3 rounded-xl bg-white/5 border border-white/15 hover:bg-white/10 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition active:scale-95"
        >
          <Info size={14} className="text-purple-400" /> Behavior Info
        </button>
        <button
          onClick={() => onSelect(mentor.id)}
          className={`py-3 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 text-white shadow-lg ${
            isSelected
              ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/50'
              : 'bg-gradient-to-r from-[#7B2EFF] to-[#5A1FCC] hover:from-purple-600 hover:to-indigo-700 shadow-purple-900/50'
          }`}
        >
          {isSelected ? <><Check size={14} /> Active Mentor</> : 'Select Mentor'}
        </button>
      </div>
    </div>
  );
};
