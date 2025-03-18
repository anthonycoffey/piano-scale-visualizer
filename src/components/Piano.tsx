import React, { useState, useEffect } from "react";
import PianoKey from "./PianoKey";
import {
  generatePianoKeys,
  playNote,
  PianoKey as PianoKeyType,
  initAudio,
} from "@/utils/audio";
import { Note, ScaleType, generateScale, isNoteInScale } from "@/utils/scales";

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
    const baseNote = note.replace(/\d+$/, "") as Note;
    return isNoteInScale(baseNote, currentScale);
  };

  // Check if a note is the same as root note
  const checkIsRootNote = (note: string): boolean => {
    const baseNote = note.replace(/\d+$/, "") as Note;
    return rootNote === baseNote;
  };

  // Split keys into white and black
  const whiteKeys = keys.filter((key) => !key.isBlack);
  const blackKeys = keys.filter((key) => key.isBlack);

  return (
    <div
      className="piano-container w-full max-w-3xl mx-auto p-4 "
      onClick={initializeAudio}
    >
      <div className="piano-keyboard relative">
        {/* White keys layout */}
        <div className="flex h-[160px]">
          {whiteKeys.map((key, index) => (
            <div key={key.note} className="relative flex-1">
              <PianoKey
                keyData={key}
                isRootNote={checkIsRootNote(key.note)}
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
              // Determine if we need a black key after this white key
              // No black keys after E and B
              if (whiteKey.baseNote === "E" || whiteKey.baseNote === "B") {
                return <div key={`spacer-${index}`} className="flex-1"></div>;
              }

              // Find the black key that comes after this white key
              const blackKey = blackKeys.find((bk) => {
                return bk.position === whiteKey.position + 1;
              });

              if (!blackKey) {
                return <div key={`spacer-${index}`} className="flex-1"></div>;
              }

              return (
                <div
                  key={`black-key-position-${index}`}
                  className="flex-1 relative"
                >
                  <div className="absolute w-[70%] right-0 transform translate-x-1/2">
                    <PianoKey
                      keyData={blackKey}
                      isRootNote={checkIsRootNote(blackKey.note)}
                      isInScale={checkIsInScale(blackKey.note)}
                      onPlay={handlePlayNote}
                    />
                  </div>
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
