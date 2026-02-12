
import React from 'react';
// FIX: Ensure Link is imported cleanly from react-router-dom
import { Link } from 'react-router-dom';
import RecentActivity from '../components/Dashboard/RecentActivity';
import Button from '../components/UI/Button';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Total Translations', value: '1,284', change: '+12%', color: 'indigo' },
    { label: 'Avg. Confidence', value: '96.2%', change: '+0.5%', color: 'emerald' },
    { label: 'System Uptime', value: '99.9%', change: 'Stable', color: 'blue' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Welcome Back, Alex</h1>
          <p className="text-slate-500 mt-2">The Happy Club Sign Language AI is optimized and ready.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">Download Report</Button>
          <Button variant="primary" size="sm">Quick Scan</Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-bold text-slate-800">{stat.value}</span>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between group h-[280px]">
              <div>
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">🖐️</div>
                <h2 className="text-xl font-bold text-slate-800">Sign to Text</h2>
                <p className="text-slate-500 text-sm mt-2">Continuous recognition for fluid sign sequences.</p>
              </div>
              <Link to="/sign-to-text">
                <Button className="w-full">Open Camera</Button>
              </Link>
            </div>

            <div className="bg-slate-800 p-8 rounded-3xl text-white flex flex-col justify-between group h-[280px]">
              <div>
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">✍️</div>
                <h2 className="text-xl font-bold">Text to Sign</h2>
                <p className="opacity-70 text-sm mt-2">Educational visualization of sentence structures.</p>
              </div>
              <Link to="/text-to-sign">
                <Button variant="ghost" className="w-full bg-white text-slate-800 hover:bg-slate-100">Type Sentence</Button>
              </Link>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6">Translation Volume</h3>
            <div className="h-48 flex items-end gap-2 px-2">
              {[40, 65, 30, 85, 45, 70, 90, 60, 75, 55, 80, 95].map((val, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-indigo-100 rounded-t-lg hover:bg-indigo-500 transition-colors group relative"
                  style={{ height: `${val}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                    {val*10}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span>Jan</span>
              <span>Jun</span>
              <span>Dec</span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <RecentActivity />
          
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-6 rounded-3xl text-white shadow-xl shadow-indigo-200">
            <h4 className="font-bold mb-2">Need Help?</h4>
            <p className="text-xs opacity-80 mb-4 leading-relaxed">Check our guide on the best signing distance and lighting conditions for AI accuracy.</p>
            <button className="text-xs font-bold underline hover:opacity-100 opacity-80 transition-opacity">Read Documentation</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
