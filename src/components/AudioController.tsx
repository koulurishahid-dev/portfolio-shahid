import React, { useState } from 'react';
import { VolumeX } from 'lucide-react';
import { soundEngine } from '../cinematic/CinematicSoundEngine';

export const AudioController: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(() => soundEngine.getIsPlaying());

  const handleToggle = () => {
    const active = soundEngine.toggle();
    setIsPlaying(active);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      data-cursor="pointer"
      data-cursor-text={isPlaying ? 'MUTE' : 'SOUND'}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#18181B]/80 hover:bg-[#27272A] text-zinc-300 hover:text-white border border-white/10 shadow-sm backdrop-blur-md transition-all duration-200 cursor-pointer active:scale-95 group"
      aria-label={isPlaying ? 'Mute audio' : 'Enable ambient soundscape'}
    >
      {isPlaying ? (
        <>
          <div className="flex items-end gap-0.5 h-3 w-3.5 pb-0.5">
            <span className="w-0.5 bg-red-500 rounded-full h-full animate-[pulse_0.6s_ease-in-out_infinite]" />
            <span className="w-0.5 bg-rose-400 rounded-full h-2/3 animate-[pulse_0.4s_ease-in-out_infinite_0.2s]" />
            <span className="w-0.5 bg-red-600 rounded-full h-4/5 animate-[pulse_0.8s_ease-in-out_infinite_0.4s]" />
          </div>
          <span className="text-[11px] font-mono font-medium text-red-400 hidden sm:inline">
            AMBIENT ON
          </span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
          <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline">
            SOUND OFF
          </span>
        </>
      )}
    </button>
  );
};
