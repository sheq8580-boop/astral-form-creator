import { useState } from "react";
import { Terminal, Send } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface Command {
  id: number;
  input: string;
  output: string;
  timestamp: string;
}

export const CommandTerminal = () => {
  const [commands, setCommands] = useState<Command[]>([
    {
      id: 1,
      input: "status",
      output: "SYSTEM ONLINE | CONNECTIONS: 247 | LATENCY: 12ms",
      timestamp: "06:44:21",
    },
  ]);
  const [input, setInput] = useState("");

  const handleCommand = () => {
    if (!input.trim()) return;

    const timestamp = new Date().toLocaleTimeString("en-US", { hour12: false });
    let output = "";

    switch (input.toLowerCase().trim()) {
      case "help":
        output = "Available commands: help, status, clear, scan, filter [rarity]";
        break;
      case "status":
        output = `SYSTEM ONLINE | PETS TRACKED: ${Math.floor(Math.random() * 1000)} | ACTIVE SCANS: 3`;
        break;
      case "clear":
        setCommands([]);
        setInput("");
        return;
      case "scan":
        output = "Initiating deep scan... Found 12 new rare pets in the last hour";
        break;
      default:
        if (input.toLowerCase().startsWith("filter")) {
          output = `Filter applied: ${input.split(" ")[1] || "all"}`;
        } else {
          output = `Command not recognized: ${input}. Type 'help' for available commands.`;
        }
    }

    setCommands((prev) => [
      ...prev,
      { id: Date.now(), input, output, timestamp },
    ]);
    setInput("");
  };

  return (
    <div className="border border-primary/30 bg-card/50 backdrop-blur-sm glow-cyan">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-primary/20 bg-card/30">
        <Terminal className="w-4 h-4 text-primary" />
        <span className="text-primary font-bold text-sm">Command Terminal</span>
        <div className="ml-auto flex items-center gap-1">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse-glow"></div>
          <span className="text-xs text-muted-foreground">READY</span>
        </div>
      </div>

      <div className="p-4 space-y-2 max-h-48 overflow-auto font-mono text-xs">
        {commands.map((cmd) => (
          <div key={cmd.id} className="space-y-1 animate-fade-in">
            <div className="text-primary">
              <span className="text-primary/70">[{cmd.timestamp}]</span>{" "}
              <span className="text-neon-cyan">$</span> {cmd.input}
            </div>
            <div className="text-accent pl-4">{cmd.output}</div>
          </div>
        ))}
      </div>

      <div className="px-4 py-3 border-t border-primary/20 bg-card/30">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neon-cyan">
              $
            </span>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCommand()}
              placeholder="Type command..."
              className="pl-6 bg-input border-primary/30 text-foreground font-mono focus:border-primary focus:glow-cyan transition-all"
            />
          </div>
          <Button
            onClick={handleCommand}
            className="bg-primary hover:bg-primary/80 text-primary-foreground glow-cyan border border-primary/50"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
