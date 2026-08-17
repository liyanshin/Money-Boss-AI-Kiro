import React, { useState } from 'react';
import { Transaction, TransactionType, Category } from '../types';
import { ArrowLeft, Search, Plus } from 'lucide-react';

interface RecordsManagerProps {
  currencySymbol: string;
  transactions: Transaction[];
  onAddTransaction: (txn: Omit<Transaction, 'id'>) => void;
  onNavigate: (screen: any) => void;
}

export const RecordsManager: React.FC<RecordsManagerProps> = ({
  currencySymbol, transactions, onAddTransaction, onNavigate
}) => {
  const [activeType, setActiveType] = useState<TransactionType>('expense');
  const [amountInput, setAmountInput] = useState('0');
  const [selectedCat, setSelectedCat] = useState<Category>('Food');
  const [selectedAccount, setSelectedAccount] = useState('Cash');
  const [note, setNote] = useState('');
  const [date, setDate] = useState('2026-08-13');
  const [searchQuery, setSearchQuery] = useState('');

  const handleKeypadPress = (key: string) => {
    if (key === '⌫') {
      setAmountInput((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
    } else if (key === '.') {
      if (!amountInput.includes('.')) setAmountInput((prev) => prev + '.');
    } else {
      setAmountInput((prev) => (prev === '0' ? key : prev + key));
    }
  };

  const handleAdd = () => {
    const numericAmt = parseFloat(amountInput) || 0;
    if (numericAmt <= 0) { alert('Please enter a valid amount greater than 0'); return; }
    onAddTransaction({
      type: activeType,
      cat: activeType === 'income' ? 'Income' : selectedCat,
      name: note.trim() || selectedCat,
      amount: numericAmt,
      account: selectedAccount,
      date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    setAmountInput('0');
    setNote('');
  };

  const filteredTransactions = transactions.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.cat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabStyle = (type: TransactionType, activeGradient: string) =>
    `flex-1 py-2.5 text-xs font-bold rounded-xl transition ${
      activeType === type ? `${activeGradient} text-white shadow-lg` : 'text-neutral-400 hover:text-white'
    }`;

  return (
    <div className="min-h-full bg-black text-white pb-24 space-y-5 animate-fadeIn">
      {/* Header */}
      <div className="pt-12 px-6 flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('home')} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition active:scale-95">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="font-['Space_Grotesk'] text-xl font-extrabold text-white">Full Records Manager</h1>
            <p className="text-xs text-neutral-400">Log, search, & filter all transactions</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mx-6 p-1 bg-white/5 border border-white/10 rounded-2xl flex">
        <button onClick={() => { setActiveType('expense'); setSelectedCat('Food'); }} className={tabStyle('expense', 'bg-gradient-to-r from-[#7B2EFF] to-[#5A1FCC]')}>Expense</button>
        <button onClick={() => { setActiveType('income'); setSelectedCat('Income'); }} className={tabStyle('income', 'bg-gradient-to-r from-emerald-600 to-teal-600')}>Income</button>
        <button onClick={() => { setActiveType('transfer'); setSelectedCat('Other'); }} className={tabStyle('transfer', 'bg-gradient-to-r from-blue-600 to-indigo-600')}>Transfer</button>
      </div>

      {/* Amount Display */}
      <div className="mx-6 p-5 rounded-3xl bg-white/5 border border-purple-500/30 text-center space-y-1">
        <div className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">{activeType.toUpperCase()} AMOUNT</div>
        <div className="font-['Space_Grotesk'] text-4xl font-extrabold text-white">
          <span className="text-purple-400 mr-1">{currencySymbol}</span>
          {parseFloat(amountInput).toLocaleString() || '0'}
        </div>
      </div>

      {/* Form */}
      <div className="mx-6 space-y-3">
        {activeType !== 'income' && (
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Select Category</label>
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {(['Food', 'Wants', 'Transport', 'Health', 'Other'] as Category[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
                    selectedCat === cat ? 'bg-purple-600/30 border-purple-500 text-purple-300' : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
                  }`}
                >
                  {cat === 'Food' ? '🍜 Food' : cat === 'Wants' ? '🎮 Wants' : cat === 'Transport' ? '🚌 Transport' : cat === 'Health' ? '💊 Health' : '📦 Other'}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Account Source</label>
            <select value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)} className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-purple-500">
              <option value="Cash" className="bg-neutral-900">💵 Cash Wallet</option>
              <option value="Bank Account" className="bg-neutral-900">🏦 Primary Bank</option>
              <option value="Card" className="bg-neutral-900">💳 Credit Card</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Transaction Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-purple-500" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Note / Merchant Description</label>
          <input type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Swiggy Lunch, Uber Ride..." className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500" />
        </div>
      </div>

      {/* Keypad */}
      <div className="mx-6">
        <div className="grid grid-cols-3 gap-2">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'].map((k) => (
            <button key={k} type="button" onClick={() => handleKeypadPress(k)} className="h-12 rounded-xl bg-white/5 border border-white/10 hover:bg-purple-600/20 text-white font-['Space_Grotesk'] font-bold text-lg transition active:scale-95">
              {k}
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="px-6">
        <button onClick={handleAdd} className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#7B2EFF] to-[#5A1FCC] hover:from-purple-600 hover:to-indigo-700 text-white font-extrabold text-sm shadow-[0_4px_25px_rgba(123,46,255,0.4)] transition active:scale-95 flex items-center justify-center gap-2">
          <Plus size={18} /> Record {activeType.toUpperCase()}
        </button>
      </div>

      {/* Records History */}
      <div className="px-6 space-y-3 pt-4 border-t border-white/10">
        <div className="flex justify-between items-center">
          <h3 className="font-['Space_Grotesk'] text-base font-bold text-white">All Recorded Transactions</h3>
          <span className="text-xs text-neutral-400">{filteredTransactions.length} records</span>
        </div>

        <div className="relative">
          <Search size={14} className="absolute left-3.5 top-3 text-neutral-400" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search transactions by name or category..." className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-purple-500" />
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl divide-y divide-white/5 overflow-hidden">
          {filteredTransactions.map((t) => (
            <div key={t.id} className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm ${t.type === 'income' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-purple-500/20 text-purple-300'}`}>
                  {t.cat === 'Food' ? '🍜' : t.cat === 'Wants' ? '🎮' : t.cat === 'Transport' ? '🚌' : t.cat === 'Income' ? '💼' : '📦'}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{t.name}</div>
                  <div className="text-[10px] text-neutral-400">{t.cat} • {t.account} • {t.date}</div>
                </div>
              </div>
              <div className={`font-['Space_Grotesk'] text-xs font-extrabold ${t.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {t.type === 'income' ? '+' : '-'}{currencySymbol}{t.amount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
