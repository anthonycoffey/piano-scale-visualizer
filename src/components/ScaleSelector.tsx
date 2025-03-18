import React from "react";
import { cn } from "@/lib/utils";
import {
  Note,
  ScaleType,
  allNotes,
  scaleCategories,
  scaleNames,
  displayNote,
} from "@/utils/scales";

interface ScaleSelectorProps {
  selectedRoot: Note;
  selectedScale: ScaleType;
  onRootChange: (root: Note) => void;
  onScaleChange: (scale: ScaleType) => void;
}

const ScaleSelector: React.FC<ScaleSelectorProps> = ({
  selectedRoot,
  selectedScale,
  onRootChange,
  onScaleChange,
}) => {
  // Group all scales into just two categories
  const scales = [
    ...scaleCategories.basic,
    ...scaleCategories.jazz,
    ...scaleCategories.other,
  ];
  const modes = scaleCategories.modes;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="glass p-4 rounded-xl">
        {/* Key Selector with Black/White Coloring */}
        <div className="mb-6">
          <label className="block uppercase tracking-wide mb-2 text-muted-foreground font-medium">
            Select Key
          </label>

          <div className="flex flex-wrap justify-between gap-2">
            {allNotes.map((note) => {
              // Determine if note is sharp/flat
              const isSharp = note.includes("#");

              return (
                <button
                  key={note}
                  onClick={() => onRootChange(note)}
                  className={cn(
                    "h-12 w-12 rounded-md flex items-center justify-center transition-colors",
                    isSharp
                      ? selectedRoot === note
                        ? "bg-primary text-white"
                        : "bg-gray-800 text-white hover:bg-gray-700"
                      : selectedRoot === note
                      ? "bg-primary text-white"
                      : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100",
                    "font-medium"
                  )}
                >
                  {displayNote(note)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Simplified Scale Type Selector - Just 2 groups */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Scales */}
            <div className="p-3 bg-secondary/30 rounded-lg">
              <h3 className="uppercase tracking-wide mb-2 font-medium text-muted-foreground">
                Scales
              </h3>
              <div className="flex flex-wrap gap-2">
                {scales.map((scale) => (
                  <button
                    key={scale}
                    onClick={() => onScaleChange(scale)}
                    className={cn(
                      "px-3 py-1.5 text-sm rounded-md transition-colors",
                      selectedScale === scale
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary/50 hover:bg-secondary"
                    )}
                  >
                    {scaleNames[scale]}
                  </button>
                ))}
              </div>
            </div>

            {/* Modes */}
            <div className="p-3 bg-secondary/30 rounded-lg">
              <h3 className="uppercase tracking-wide mb-2 text-muted-foreground font-medium">
                Modes
              </h3>
              <div className="flex flex-wrap gap-2">
                {modes.map((scale) => (
                  <button
                    key={scale}
                    onClick={() => onScaleChange(scale)}
                    className={cn(
                      "px-3 py-1.5 text-sm rounded-md transition-colors",
                      selectedScale === scale
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary/50 hover:bg-secondary"
                    )}
                  >
                    {scaleNames[scale]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScaleSelector;
