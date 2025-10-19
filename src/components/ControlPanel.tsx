import { useState } from "react";
import { Plus, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const ControlPanel = () => {
  const [minGen, setMinGen] = useState("10M");
  const [minGenExpanded, setMinGenExpanded] = useState(true);
  const [hotkeysExpanded, setHotkeysExpanded] = useState(true);

  return (
    <div className="w-80 space-y-4">
      {/* Add Button */}
      <Button className="w-full bg-accent hover:bg-accent/80 text-accent-foreground font-bold py-6 text-lg glow-green border border-accent/50">
        <Plus className="w-6 h-6 mr-2" />
        [+]
      </Button>

      {/* Minimum Generation Section */}
      <div className="border border-primary/30 bg-card/50 backdrop-blur-sm glow-cyan">
        <button
          onClick={() => setMinGenExpanded(!minGenExpanded)}
          className="w-full flex items-center gap-2 px-4 py-3 border-b border-primary/20 hover:bg-primary/5 transition-all"
        >
          <ChevronRight
            className={`w-4 h-4 text-primary transition-transform ${
              minGenExpanded ? "rotate-90" : ""
            }`}
          />
          <span className="text-primary font-bold text-sm">Minimum Generation</span>
        </button>

        {minGenExpanded && (
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <label className="text-muted-foreground">Enable Min-Gen Join</label>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Min. Value:</label>
              <Input
                value={minGen}
                onChange={(e) => setMinGen(e.target.value)}
                className="bg-input border-primary/30 text-foreground font-mono focus:border-primary focus:glow-cyan transition-all"
              />
            </div>
          </div>
        )}
      </div>

      {/* Global Hotkeys Section */}
      <div className="border border-secondary/30 bg-card/50 backdrop-blur-sm glow-magenta">
        <button
          onClick={() => setHotkeysExpanded(!hotkeysExpanded)}
          className="w-full flex items-center gap-2 px-4 py-3 border-b border-secondary/20 hover:bg-secondary/5 transition-all"
        >
          <ChevronRight
            className={`w-4 h-4 text-secondary transition-transform ${
              hotkeysExpanded ? "rotate-90" : ""
            }`}
          />
          <span className="text-secondary font-bold text-sm">Global Hotkeys</span>
        </button>

        {hotkeysExpanded && (
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <label className="text-muted-foreground">Enable Global Hotkeys</label>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Start Search:</label>
              <Input
                placeholder="Press key..."
                className="bg-input border-secondary/30 text-foreground font-mono focus:border-secondary focus:glow-magenta transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Stop Search:</label>
              <Input
                placeholder="Press key..."
                className="bg-input border-secondary/30 text-foreground font-mono focus:border-secondary focus:glow-magenta transition-all"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
