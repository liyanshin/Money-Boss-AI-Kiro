import React, { useState } from 'react';
import { Mentor } from '../types';
import { ArrowLeft, Check, Image as ImageIcon, Shield, Award, AlertTriangle, Sparkles } from 'lucide-react';

interface MentorInfoModalProps {
  mentor: Mentor | null;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (mentorId: number) => void;
  customImage?: string;
  onUpdateCustomImage?: (mentorId: number, url: string) => void;
}

export const MentorInfoModal: React.FC<MentorInfoModalProps> = ({
  mentor, isOpen, onClose, onSelect, customImage, onUpdateCustomImage
}) => {
  if (!isOpen || !mentor) return null;

  const [imageUrlInput, setImageUrlInput] = useState(customImage || '');
  const [showImageInput, setShowImageInput] = useState(false);
  const displayImage = customImage || mentor.avatarImage;

  const handleSaveImage = () => {
    if (onUpdateCustomImage) {
      onUpdateCustomImage(mentor.id, imageUrlInput.trim());
      setShowImageInput(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-xl animate-fadeIn flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 px-5 py-4 bg-black/90 backdrop-blur-md border-b border-purple-500/20 flex items-center justify-between">
        <button onClick={onClose} className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/15 flex items-center justify-center text-white transition active:scale-95">
          <ArrowLeft size={18} />
        </button>
        <span className="font-['Space_Grotesk'] text-base font-bold text-white">Mentor Dossier: {mentor.name}</span>
        <button
          onClick={() => { onSelect(mentor.id); onClose(); }}
          className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg transition active:scale-95"
        >
          Select
        </button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6 max-w-lg mx-auto w-full pb-16">
        {/* Hero */}
        <div className="text-center space-y-4">
          <div className="relative w-32 h-32 mx-auto rounded-3xl overflow-hidden border-2 border-purple-500/40 shadow-[0_0_40px_rgba(123,46,255,0.4)] bg-neutral-900 group">
            {displayImage ? (
              <img src={displayImage} alt={mentor.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
            ) : null}
            <div className="absolute inset-0 flex items-center justify-center text-6xl bg-black/40 -z-10">{mentor.avatarFallbackEmoji}</div>
            <button
              onClick={() => setShowImageInput(!showImageInput)}
              className="absolute bottom-2 right-2 p-2 rounded-xl bg-purple-600/90 text-white hover:bg-purple-500 transition text-xs shadow-lg"
              title="Paste custom avatar URL"
            >
              <ImageIcon size={14} />
            </button>
          </div>

          {showImageInput && (
            <div className="p-4 rounded-2xl bg-white/5 border border-purple-500/30 text-left space-y-2">
              <label className="text-xs font-semibold text-purple-300">Custom Image Link (Direct URL):</label>
              <input
                type="text"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500"
              />
              <div className="flex gap-2 justify-end pt-1">
                <button onClick={() => setShowImageInput(false)} className="px-3 py-1 rounded-lg bg-neutral-800 text-neutral-400 text-xs hover:text-white">Cancel</button>
                <button onClick={handleSaveImage} className="px-3 py-1 rounded-lg bg-purple-600 text-white text-xs font-bold hover:bg-purple-500">Save Image URL</button>
              </div>
            </div>
          )}

          <div>
            <h2 className="font-['Space_Grotesk'] text-2xl font-extrabold text-white">{mentor.name}</h2>
            <p className="text-xs font-semibold uppercase tracking-widest mt-1" style={{ color: mentor.color }}>
              Difficulty: {mentor.diff} ({mentor.diffStars})
            </p>
          </div>
        </div>

        {/* Overview */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
            <Shield size={14} /> Behavioral Personality
          </h3>
          <p className="text-sm text-neutral-300 leading-relaxed">{mentor.behaviorDetails.overview}</p>
        </div>

        {/* Spending Rules */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <AlertTriangle size={14} /> Spending Block & Warning Protocol
          </h3>
          <div className="space-y-2 text-xs text-neutral-300">
            {mentor.behaviorDetails.spendingRules.map((rule, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rewards & Penalties */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-1.5">
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1 uppercase tracking-wider"><Award size={14} /> Rewards</div>
            <p className="text-xs text-neutral-300 leading-relaxed">{mentor.behaviorDetails.rewardsExplanation}</p>
          </div>
          <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-1.5">
            <div className="text-xs font-bold text-rose-400 flex items-center gap-1 uppercase tracking-wider"><AlertTriangle size={14} /> Penalties</div>
            <p className="text-xs text-neutral-300 leading-relaxed">{mentor.behaviorDetails.penaltiesExplanation}</p>
          </div>
        </div>

        {/* Quotes Preview */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
            <Sparkles size={14} /> Voice & Reactions Preview
          </h3>
          <div className="space-y-2 text-xs italic">
            <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-200">
              <span className="font-bold not-italic text-[10px] uppercase block text-emerald-400">Under Budget:</span>
              {mentor.lines.good}
            </div>
            <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 text-amber-200">
              <span className="font-bold not-italic text-[10px] uppercase block text-amber-400">Near Category Limit:</span>
              {mentor.lines.warn}
            </div>
            <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/20 text-rose-200">
              <span className="font-bold not-italic text-[10px] uppercase block text-rose-400">Overspend Breach:</span>
              {mentor.lines.over}
            </div>
          </div>
        </div>

        {/* Final Select */}
        <button
          onClick={() => { onSelect(mentor.id); onClose(); }}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#7B2EFF] to-[#5A1FCC] hover:from-purple-600 hover:to-indigo-700 text-white font-extrabold text-sm shadow-[0_4px_25px_rgba(123,46,255,0.5)] transition active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <Check size={18} /> Choose {mentor.name} as Mentor
        </button>
      </div>
    </div>
  );
};
