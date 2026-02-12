
import React, { useState } from 'react';
import { SignSequence, TranslationStatus } from '../types';
import { apiService } from '../services/api';
import { useHistory } from '../contexts/HistoryContext';
import SequencePlayer from '../components/Translation/SequencePlayer';
import LanguageSelector from '../components/Translation/LanguageSelector';
import Button from '../components/UI/Button';

const TextToSignPage: React.FC = () => {
  const { addToHistory } = useHistory();
  const [inputText, setInputText] = useState('');
  const [language, setLanguage] = useState('asl');
  const [sequences, setSequences] = useState<SignSequence[]>([]);
  const [status, setStatus] = useState<TranslationStatus>(TranslationStatus.IDLE);
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    setStatus(TranslationStatus.PROCESSING);
    setSequences([]);
    
    try {
      const results = await apiService.translateTextToSign(inputText);
      setSequences(results);
      setStatus(TranslationStatus.COMPLETED);

      addToHistory({
        type: 'text-to-sign',
        input: `[${language.toUpperCase()}] ${inputText}`,
        output: `${results.length} sign sequence(s)`,
      });
    } catch (error) {
      setStatus(TranslationStatus.ERROR);
    }
  };

  const handleQuickTranslate = (text: string) => {
    setInputText(text);
    // Auto-triggering can be a UX choice
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Text → Sign Translator</h1>
          <p className="text-slate-500">Educational sentence decomposition to sign video</p>
        </div>
        <LanguageSelector value={language} onChange={setLanguage} />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-slate-700">Sentence Input</label>
                <span className="text-[10px] text-slate-400 font-bold uppercase">{inputText.length} / 280</span>
              </div>
              <textarea
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none min-h-[160px] leading-relaxed"
                placeholder="Type a full sentence for the AI to decompose..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                maxLength={280}
              />
            </div>
            
            <div className="flex items-center justify-between gap-4">
              <div className="flex gap-2">
                {['Hello', 'Thank you', 'How are you?'].map(phrase => (
                  <button 
                    key={phrase}
                    onClick={() => handleQuickTranslate(phrase)}
                    className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg hover:bg-indigo-100 transition-colors"
                  >
                    {phrase}
                  </button>
                ))}
              </div>
              <Button 
                onClick={handleTranslate}
                isLoading={status === TranslationStatus.PROCESSING}
                disabled={!inputText.trim()}
                className="shadow-xl"
              >
                Decompose & Sign
              </Button>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
            <h4 className="font-bold text-slate-800 text-xs mb-4">Sequence Intelligence</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Our model uses a combination of Natural Language Processing (NLP) and a curated Sign Dictionary to map English grammar to Sign Language syntax.
            </p>
            <div className="mt-4 flex gap-4">
              <div className="flex-1 bg-white p-3 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Context Engine</p>
                <p className="text-xs font-bold text-emerald-600 mt-1">Active</p>
              </div>
              <div className="flex-1 bg-white p-3 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Motion Cache</p>
                <p className="text-xs font-bold text-indigo-600 mt-1">Ready</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          {status === TranslationStatus.IDLE && (
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] aspect-video flex flex-col items-center justify-center p-12 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-4xl mb-6 grayscale opacity-40">✍️</div>
              <h3 className="text-xl font-bold text-slate-800">Ready to Visualize</h3>
              <p className="text-slate-400 mt-2 max-w-sm mx-auto text-sm">Input text on the left to generate a high-fidelity sign language sequence breakdown.</p>
            </div>
          )}

          {(status === TranslationStatus.COMPLETED || status === TranslationStatus.PROCESSING) && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500">
              <SequencePlayer 
                sequences={sequences} 
                onComplete={() => console.log('Sequence finished')} 
              />

              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="font-bold text-slate-800 text-sm mb-4">Sentence Decomposition</h3>
                <div className="flex flex-wrap gap-2">
                  {sequences.length > 0 ? sequences.map((item, idx) => (
                    <div 
                      key={idx}
                      className={`flex flex-col items-center gap-2 p-2 rounded-2xl transition-all border ${
                        activeWordIndex === idx 
                          ? 'bg-indigo-50 border-indigo-200' 
                          : 'bg-slate-50 border-transparent hover:border-slate-200'
                      }`}
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm">
                        <img src={item.thumbnailUrl} alt={item.word} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-700">{item.word}</span>
                    </div>
                  )) : (
                    Array.from({length: 4}).map((_, i) => (
                      <div key={i} className="w-16 h-20 bg-slate-100 rounded-2xl animate-pulse" />
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextToSignPage;
