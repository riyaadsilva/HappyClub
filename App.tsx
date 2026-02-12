
import React from 'react';
// FIX: Split imports between react-router-dom and react-router for v6 compatibility
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Navbar from './components/Layout/Navbar';
import Dashboard from './pages/Dashboard';
import SignToTextPage from './pages/SignToTextPage';
import TextToSignPage from './pages/TextToSignPage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';
import DictionaryPage from './pages/DictionaryPage';
import { HistoryProvider } from './contexts/HistoryContext';

const App: React.FC = () => {
  return (
    <HistoryProvider>
      <Router>
        <div className="flex min-h-screen bg-slate-50">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <Navbar />
            <main className="flex-1 p-6 md:p-8 overflow-y-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/sign-to-text" element={<SignToTextPage />} />
                <Route path="/text-to-sign" element={<TextToSignPage />} />
                <Route path="/dictionary" element={<DictionaryPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </HistoryProvider>
  );
};

export default App;
