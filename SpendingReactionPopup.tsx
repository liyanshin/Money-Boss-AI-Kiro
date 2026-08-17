import React from 'react';
import { Mentor } from '../types';
import { X } from 'lucide-react';

interface ReactionData {
  category: string;
  itemName: string;
  amount: number;
  catRemaining: number;
  daysLeft: number;
  status: 'good' | 'warn' | 'over';
  kpChange: number;
  multiplierChange: number;
  line: string;
}

interface SpendingReactionPopupProps {
  reaction: ReactionData | null;
  mentor: Mentor;
  isOpen: boolean;
  onClose: () => void;
  customImage?: string;
}

export const SpendingReactionPopup: React.FC<SpendingReactionPopupProps> = ({
  reaction, mentor, isOpen, onClose, customImage
}) => {
  if (!isOpen || !reaction) return null;

  const displayImage = customImage || mentor.avatarImage;

  const statusColor =
    reaction.status === 'good' ? 'border-emerald-500/50 bg-emerald-950/90 shadow-[0_0_50px_rgba(16,185,129,0.3)]'
    : reaction.status === 'warn' ? 'border-amber-500/50 bg-amber-950/90 shadow-[0_0_50px_rgba(245,158,11,0.3)]'
    : 'border-rose-600/60 bg-rose-950/90 shadow-[0_0_50px_rgba(220,38,38,0.4)]';

  const emoji =
    reaction.status === 'good' ? '🥳'
    : reaction.status === 'warn' ? '🤨'
    : mentor.id === 4 ? '💥' : '😤';

  const statusLabel =
    reaction.status === 'good' ? 'Transaction Approved'
    : reaction.status === 'warn' ? 'Category Warning Triggered'
    : 'Budget Breach Detected!';

  const statusBadgeClass =
    reaction.status === 'good' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    : reaction.status === 'warn' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    : 'bg-rose-500/20 text-rose-300 border-rose-500/30';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className={`w-full max-w-sm rounded-3xl p-6 text-center border relative overflow-hidden backdrop-blur-xl space-y-5 ${statusColor}`}>

        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition">
          <X size={16} />
        </button>

        {/* Avatar */}
        <div className="relative w-28 h-28 mx-auto rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl bg-neutral-900">
          {displayImage ? (
            <img src={displayImage} alt={mentor.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
          ) : null}
          <div className="absolute inset-0 flex items-center justify-center text-5xl bg-black/40 -z-10">{mentor.avatarFallbackEmoji}</div>
          <div className="absolute bottom-1 right-1 bg-black/80 rounded-full p-1 text-2xl border border-white/20">{emoji}</div>
        </div>

        {/* Header */}
        <div>
          <span className={`text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border ${statusBadgeClass}`}>
            {statusLabel}
          </span>
          <h3 className="font-['Space_Grotesk'] text-xl font-extrabold text-white mt-2">{mentor.name} Reacts</h3>
        </div>

        {/* Quote */}
        <div className="p-4 rounded-2xl bg-black/50 border border-white/10 italic text-sm text-neutral-200 leading-relaxed font-medium">
          "{reaction.line}"
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2.5 text-left">
          <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
            <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">{reaction.category} Left</div>
            <div className="font-['Space_Grotesk'] text-lg font-bold text-white">₹{reaction.catRemaining.toLocaleString()}</div>
          </div>
          <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
            <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Days Remaining</div>
            <div className="font-['Space_Grotesk'] text-lg font-bold text-white">{reaction.daysLeft} Days</div>
          </div>
          <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
            <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">KP Impact</div>
            <div className={`font-['Space_Grotesk'] text-lg font-bold ${reaction.kpChange >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {reaction.kpChange >= 0 ? `+${reaction.kpChange}` : reaction.kpChange} KP
            </div>
          </div>
          <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
            <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Current Multiplier</div>
            <div className="font-['Space_Grotesk'] text-lg font-bold text-amber-400">{reaction.multiplierChange.toFixed(1)}x</div>
          </div>
        </div>

        {/* Dismiss */}
        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#7B2EFF] to-[#5A1FCC] hover:from-purple-600 hover:to-indigo-700 text-white font-extrabold text-sm shadow-[0_4px_20px_rgba(123,46,255,0.4)] transition active:scale-95"
        >
          Acknowledge & Continue
        </button>
      </div>
    </div>
  );
};
