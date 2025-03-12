
// Audio context and oscillators for piano sounds
let audioContext: AudioContext | null = null;

// Initialize audio context
export function initAudio(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
}

// Map of note names to frequencies (Middle C is C4 at 261.63 Hz)
const noteFrequencies: Record<string, number> = {
  'C3': 130.81, 'C#3': 138.59, 'D3': 146.83, 'D#3': 155.56, 'E3': 164.81, 'F3': 174.61,
  'F#3': 185.00, 'G3': 196.00, 'G#3': 207.65, 'A3': 220.00, 'A#3': 233.08, 'B3': 246.94,
  'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63, 'F4': 349.23, 
  'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
  'C5': 523.25
};

// Piano key octave and note data
export type PianoKey = {
  note: string;
  baseNote: string;
  octave: number;
  isBlack: boolean;
  position: number;
};

// Generate piano keys data
export function generatePianoKeys(): PianoKey[] {
  const keys: PianoKey[] = [];
  const baseNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const startOctave = 3; // Start at C3
  const endOctave = 5;   // End at C5
  
  let position = 0;
  for (let octave = startOctave; octave <= endOctave; octave++) {
    for (let i = 0; i < baseNotes.length; i++) {
      // Stop after C5 to get exactly 2 octaves from C3 to C5
      if (octave === endOctave && i > 0) break;
      
      const baseNote = baseNotes[i];
      const note = `${baseNote}${octave}`;
      const isBlack = baseNote.includes('#');
      
      keys.push({
        note,
        baseNote,
        octave,
        isBlack,
        position: position
      });
      
      position += 1;
    }
  }
  
  return keys;
}

// Play a note with the given frequency
export function playNote(note: string, duration = 0.5): void {
  if (!audioContext) {
    audioContext = initAudio();
  }

  const frequency = noteFrequencies[note];
  if (!frequency) return;

  // Create oscillator
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;

  // Create gain node for envelope
  const gainNode = audioContext.createGain();
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.01);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration);

  // Connect and start
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
}
