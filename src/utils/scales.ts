
// Scale and mode definitions
export type ScaleType = 
  | 'major' 
  | 'minor' 
  | 'harmonicMinor' 
  | 'melodicMinor'
  | 'blues'
  | 'bebop'
  | 'ionian'
  | 'dorian'
  | 'phrygian'
  | 'lydian'
  | 'mixolydian'
  | 'aeolian'
  | 'locrian';

export type Note = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';

// Scale intervals in semitones
const scaleIntervals: Record<ScaleType, number[]> = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  harmonicMinor: [0, 2, 3, 5, 7, 8, 11],
  melodicMinor: [0, 2, 3, 5, 7, 9, 11],
  blues: [0, 3, 5, 6, 7, 10],
  bebop: [0, 2, 4, 5, 7, 9, 10, 11],
  ionian: [0, 2, 4, 5, 7, 9, 11],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  phrygian: [0, 1, 3, 5, 7, 8, 10],
  lydian: [0, 2, 4, 6, 7, 9, 11],
  mixolydian: [0, 2, 4, 5, 7, 9, 10],
  aeolian: [0, 2, 3, 5, 7, 8, 10],
  locrian: [0, 1, 3, 5, 6, 8, 10]
};

// All notes in chromatic order
export const allNotes: Note[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Group scales by category
export const scaleCategories = {
  basic: ['major', 'minor', 'harmonicMinor', 'melodicMinor'] as ScaleType[],
  jazz: ['bebop'] as ScaleType[],
  other: ['blues'] as ScaleType[],
  modes: ['ionian', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'aeolian', 'locrian'] as ScaleType[]
};

// Human-readable names for scales
export const scaleNames: Record<ScaleType, string> = {
  major: 'Major',
  minor: 'Natural Minor',
  harmonicMinor: 'Harmonic Minor',
  melodicMinor: 'Melodic Minor',
  blues: 'Blues',
  bebop: 'Bebop',
  ionian: 'Ionian Mode',
  dorian: 'Dorian Mode',
  phrygian: 'Phrygian Mode',
  lydian: 'Lydian Mode',
  mixolydian: 'Mixolydian Mode',
  aeolian: 'Aeolian Mode',
  locrian: 'Locrian Mode'
};

// Generate notes in a scale
export function generateScale(rootNote: Note, scaleType: ScaleType): Note[] {
  const rootIndex = allNotes.indexOf(rootNote);
  const intervals = scaleIntervals[scaleType];
  
  return intervals.map(interval => {
    const noteIndex = (rootIndex + interval) % 12;
    return allNotes[noteIndex];
  });
}

// Check if a note is in a scale
export function isNoteInScale(note: Note, scale: Note[]): boolean {
  return scale.includes(note);
}

// Format note for display
export function formatNote(note: Note): string {
  return note.replace('#', '♯');
}
