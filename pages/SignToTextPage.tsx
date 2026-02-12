
import React, { useState, useRef, useEffect } from 'react';
import { TranslationStatus } from '../types';
import { apiService } from '../services/api';
import StatusBanner from '../components/UI/StatusBanner';
import { useHistory } from '../contexts/HistoryContext';
import { useMediaDevices } from '../hooks/useMediaDevices';
import Button from '../components/UI/Button';
import LanguageSelector from '../components/Translation/LanguageSelector';
import SkeletonOverlay from '../components/Translation/SkeletonOverlay';

const SignToTextPage: React.FC = () => {
  const { addToHistory } = useHistory();
  const { stream, videoRef, error: camError, startCamera, stopCamera } = useMediaDevices();
  const [status, setStatus] = useState<TranslationStatus>(TranslationStatus.IDLE);
  const [language, setLanguage] = useState('asl');
  const [result, setResult] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [detectedTokens, setDetectedTokens] = useState<string[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [showSkeleton, setShowSkeleton] = useState(true);

  // Simulation of real-time token detection
  useEffect(() => {
    let interval: any;
    if (status === TranslationStatus.RECORDING) {
      const mockTokens = ['Greeting', 'Identity', 'Feeling', 'Action'];
      interval = setInterval(() => {
        setDetectedTokens(prev => {
          const next = mockTokens[prev.length % mockTokens.length];
          return prev.length < 5 ? [...prev, next] : prev;
        });
      }, 1500);
    } else {
      setDetectedTokens([]);
    }
    return () => clearInterval(interval);
  }, [status]);

  const startRecording = () => {
    if (!stream) return;
    setRecordedChunks([]);
    setResult(null);
    setConfidence(null);
    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) setRecordedChunks((prev) => [...prev, e.data]);
    };
    recorder.onstop = handleRecordingStop;
    recorder.start();
    mediaRecorderRef.current = recorder;
    setStatus(TranslationStatus.RECORDING);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };

  const handleRecordingStop = () => {
    setStatus(TranslationStatus.UPLOADING);
    setTimeout(async () => {
      await handleTranslate();
    }, 800);
  };

  const handleTranslate = async () => {
    setStatus(TranslationStatus.PROCESSING);
    try {
      const mockBlob = new Blob(recordedChunks, { type: 'video/webm' });
      const response = await apiService.translateSignToText(mockBlob);
      setResult(response.result);
      setConfidence(response.confidence);
      setStatus(TranslationStatus.COMPLETED);

      addToHistory({
        type: 'sign-to-text',
        input: `[${language.toUpperCase()}] Live Stream Capture`,
        output: response.result,
      });
    } catch (error) {
      setStatus(TranslationStatus.ERROR);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Sign → Text Translator</h1>
          <p className="text-slate-500">Sequence recognition engine powered by Transformer AI</p>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSelector value={language} onChange={setLanguage} compact />
          <StatusBanner status={status} />
        </div>
      </header>

      {camError && (
        <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-700 text-sm">
          <span>⚠️</span> {camError}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative aspect-video bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white group">
            {stream ? (
              <>
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                
                <SkeletonOverlay active={showSkeleton} />

                {/* AI Detection Overlays */}
                <div className="absolute top-6 left-6 flex flex-col gap-3 pointer-events-none z-20">
                  {detectedTokens.map((token, i) => (
                    <div 
                      key={i} 
                      className="bg-indigo-600/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-lg border border-white/20 animate-in slide-in-from-left duration-300 shadow-lg"
                    >
                      DETECTED: {token}
                    </div>
                  ))}
                </div>

                {status === TranslationStatus.RECORDING && (
                  <div className="absolute top-6 right-6 z-20">
                    <div className="bg-red-600 text-white px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-2 shadow-xl animate-pulse">
                      <span className="w-2 h-2 bg-white rounded-full"></span>
                      LIVE CAPTURE
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-white p-12 text-center bg-slate-800/80">
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6 border border-slate-700 shadow-inner">
                  <span className="text-4xl opacity-50">📷</span>
                </div>
                <h3 className="text-xl font-bold">Inference Engine Offline</h3>
                <p className="text-slate-400 mt-2 max-w-xs mx-auto text-sm">Activate your local camera feed to begin translating sign language in real-time.</p>
                <Button onClick={startCamera} className="mt-6 px-10">Initialize Feed</Button>
              </div>
            )}
            
            {stream && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/40 backdrop-blur-xl p-2 rounded-2xl border border-white/10 shadow-2xl z-30">
                {status !== TranslationStatus.RECORDING ? (
                  <Button 
                    variant="danger"
                    size="md"
                    onClick={startRecording}
                    leftIcon={<span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>}
                  >
                    Translate Sequence
                  </Button>
                ) : (
                  <Button 
                    variant="secondary"
                    size="md"
                    onClick={stopRecording}
                    className="bg-white text-slate-900"
                    leftIcon={<span className="w-2 h-2 bg-red-600 rounded-sm"></span>}
                  >
                    Finish Translation
                  </Button>
                )}
                <Button variant="ghost" size="md" onClick={() => setShowSkeleton(!showSkeleton)} className="text-white hover:bg-white/10">
                  {showSkeleton ? 'Hide HUD' : 'Show HUD'}
                </Button>
                <Button variant="ghost" size="md" onClick={stopCamera} className="text-white hover:bg-white/10">
                  Exit
                </Button>
              </div>
            )}
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5">
               <span className="text-8xl">💬</span>
             </div>
            
            <div className="flex items-center justify-between mb-4 relative">
              <h3 className="font-bold text-slate-800 uppercase tracking-widest text-[10px]">AI Generated Sentence</h3>
              {confidence && (
                <div className="flex items-center gap-2">
                   <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500" style={{ width: `${confidence * 100}%` }}></div>
                   </div>
                   <span className="text-emerald-600 text-[10px] font-bold">{(confidence * 100).toFixed(1)}% Match</span>
                </div>
              )}
            </div>
            
            <div className={`min-h-[160px] rounded-3xl p-8 transition-all duration-500 border-2 flex items-center ${
              result ? 'bg-indigo-50/30 border-indigo-100' : 'bg-slate-50 border-slate-100'
            }`}>
              {result ? (
                <p className="text-3xl leading-snug text-slate-800 font-semibold italic">"{result}"</p>
              ) : (
                <div className="flex flex-col items-center justify-center w-full text-slate-400 space-y-4">
                  <span className="text-2xl italic font-light">
                    {status === TranslationStatus.RECORDING ? 'Processing gestural stream...' : 'Waiting for signs'}
                  </span>
                  <p className="text-xs max-w-sm text-center leading-relaxed">
                    Our CNN-LSTM model is ready to interpret your signs. Perform your sentence clearly in front of the camera.
                  </p>
                </div>
              )}
            </div>
            
            {result && (
              <div className="flex gap-4 mt-8">
                <Button variant="outline" className="flex-1" size="md">Copy to Clipboard</Button>
                <Button variant="primary" className="flex-1" size="md">Text to Speech</Button>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 text-xs uppercase tracking-widest">Model Specifications</h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Architecture</p>
                <p className="text-sm font-bold text-slate-800 mt-1">Transformer-B / 12 Layers</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Input Token Window</p>
                <p className="text-sm font-bold text-slate-800 mt-1">512 Frames (Seq. Level)</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Latency Target</p>
                <p className="text-sm font-bold text-indigo-600 mt-1">&lt; 150ms / Inference</p>
              </div>
            </div>
          </div>

          <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-200">
            <h4 className="font-bold text-lg mb-2">Pro Feedback</h4>
            <p className="text-xs opacity-80 leading-relaxed mb-6">
              Enable "Skeleton Visualization" to see how the model tracks your hand joints for debugging and precision monitoring.
            </p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowSkeleton(!showSkeleton)}
              className="bg-white/10 hover:bg-white/20 text-white w-full border border-white/10"
            >
              {showSkeleton ? 'Disable HUD' : 'Enable HUD'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignToTextPage;
