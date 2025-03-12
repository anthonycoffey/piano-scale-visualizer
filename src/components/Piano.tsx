
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
  
  // Split keys into white and black
  const whiteKeys = keys.filter(key => !key.isBlack);
  const blackKeys = keys.filter(key => key.isBlack);

  // Map of indices where black keys should appear
  const blackKeyMap: Record<number, boolean> = {
    0: true,  // C#
    1: true,  // D#
    2: false, // No black key after E
    3: true,  // F#
    4: true,  // G#
    5: true,  // A#
    6: false  // No black key after B
  };

  return (
    <div className="piano-container w-full max-w-3xl mx-auto" onClick={initializeAudio}>
      <div className="piano-keyboard relative rounded-md overflow-hidden">
        {/* White keys layout */}
        <div className="flex h-[160px]">
          {whiteKeys.map((key, index) => (
            <div key={key.note} className="relative flex-1">
              <PianoKey
                keyData={key}
                isInScale={checkIsInScale(key.note)}
                onPlay={handlePlayNote}
              />
            </div>
          ))}
        </div>
        
        {/* Black keys layout */}
        <div className="absolute top-0 left-0 w-full">
          <div className="flex h-[100px]">
            {whiteKeys.map((whiteKey, index) => {
              // Get the current octave group (0-6 represents the 7 white keys in an octave)
              const octavePosition = index % 7;
              
              // Skip positions where no black keys exist (after E and B)
              if (!blackKeyMap[octavePosition]) {
                return <div key={`spacer-${index}`} className="flex-1"></div>;
              }
              
              // Find the corresponding black key
              const blackKey = blackKeys.find(bk => {
                const whiteKeyNote = whiteKey.baseNote;
                const blackKeyNote = bk.baseNote;
                return blackKeyNote === `${whiteKeyNote}#` || 
                       (whiteKeyNote === 'E' && blackKeyNote === 'F#') ||
                       (whiteKeyNote === 'B' && blackKeyNote === 'C#');
              });
              
              return (
                <div key={`black-key-position-${index}`} className="flex-1 relative">
                  {blackKey && (
                    <div className="absolute w-[70%] right-0 transform translate-x-1/2">
                      <PianoKey
                        keyData={blackKey}
                        isInScale={checkIsInScale(blackKey.note)}
                        onPlay={handlePlayNote}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Piano;
