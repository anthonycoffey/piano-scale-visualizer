import { useState } from "react";
import Piano from "@/components/Piano";
import ScaleSelector from "@/components/ScaleSelector";
import { Note, ScaleType, scaleNames, formatNote } from "@/utils/scales";

const Index = () => {
  const [rootNote, setRootNote] = useState<Note>("C");
  const [scaleType, setScaleType] = useState<ScaleType>("major");

  const handleRootChange = (note: Note) => {
    setRootNote(note);
  };

  const handleScaleChange = (scale: ScaleType) => {
    setScaleType(scale);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-2 animate-fade-in">
      <div className="text-center mb-4">
        <div className="inline-block px-3 py-1 mb-2 bg-secondary text-xs font-medium rounded-full">
          Learn & Explore Piano Scales
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
          Piano Scale Visualizer
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Visualize and play different scales on a virtual piano. Select a root
          note and scale type to see the notes highlighted.
        </p>
      </div>

      <div className="w-full max-w-3xl space-y-6">
        <Piano rootNote={rootNote} scaleType={scaleType} />
        <div className="text-center">
          <div className="glass inline-block px-5 py-3 rounded-full text-xl font-medium">
            <span>
              {formatNote(rootNote)} {scaleNames[scaleType]}
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
            className="font-bold text-primary hover:underline"
          >
            Anthony Coffey
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
