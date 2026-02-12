
import React from 'react';
import { useHistory } from '../../contexts/HistoryContext';
// FIX: Clean import of Link from react-router-dom
import { Link } from 'react-router-dom';

const RecentActivity: React.FC = () => {
  const { history } = useHistory();
  const recent = history.slice(0, 4);

  if (recent.length === 0) {
    return (
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-2xl mb-4">✨</div>
        <h3 className="font-bold text-slate-800">No activity yet</h3>
        <p className="text-slate-400 text-sm mt-1">Your translations will appear here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex items-center justify-between">
        <h3 className="font-bold text-slate-800">Recent Activity</h3>
        <Link to="/history" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">View All</Link>
      </div>
      <div className="divide-y divide-slate-50">
        {recent.map((item) => (
          <div key={item.id} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              item.type === 'sign-to-text' ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'
            }`}>
              <span className="text-lg">{item.type === 'sign-to-text' ? '🖐️' : '✍️'}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">{item.output}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-tighter">
                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <span className="text-slate-300 text-xs font-medium">→</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
