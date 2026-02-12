
import React, { useState } from 'react';
import { useHistory } from '../contexts/HistoryContext';

const HistoryPage: React.FC = () => {
  const { history, clearHistory } = useHistory();
  const [searchQuery, setSearchQuery] = useState('');

  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(timestamp));
  };

  const filteredHistory = history.filter(item => 
    item.input.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.output.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Translation History</h1>
          <p className="text-slate-500">Review your past sign language interactions</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-10 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all w-full md:w-64 shadow-sm"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          </div>
          {history.length > 0 && (
            <button 
              onClick={clearHistory}
              className="text-sm font-semibold text-red-600 hover:text-red-700 transition-colors whitespace-nowrap"
            >
              Clear All
            </button>
          )}
        </div>
      </header>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {filteredHistory.length === 0 ? (
          <div className="p-20 text-center">
            <div className="text-5xl mb-4 opacity-40">🕰️</div>
            <h3 className="text-xl font-bold text-slate-800">
              {history.length === 0 ? "No history yet" : "No matches found"}
            </h3>
            <p className="text-slate-400 mt-2">
              {history.length === 0 
                ? "Your translations will appear here once you start using the tools." 
                : "Try searching for a different keyword."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredHistory.map((item) => (
              <div key={item.id} className="p-6 hover:bg-slate-50 transition-colors flex items-start gap-6 group">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  item.type === 'sign-to-text' ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  <span className="text-xl">{item.type === 'sign-to-text' ? '🖐️' : '✍️'}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      {item.type.replace(/-/g, ' ')}
                    </span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                    <span className="text-[10px] text-slate-400">{formatDate(item.timestamp)}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Input</p>
                      <p className="text-slate-700 font-medium truncate">{item.input}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Output</p>
                      <p className="text-indigo-600 font-semibold">{item.output}</p>
                    </div>
                  </div>
                </div>

                <div className="opacity-0 group-hover:opacity-100 flex items-center gap-2 transition-all">
                   <button className="p-2 text-slate-300 hover:text-indigo-600 transition-all" title="Share">🔗</button>
                   <button className="p-2 text-slate-300 hover:text-indigo-600 transition-all" title="View Details">↗️</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
