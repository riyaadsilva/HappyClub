
import React from 'react';
// FIX: Split imports between react-router-dom and react-router to resolve missing export errors
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', path: '/', icon: '📊' },
  { name: 'Sign → Text', path: '/sign-to-text', icon: '🖐️' },
  { name: 'Text → Sign', path: '/text-to-sign', icon: '✍️' },
  { name: 'Dictionary', path: '/dictionary', icon: '📚' },
  { name: 'History', path: '/history', icon: '🕒' },
  { name: 'Settings', path: '/settings', icon: '⚙️' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen sticky top-0 flex flex-col shadow-sm">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
          <span>😊</span> Happy Club
        </h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">Sign Language AI</p>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                  ? 'bg-indigo-50 text-indigo-700 font-medium'
                  : 'text-slate-600 hover:bg-slate-50'
                }`}
            >
              <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-slate-100">
        <div className="bg-indigo-600 rounded-2xl p-4 text-white">
          <p className="text-sm font-medium opacity-90">Pro Plan</p>
          <p className="text-xs opacity-75 mt-1">Unlimited AI translations</p>
          <button className="mt-3 w-full bg-white text-indigo-600 text-xs font-bold py-2 rounded-lg hover:bg-slate-50 transition-colors">
            UPGRADE
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
