
import React, { useState } from 'react';
import Button from '../components/UI/Button';

const SettingsPage: React.FC = () => {
  const [preferences, setPreferences] = useState({
    language: 'asl',
    autoSpeak: true,
    highConfidenceOnly: false,
    darkMode: false,
    aiModel: 'stable-v2'
  });

  const toggle = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-800">Application Settings</h1>
        <p className="text-slate-500">Customize your Happy Club experience and AI preferences.</p>
      </header>

      <div className="space-y-6">
        <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 font-bold text-slate-800">General Preferences</div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-700">Primary Sign Language</p>
                <p className="text-xs text-slate-400">Select the model's target language dataset.</p>
              </div>
              <select
                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                value={preferences.language}
                onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
              >
                <option value="asl">American Sign Language (ASL)</option>
                <option value="bsl">British Sign Language (BSL)</option>
                <option value="isl">International Sign Language</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-700">Auto-speak Translation</p>
                <p className="text-xs text-slate-400">Automatically use text-to-speech for results.</p>
              </div>
              <button
                onClick={() => toggle('autoSpeak')}
                className={`w-12 h-6 rounded-full transition-colors relative ${preferences.autoSpeak ? 'bg-indigo-600' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${preferences.autoSpeak ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-700">High Confidence Filter</p>
                <p className="text-xs text-slate-400">Only show results with &gt;90% confidence.</p>
              </div>
              <button
                onClick={() => toggle('highConfidenceOnly')}
                className={`w-12 h-6 rounded-full transition-colors relative ${preferences.highConfidenceOnly ? 'bg-indigo-600' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${preferences.highConfidenceOnly ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 font-bold text-slate-800">AI Inference Configuration</div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-700">Model Version</p>
                <p className="text-xs text-slate-400">Choose between stable and experimental architectures.</p>
              </div>
              <select
                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                value={preferences.aiModel}
                onChange={(e) => setPreferences({ ...preferences, aiModel: e.target.value })}
              >
                <option value="stable-v2">Stable v2.4 (LSTM-CNN)</option>
                <option value="transformer-alpha">Transformer Alpha (Experimental)</option>
                <option value="lightweight">Lite (Mobile Optimized)</option>
              </select>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl">
              <div className="flex gap-3">
                <span className="text-amber-500 font-bold">⚠️</span>
                <div>
                  <p className="text-sm font-bold text-amber-800">Experimental Models</p>
                  <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                    Transformer-based models provide better long-sentence accuracy but require higher computation power and may have increased latency on some devices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-4">
          <Button variant="ghost">Discard Changes</Button>
          <Button variant="primary">Save Settings</Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
