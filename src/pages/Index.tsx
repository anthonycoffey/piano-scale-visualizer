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
    <div className="min-h-screen flex flex-col items-center justify-center p-8 animate-fade-in">
      <div className="mb-8 text-center">
        <div className="inline-block px-3 py-1 mb-2 bg-secondary text-xs font-medium rounded-full">
          Piano Scale Visualizer
        </div>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-2">
          Learn & Explore Piano Scales
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Visualize and play different scales on a virtual piano. Select a root
          note and scale type to see the notes highlighted.
        </p>
      </div>

      <div className="w-full max-w-3xl space-y-8">
        <Piano rootNote={rootNote} scaleType={scaleType} />
        <div className="text-center mb-4">
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
        <div className="text-sm text-muted-foreground text-center mt-8">
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
