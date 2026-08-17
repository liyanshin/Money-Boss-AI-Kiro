import React, { useState } from 'react';
import { Currency } from '../types';
import { ArrowLeft, Check, Search, Globe } from 'lucide-react';

export interface CurrencyOption {
  code: Currency;
  name: string;
  symbol: string;
  flag: string;
  region: string;
  sampleAmount: string;
}

export const CURRENCY_LIST: CurrencyOption[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', region: 'United States', sampleAmount: '$12,500' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳', region: 'India', sampleAmount: '₹12,500' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', region: 'European Union', sampleAmount: '€12,500' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧', region: 'United Kingdom', sampleAmount: '£12,500' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵', region: 'Japan', sampleAmount: '¥1,250,000' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬', region: 'Singapore', sampleAmount: 'S$12,500' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾', region: 'Malaysia', sampleAmount: 'RM12,500' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭', region: 'Thailand', sampleAmount: '฿12,500' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', flag: '🇵🇭', region: 'Philippines', sampleAmount: '₱12,500' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', flag: '🇮🇩', region: 'Indonesia', sampleAmount: 'Rp125,000' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'AED', flag: '🇦🇪', region: 'United Arab Emirates', sampleAmount: 'AED 12,500' }
];

interface CurrencySelectScreenProps {
  currentCurrency: Currency;
  onSelectCurrency: (currency: Currency) => void;
  onNavigateBack: () => void;
}

export const CurrencySelectScreen: React.FC<CurrencySelectScreenProps> = ({
  currentCurrency,
  onSelectCurrency,
  onNavigateBack
}) => {
  const [selected, setSelected] = useState<Currency>(currentCurrency);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCurrencies = CURRENCY_LIST.filter(
    (c) =>
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConfirm = () => {
    onSelectCurrency(selected);
    onNavigateBack();
  };

  const activeOption = CURRENCY_LIST.find((c) => c.code === selected) || CURRENCY_LIST[0];

  return (
    <div className="min-h-full bg-black text-white p-6 pb-28 space-y-6 animate-fadeIn">
      {/* Top Nav */}
      <div className="pt-8 flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={onNavigateBack} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition active:scale-95">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="font-['Space_Grotesk'] text-xl font-extrabold text-white flex items-center gap-2">
              Currency Selection <Globe size={18} className="text-purple-400" />
            </h1>
            <p className="text-xs text-neutral-400">Select base currency ($ Dollar, ₹ Rupee, € Euro, £ Pound, etc.)</p>
          </div>
        </div>
      </div>

      {/* Selected Currency Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-purple-900/40 via-indigo-950/40 to-black border border-purple-500/40 shadow-xl space-y-3 relative overflow-hidden">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">Active Currency Preference</span>
          <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold">{activeOption.code}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-4xl">{activeOption.flag}</div>
          <div>
            <div className="font-['Space_Grotesk'] text-2xl font-extrabold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-extrabold">{activeOption.symbol}</span>
              {activeOption.name}
            </div>
            <div className="text-xs text-neutral-400">{activeOption.region} • Sample: {activeOption.sampleAmount}</div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-3.5 text-neutral-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Dollar, Rupee, Euro, Pound, Yen..."
          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-purple-500"
        />
      </div>

      {/* Currency Grid */}
      <div className="grid grid-cols-1 gap-3">
        {filteredCurrencies.map((item) => {
          const isSelected = selected === item.code;
          return (
            <div
              key={item.code}
              onClick={() => setSelected(item.code)}
              className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                isSelected
                  ? 'bg-purple-900/30 border-purple-500/80 shadow-[0_0_20px_rgba(123,46,255,0.3)]'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className="text-3xl w-10 text-center">{item.flag}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-['Space_Grotesk'] font-extrabold text-white text-sm">{item.name}</span>
                    <span className="px-2 py-0.5 rounded-md bg-white/10 text-purple-300 font-mono font-bold text-[10px]">{item.code}</span>
                  </div>
                  <div className="text-xs text-neutral-400 mt-0.5 flex items-center gap-2">
                    <span>Symbol: <strong className="text-emerald-400">{item.symbol}</strong></span>
                    <span>•</span>
                    <span>Format: {item.sampleAmount}</span>
                  </div>
                </div>
              </div>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center transition ${isSelected ? 'bg-emerald-500 text-black font-extrabold shadow-md' : 'border border-white/20'}`}>
                {isSelected && <Check size={14} />}
              </div>
            </div>
          );
        })}

        {filteredCurrencies.length === 0 && (
          <div className="text-center py-8 text-neutral-400 text-xs">
            No currencies match "{searchQuery}". Try searching "Dollar" or "Rupee".
          </div>
        )}
      </div>

      {/* Fixed Bottom Confirm */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/90 backdrop-blur-md border-t border-white/10 max-w-[390px] mx-auto z-20">
        <button
          onClick={handleConfirm}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-[0_0_25px_rgba(16,185,129,0.5)] transition active:scale-95 flex items-center justify-center gap-2"
        >
          <Check size={18} /> Apply {activeOption.name} ({activeOption.symbol}) Base Currency
        </button>
      </div>
    </div>
  );
};
