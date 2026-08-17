import React, { useState, useRef, useEffect } from 'react';
import { Mentor, ChatMessage } from '../types';
import { ArrowLeft, Send, Mic, Volume2, VolumeX, RefreshCw } from 'lucide-react';

interface AiCoachScreenProps {
  mentor: Mentor;
  currencySymbol: string;
  balance: number;
  pmLeft: number;
  pmTotal: number;
  goalTitle: string;
  goalProgress: number;
  kp: number;
  multiplier: number;
  streak: number;
  onNavigate: (screen: any) => void;
  customImage?: string;
}

export const AiCoachScreen: React.FC<AiCoachScreenProps> = ({
  mentor,
  currencySymbol,
  balance,
  pmLeft,
  pmTotal,
  goalTitle,
  goalProgress,
  kp,
  multiplier,
  streak,
  onNavigate,
  customImage
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: `Hello! I'm your AI Money Coach, powered by Amazon Bedrock via Kiro. I have live access to your ${currencySymbol}${balance.toLocaleString()} balance, your ${currencySymbol}${pmLeft.toLocaleString()} pocket budget, and your savings goals. What financial question can I help you analyze?`,
      timestamp: 'Just now'
    }
  ]);

  const [input, setInput] = useState('');
  const [isToneMentor, setIsToneMentor] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [enableVoiceOutput, setEnableVoiceOutput] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const displayImage = customImage || mentor.avatarImage;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSpeak = (text: string) => {
    if (!enableVoiceOutput || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = isToneMentor && mentor.id === 2 ? 1.2 : mentor.id === 3 ? 0.8 : 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'u_' + Date.now(),
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!overrideText) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend.trim(),
          mentor: {
            name: mentor.name,
            personality: mentor.personality,
            quote: mentor.quote
          },
          tone: isToneMentor ? 'mentor' : 'neutral',
          userData: {
            currency: currencySymbol,
            balance,
            pmLeft,
            pmTotal,
            goalTitle,
            goalProgress,
            kp,
            multiplier,
            streak
          }
        })
      });

      const data = await response.json();
      const botReplyText = data.reply || "Let's review your category budget together!";

      const botMsg: ChatMessage = {
        id: 'b_' + Date.now(),
        sender: 'bot',
        text: botReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
      handleSpeak(botReplyText);
    } catch (err) {
      console.error('AI Coach Error (Amazon Bedrock):', err);
      const fallbackMsg: ChatMessage = {
        id: 'b_' + Date.now(),
        sender: 'bot',
        text: `Based on your live balance of ${currencySymbol}${balance.toLocaleString()} and remaining pocket budget of ${currencySymbol}${pmLeft.toLocaleString()}, stay disciplined! ${mentor.quote}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMic = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser tab.');
      return;
    }
    if (isListening) { setIsListening(false); return; }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      handleSend(transcript);
    };
    recognition.start();
  };

  const suggestions = [
    'How much can I spend today?',
    'Why is my pocket money low?',
    'Review my spending this week',
    'Help me hit my savings goal',
    'Explain this category overspend'
  ];

  return (
    <div className="min-h-full bg-black text-white flex flex-col justify-between pb-20 animate-fadeIn">
      {/* Top Bar */}
      <div className="pt-12 px-6 pb-4 bg-black/90 border-b border-purple-500/20 backdrop-blur-md flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-purple-400/40 bg-neutral-900">
              {displayImage ? (
                <img
                  src={displayImage}
                  alt={mentor.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
              ) : null}
              <div className="absolute inset-0 flex items-center justify-center text-xl -z-10">
                {mentor.avatarFallbackEmoji}
              </div>
            </div>

            <div>
              <h2 className="font-['Space_Grotesk'] text-base font-bold text-white flex items-center gap-1.5">
                AI Money Coach
              </h2>
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live · Amazon Bedrock
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEnableVoiceOutput(!enableVoiceOutput)}
            className={`p-2 rounded-xl border transition ${
              enableVoiceOutput
                ? 'bg-purple-600/30 border-purple-500 text-purple-300'
                : 'bg-white/5 border-white/10 text-neutral-500'
            }`}
            title="Toggle Voice Output"
          >
            {enableVoiceOutput ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <button
            onClick={() => setIsToneMentor(!isToneMentor)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition ${
              isToneMentor
                ? 'bg-purple-600 border-purple-500 text-white'
                : 'bg-white/5 border-white/10 text-neutral-400'
            }`}
          >
            {isToneMentor ? '🎭 Mentor Voice' : '👔 Neutral'}
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-6 space-y-4 overflow-y-auto no-scrollbar">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} space-y-1`}
          >
            <div
              className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-gradient-to-r from-[#7B2EFF] to-[#5A1FCC] text-white rounded-tr-xs shadow-md'
                  : 'bg-white/10 border border-purple-500/30 text-neutral-100 rounded-tl-xs shadow-lg'
              }`}
            >
              {m.text}
            </div>
            <span className="text-[10px] text-neutral-500 px-2">{m.timestamp}</span>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-purple-400 text-xs italic font-medium p-2">
            <RefreshCw size={14} className="animate-spin" /> {mentor.name} is consulting Amazon Bedrock...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      <div className="px-6 py-2 overflow-x-auto flex gap-2 no-scrollbar">
        {suggestions.map((s, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(s)}
            className="px-3.5 py-2 rounded-xl bg-purple-950/40 border border-purple-500/30 hover:border-purple-400 text-purple-300 text-xs font-medium whitespace-nowrap transition"
          >
            💡 {s}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-4 mx-6 mb-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center gap-2 shadow-2xl">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask your AI coach about your budget..."
          className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none"
        />

        <button
          onClick={toggleMic}
          className={`p-2.5 rounded-xl border transition ${
            isListening
              ? 'bg-rose-600 border-rose-500 text-white animate-pulse'
              : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
          }`}
          title="Voice Input"
        >
          <Mic size={18} />
        </button>

        <button
          onClick={() => handleSend()}
          disabled={isLoading || !input.trim()}
          className="p-2.5 rounded-xl bg-gradient-to-r from-[#7B2EFF] to-[#5A1FCC] hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg transition active:scale-95 disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};
