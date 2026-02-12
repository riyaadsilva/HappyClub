
import React, { useState } from 'react';
import LanguageSelector from '../components/Translation/LanguageSelector';

const commonSigns = [
  { word: 'Hello', category: 'Greetings', thumb: 'https://picsum.photos/seed/hello/200/200' },
  { word: 'Thank you', category: 'Courtesy', thumb: 'https://picsum.photos/seed/thanks/200/200' },
  { word: 'Please', category: 'Courtesy', thumb: 'https://picsum.photos/seed/please/200/200' },
  { word: 'Friend', category: 'People', thumb: 'https://picsum.photos/seed/friend/200/200' },
  { word: 'Love', category: 'Emotions', thumb: 'https://picsum.photos/seed/love/200/200' },
  { word: 'Happy', category: 'Emotions', thumb: 'https://picsum.photos/seed/happy/200/200' },
  { word: 'Eat', category: 'Actions', thumb: 'https://picsum.photos/seed/eat/200/200' },
  { word: 'Water', category: 'Basic Needs', thumb: 'https://picsum.photos/seed/water/200/200' },
];

const DictionaryPage: React.FC = () => {
  const [language, setLanguage] = useState('asl');
  const [search, setSearch] = useState('');

  const filteredSigns = commonSigns.filter(s => 
    s.word.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Sign Dictionary</h1>
          <p className="text-slate-500">Browse and learn isolated signs from the dataset</p>
        </div>
        <LanguageSelector value={language} onChange={setLanguage} />
      </header>

      <div className="flex gap-4">
        <input 
          type="text" 
          placeholder="Search for a sign..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
        />
        <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 flex items-center gap-4 shadow-sm">
          <span className="text-xs font-bold text-slate-400">Categories:</span>
          <select className="bg-transparent text-sm font-semibold outline-none">
            <option>All Signs</option>
            <option>Greetings</option>
            <option>Actions</option>
            <option>Emotions</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredSigns.map((sign, idx) => (
          <div key={idx} className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden cursor-pointer">
            <div className="aspect-square relative">
              <img src={sign.thumb} alt={sign.word} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                 <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300">
                    <span className="text-indigo-600">▶️</span>
                 </div>
              </div>
            </div>
            <div className="p-5">
              <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1">{sign.category}</p>
              <h3 className="text-lg font-bold text-slate-800">{sign.word}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DictionaryPage;
