
import React, { useState, useRef, useEffect } from 'react';
import { SignSequence } from '../../types';
import Button from '../UI/Button';

interface SequencePlayerProps {
  sequences: SignSequence[];
  onComplete?: () => void;
}

const SequencePlayer: React.FC<SequencePlayerProps> = ({ sequences, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed, currentIndex]);

  const handleNext = () => {
    if (currentIndex < sequences.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsPlaying(false);
      onComplete?.();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  if (sequences.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="bg-slate-900 aspect-video rounded-3xl overflow-hidden relative shadow-2xl border-4 border-white group">
        <video
          ref={videoRef}
          key={sequences[currentIndex].videoUrl}
          src={sequences[currentIndex].videoUrl}
          autoPlay={isPlaying}
          playsInline
          className="w-full h-full object-cover"
          onEnded={handleNext}
        />
        
        {/* Overlays */}
        <div className="absolute top-4 left-4 flex gap-2">
          <div className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-xl text-white font-bold text-[10px] uppercase tracking-widest border border-white/10">
            Sign: {sequences[currentIndex].word}
          </div>
          <div className="bg-indigo-600 px-3 py-1.5 rounded-xl text-white font-bold text-[10px] uppercase tracking-widest border border-indigo-400">
            {currentIndex + 1} / {sequences.length}
          </div>
        </div>

        {/* Playback Progress */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10">
          <div 
            className="h-full bg-indigo-500 transition-all duration-300 ease-linear"
            style={{ width: `${((currentIndex + 1) / sequences.length) * 100}%` }}
          />
        </div>

        {/* Center Play Button Overlay on Hover */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] cursor-pointer" onClick={togglePlay}>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white text-3xl hover:scale-110 transition-transform">
              ▶️
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handlePrevious} disabled={currentIndex === 0}>⏮️</Button>
          <Button variant="ghost" size="sm" onClick={togglePlay}>
            {isPlaying ? '⏸️' : '▶️'}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleNext} disabled={currentIndex === sequences.length - 1}>⏭️</Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Speed</span>
            <select 
              value={playbackSpeed} 
              onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
              className="bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold p-1 outline-none"
            >
              <option value="0.5">0.5x</option>
              <option value="0.75">0.75x</option>
              <option value="1">1.0x</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
            </select>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => { setCurrentIndex(0); setIsPlaying(true); }}
            className="text-[10px]"
          >
            Restart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SequencePlayer;
