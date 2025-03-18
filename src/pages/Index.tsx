import { useState } from "react";
import Piano from "@/components/Piano";
import ScaleSelector from "@/components/ScaleSelector";
import {
  Note,
  ScaleType,
  scaleNames,
  formatNote,
  displayNote,
} from "@/utils/scales";

const Index = () => {
  const [rootNote, setRootNote] = useState<Note>("D#");
  const [scaleType, setScaleType] = useState<ScaleType>("mixolydian");

  const handleRootChange = (note: Note) => {
    setRootNote(note);
  };

  const handleScaleChange = (scale: ScaleType) => {
    setScaleType(scale);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center animate-fade-in">
      <div className="text-center mb-2">
        <div className="inline-block px-3 py-1 bg-primary text-xs font-medium rounded-full mb-2">
          Learn & Explore Piano Scales
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Piano Scale Visualizer
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Visualize and play different scales on a virtual piano.
        </p>
      </div>

      <div className="w-full max-w-3xl space-y-6">
        <Piano rootNote={rootNote} scaleType={scaleType} />
        <div className="text-center">
          <div className="inline-block px-5 py-3 rounded-full text-2xl bg-secondary text-muted-foreground font-medium">
            <span>
              {displayNote(rootNote)} {scaleNames[scaleType]}
            </span>
          </div>
        </div>
        <div className="text-center text-xs text-muted-foreground mt-8">
          <ScaleSelector
            selectedRoot={rootNote}
            selectedScale={scaleType}
            onRootChange={handleRootChange}
            onScaleChange={handleScaleChange}
          />
        </div>
      </div>
      <footer>
        <div className="text-sm text-muted-foreground text-center mt-4">
          Designed by{" "}
          <a
            href="https://coffey.codes"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-muted-foreground hover:underline"
          >
            Anthony Coffey
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
