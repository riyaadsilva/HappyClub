
import React from 'react';

interface LanguageSelectorProps {
  value: string;
  onChange: (lang: string) => void;
  compact?: boolean;
}

const languages = [
  { id: 'asl', name: 'ASL', full: 'American Sign Language', flag: '🇺🇸' },
  { id: 'bsl', name: 'BSL', full: 'British Sign Language', flag: '🇬🇧' },
  { id: 'fsl', name: 'FSL', full: 'French Sign Language', flag: '🇫🇷' },
  { id: 'isl', name: 'ISL', full: 'International Sign Language', flag: '🌐' },
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ value, onChange, compact }) => {
  return (
    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">Dataset:</span>
      <div className="flex gap-1">
        {languages.map((lang) => (
          <button
            key={lang.id}
            onClick={() => onChange(lang.id)}
            title={lang.full}
            className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
              value === lang.id 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            {compact ? lang.name : `${lang.flag} ${lang.name}`}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
