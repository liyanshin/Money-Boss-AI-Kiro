import React, { useState } from 'react';
import { Mentor, Currency } from '../types';
import { ArrowLeft, Moon, Bell, Fingerprint, DollarSign, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface ProfileScreenProps {
  mentor: Mentor;
  kp: number;
  multiplier: number;
  streak: number;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  onNavigate: (screen: any) => void;
  customMentorImages?: Record<number, string>;
  onUpdateCustomImage?: (mentorId: number, url: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  mentor, kp, multiplier, streak, currency,
  onCurrencyChange, onNavigate, customMentorImages = {}, onUpdateCustomImage
}) => {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [biometrics, setBiometrics] = useState(false);
  const [showImageManager, setShowImageManager] = useState(false);
  const [inputUrl, setInputUrl] = useState(customMentorImages[mentor.id] || '');

  const displayImage = customMentorImages[mentor.id] || mentor.avatarImage;

  const handleSaveCustomImage = () => {
    if (onUpdateCustomImage) {
      onUpdateCustomImage(mentor.id, inputUrl.trim());
      alert('Custom character image updated successfully!');
    }
  };

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button onClick={onChange} className={`w-12 h-6 rounded-full transition p-0.5 ${value ? 'bg-purple-600' : 'bg-neutral-700'}`}>
      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-0'}`} />
    </button>
  );

  return (
    <div className="min-h-full bg-black text-white pb-24 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="pt-12 px-6 flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('home')} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition active:scale-95">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="font-['Space_Grotesk'] text-xl font-extrabold text-white">Profile & Settings</h1>
            <p className="text-xs text-neutral-400">Account, mentor controls & security</p>
          </div>
        </div>
      </div>

      {/* Hero Profile Card */}
      <div className="mx-6 p-6 rounded-3xl bg-gradient-to-br from-purple-900/40 via-indigo-950/30 to-black border border-purple-500/40 text-center space-y-4 shadow-xl relative overflow-hidden">
        <div className="relative w-24 h-24 mx-auto rounded-3xl overflow-hidden border-2 border-purple-400/50 shadow-[0_0_30px_rgba(123,46,255,0.4)] bg-neutral-900">
          {displayImage ? (
            <img src={displayImage} alt={mentor.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
          ) : null}
          <div className="absolute inset-0 flex items-center justify-center text-4xl bg-black/40 -z-10">{mentor.avatarFallbackEmoji}</div>
        </div>

        <div>
          <h2 className="font-['Space_Grotesk'] text-xl font-extrabold text-white">Money Boss User</h2>
          <p className="text-xs text-purple-300 font-semibold mt-0.5">@moneyboss_boss • Level 7</p>
          <span className="inline-block mt-2 px-3 py-1 rounded-full bg-purple-600/30 border border-purple-400/40 text-purple-200 text-xs font-bold">
            👑 Active Mentor: {mentor.name}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center">
          {[
            { value: kp.toLocaleString(), label: 'KP Points', color: 'text-purple-300' },
            { value: `${multiplier.toFixed(1)}x`, label: 'Multiplier', color: 'text-amber-400' },
            { value: `${streak} Days`, label: 'Streak', color: 'text-emerald-400' }
          ].map((stat) => (
            <div key={stat.label} className="bg-black/40 p-2.5 rounded-2xl border border-white/5">
              <div className={`text-sm font-extrabold font-['Space_Grotesk'] ${stat.color}`}>{stat.value}</div>
              <div className="text-[9px] text-neutral-400 uppercase tracking-wider font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings List */}
      <div className="px-6 space-y-3">
        <h3 className="font-['Space_Grotesk'] text-sm font-bold text-neutral-400 uppercase tracking-wider">Preferences & Controls</h3>
        <div className="bg-white/5 border border-white/10 rounded-2xl divide-y divide-white/5 overflow-hidden">

          {/* Switch Mentor */}
          <div onClick={() => onNavigate('mentor-select')} className="p-4 flex items-center justify-between hover:bg-white/5 transition cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">👑</div>
              <div>
                <div className="text-xs font-bold text-white">Switch Mentor Character</div>
                <div className="text-[10px] text-neutral-400">Change strictness level & reactions</div>
              </div>
            </div>
            <ChevronRight size={16} className="text-neutral-500" />
          </div>

          {/* Custom Image Manager */}
          <div onClick={() => setShowImageManager(!showImageManager)} className="p-4 flex items-center justify-between hover:bg-white/5 transition cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-fuchsia-500/20 text-fuchsia-300 flex items-center justify-center"><ImageIcon size={18} /></div>
              <div>
                <div className="text-xs font-bold text-white">Custom Character Images Host</div>
                <div className="text-[10px] text-neutral-400">Paste direct image links from free host</div>
              </div>
            </div>
            <ChevronRight size={16} className="text-neutral-500" />
          </div>

          {showImageManager && (
            <div className="p-4 bg-purple-950/30 border-y border-purple-500/20 space-y-2">
              <div className="text-xs font-bold text-purple-300">Paste Image Link for Active Mentor ({mentor.name}):</div>
              <input type="text" value={inputUrl} onChange={(e) => setInputUrl(e.target.value)} placeholder="https://i.ibb.co/your-image.jpg" className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500" />
              <button onClick={handleSaveCustomImage} className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition">Save Character Image</button>
            </div>
          )}

          {/* Currency */}
          <div onClick={() => onNavigate('currency-select')} className="p-4 flex items-center justify-between hover:bg-white/5 transition cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center"><DollarSign size={18} /></div>
              <div>
                <div className="text-xs font-bold text-white">Base Wallet Currency ($ / ₹ / € / £)</div>
                <div className="text-[10px] text-neutral-400">Active: <span className="text-emerald-400 font-bold">{currency}</span> • Tap to switch</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-purple-300 font-bold bg-purple-500/10 px-2.5 py-1 rounded-xl border border-purple-500/30">
              Select <ChevronRight size={14} />
            </div>
          </div>

          {/* Dark Mode */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center"><Moon size={18} /></div>
              <div>
                <div className="text-xs font-bold text-white">Dark Theme Mode</div>
                <div className="text-[10px] text-neutral-400">Solid Black + Royal Purple Theme</div>
              </div>
            </div>
            <Toggle value={darkMode} onChange={() => setDarkMode(!darkMode)} />
          </div>

          {/* Notifications */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center"><Bell size={18} /></div>
              <div>
                <div className="text-xs font-bold text-white">Push Reminders & Alerts</div>
                <div className="text-[10px] text-neutral-400">Morning check-in & threshold alerts</div>
              </div>
            </div>
            <Toggle value={notifications} onChange={() => setNotifications(!notifications)} />
          </div>

          {/* Biometrics */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center"><Fingerprint size={18} /></div>
              <div>
                <div className="text-xs font-bold text-white">Biometric Unlock Guard</div>
                <div className="text-[10px] text-neutral-400">FaceID / Fingerprint authorization</div>
              </div>
            </div>
            <Toggle value={biometrics} onChange={() => setBiometrics(!biometrics)} />
          </div>

        </div>
      </div>

      {/* Kiro + AWS Footer */}
      <div className="mx-6 p-4 rounded-2xl bg-white/3 border border-white/5 text-center">
        <p className="text-[10px] text-neutral-600">
          AI Coach powered by <span className="text-orange-400 font-bold">Amazon Bedrock</span> · Built with <span className="text-purple-400 font-bold">Kiro IDE</span>
        </p>
      </div>
    </div>
  );
};
