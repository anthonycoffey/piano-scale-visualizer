
import React, { useState, useEffect } from 'react';
import PianoKey from './PianoKey';
import { generatePianoKeys, playNote, PianoKey as PianoKeyType, initAudio } from '@/utils/audio';
import { Note, ScaleType, generateScale, isNoteInScale } from '@/utils/scales';

interface PianoProps {
  rootNote: Note;
  scaleType: ScaleType;
}

const Piano: React.FC<PianoProps> = ({ rootNote, scaleType }) => {
  const [keys, setKeys] = useState<PianoKeyType[]>([]);
  const [currentScale, setCurrentScale] = useState<Note[]>([]);
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);

  // Generate piano keys on component mount
  useEffect(() => {
    setKeys(generatePianoKeys());
  }, []);

  // Update scale when root note or scale type changes
  useEffect(() => {
    setCurrentScale(generateScale(rootNote, scaleType));
  }, [rootNote, scaleType]);

  // Initialize audio context on first user interaction
  const initializeAudio = () => {
    if (!isAudioInitialized) {
      initAudio();
      setIsAudioInitialized(true);
    }
  };

  // Play a note
  const handlePlayNote = (note: string) => {
    initializeAudio();
    playNote(note);
  };

  // Check if a note is in the current scale
  const checkIsInScale = (note: string): boolean => {
    // Extract the base note without octave (e.g., "C4" -> "C")
    const baseNote = note.replace(/\d+$/, '') as Note;
    return isNoteInScale(baseNote, currentScale);
  };
  
  // Group keys to separate white and black keys for rendering
  const whiteKeys = keys.filter(key => !key.isBlack);
  const blackKeys = keys.filter(key => key.isBlack);

  return (
    <div className="piano-container w-full max-w-3xl mx-auto" onClick={initializeAudio}>
      <div className="piano-keyboard relative flex h-[160px] rounded-md overflow-hidden">
        {/* White keys - render first as the base */}
        <div className="flex flex-1 relative">
          {whiteKeys.map((key) => (
            <div key={key.note} className="flex-1 relative">
              <PianoKey
                keyData={key}
                isInScale={checkIsInScale(key.note)}
                onPlay={handlePlayNote}
              />
            </div>
          ))}
        </div>
        
        {/* Black keys - overlay on top with absolute positioning */}
        {blackKeys.map((key) => {
          // Find the index of the corresponding white key to position the black key
          const whiteKeyIndex = whiteKeys.findIndex(k => 
            k.position < key.position && whiteKeys.find(next => next.position > key.position)
          );
          
          return (
            <div 
              key={key.note}
              className="absolute top-0"
              style={{ 
                left: `calc(${whiteKeyIndex + 0.5} * (100% / ${whiteKeys.length}))`,
                width: `calc(100% / ${whiteKeys.length})`
              }}
            >
              <PianoKey
                keyData={key}
                isInScale={checkIsInScale(key.note)}
                onPlay={handlePlayNote}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Piano;
