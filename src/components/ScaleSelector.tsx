import React from "react";
import { cn } from "@/lib/utils";
import {
  Note,
  ScaleType,
  allNotes,
  scaleCategories,
  scaleNames,
  formatNote,
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
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="glass p-6 rounded-xl">
        <div className="space-y-6">
          {/* Root Note Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Key
            </label>
            <div className="flex flex-wrap gap-2 justify-between">
              {allNotes.map((note) => (
                <button
                  key={note}
                  onClick={() => onRootChange(note)}
                  className={cn(
                    "selector-chip",
                    selectedRoot === note && "active"
                  )}
                >
                  {formatNote(note)}
                </button>
              ))}
            </div>
          </div>

          {/* Scale Type Selector */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-muted-foreground">
              Scale Type
            </label>

            {/* Basic Scales */}
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground">Common Scales</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {scaleCategories.basic.map((scale) => (
                  <button
                    key={scale}
                    onClick={() => onScaleChange(scale)}
                    className={cn(
                      "selector-chip",
                      selectedScale === scale && "active"
                    )}
                  >
                    {scaleNames[scale]}
                  </button>
                ))}
              </div>
            </div>

            {/* Jazz Scales */}
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground">
                Jazz / Blues Scales
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {scaleCategories.jazz.map((scale) => (
                  <button
                    key={scale}
                    onClick={() => onScaleChange(scale)}
                    className={cn(
                      "selector-chip",
                      selectedScale === scale && "active"
                    )}
                  >
                    {scaleNames[scale]}
                  </button>
                ))}
                {scaleCategories.other.map((scale) => (
                  <button
                    key={scale}
                    onClick={() => onScaleChange(scale)}
                    className={cn(
                      "selector-chip",
                      selectedScale === scale && "active"
                    )}
                  >
                    {scaleNames[scale]}
                  </button>
                ))}
              </div>
            </div>

            {/* Modes */}
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground">Modes</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {scaleCategories.modes.map((scale) => (
                  <button
                    key={scale}
                    onClick={() => onScaleChange(scale)}
                    className={cn(
                      "selector-chip",
                      selectedScale === scale && "active"
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
