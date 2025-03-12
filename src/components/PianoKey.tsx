
import React, { useState, useEffect } from 'react';
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
  
  const { note, baseNote, isBlack, position } = keyData;
  
  // Calculate position for black keys
  const getBlackKeyStyle = () => {
    const offset = `${-33}%`;
    return { left: offset };
  };
  
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
        isBlack ? 'piano-key-black' : 'piano-key-white',
        isInScale && 'in-scale',
        isActive && 'active',
      )}
      style={isBlack ? getBlackKeyStyle() : {}}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      role="button"
      aria-label={`Piano key ${note}`}
      tabIndex={0}
    >
      <div className="absolute bottom-2 left-0 right-0 text-center text-xs text-gray-500">
        {!isBlack && baseNote.replace('#', '♯')}
      </div>
    </div>
  );
};

export default PianoKey;
