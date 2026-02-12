
import React from 'react';
import { TranslationStatus } from '../../types';

interface StatusBannerProps {
  status: TranslationStatus;
}

const StatusBanner: React.FC<StatusBannerProps> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case TranslationStatus.RECORDING:
        return { color: 'bg-red-500', text: 'Recording Live Feed...', icon: '🔴' };
      case TranslationStatus.UPLOADING:
        return { color: 'bg-blue-500', text: 'Uploading Sequence...', icon: '📤' };
      case TranslationStatus.PROCESSING:
        return { color: 'bg-indigo-600', text: 'AI Inferencing (LSTM/Transformer)...', icon: '🧠' };
      case TranslationStatus.ERROR:
        return { color: 'bg-amber-500', text: 'Communication Error', icon: '⚠️' };
      default:
        return null;
    }
  };

  const config = getStatusConfig();
  if (!config) return null;

  return (
    <div className={`${config.color} text-white px-4 py-2 rounded-lg flex items-center justify-center gap-3 animate-in fade-in slide-in-from-top duration-300`}>
      <span className="animate-pulse">{config.icon}</span>
      <span className="text-sm font-medium">{config.text}</span>
    </div>
  );
};

export default StatusBanner;
