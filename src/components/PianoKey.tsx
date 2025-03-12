
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { PianoKey as PianoKeyType } from '@/utils/audio';
import { Note } from '@/utils/scales';

interface PianoKeyProps {
  keyData: PianoKeyType;
  isInScale: boolean;
  onPlay: (note: string) => void;
}

const PianoKey: React.FC<PianoKeyProps> = ({ keyData, isInScale, onPlay }) => {
  const [isActive, setIsActive] = useState(false);
  
  const { note, baseNote, isBlack } = keyData;
  
  // Handle mouse events
  const handleMouseDown = () => {
    setIsActive(true);
    onPlay(note);
  };
  
  const handleMouseUp = () => {
    setIsActive(false);
  };
  
  const handleMouseLeave = () => {
    setIsActive(false);
  };

  return (
    <div
      className={cn(
        isBlack 
          ? "piano-key-black absolute top-0 z-10" 
          : "piano-key-white relative h-full w-full",
        isInScale && 'in-scale',
        isActive && 'active',
      )}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      role="button"
      aria-label={`Piano key ${note}`}
      tabIndex={0}
    >
      {!isBlack && (
        <div className="absolute bottom-2 left-0 right-0 text-center text-xs text-gray-500">
          {baseNote.replace('#', '♯')}
        </div>
      )}
    </div>
  );
};

export default PianoKey;
