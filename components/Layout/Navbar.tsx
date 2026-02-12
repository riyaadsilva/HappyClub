
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
          AI MODEL ONLINE
        </span>
      </div>
      
      <div className="flex items-center gap-6">
        <button className="text-slate-400 hover:text-indigo-600 relative">
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full"></span>
          🔔
        </button>
        <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
          <div className="text-right">
            <p className="text-sm font-semibold">Alex Johnson</p>
            <p className="text-[10px] text-slate-400">Contributor</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold border border-indigo-200">
            AJ
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
