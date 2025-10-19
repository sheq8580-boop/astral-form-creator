import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";

interface LogEntry {
  id: number;
  timestamp: string;
  message: string;
}

const mockLogs: LogEntry[] = [
  {
    id: 1,
    timestamp: "06:44:21",
    message: "AUTO-JOIN TRIGGERED: Pet over min-gen: [Rainbow] Strawberry Elephant",
  },
  {
    id: 2,
    timestamp: "06:29:12",
    message: "AUTO-JOIN TRIGGERED: Pet over min-gen: [Rainbow] Lotus Dragon",
  },
];

export const LogConsole = () => {
  const [logs, setLogs] = useState<LogEntry[]>(mockLogs);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    // Simulate new logs appearing
    const interval = setInterval(() => {
      const newLog: LogEntry = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
        message: `SYSTEM: Monitoring active pets... Status: OK`,
      };
      setLogs((prev) => [...prev.slice(-5), newLog]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border border-accent/30 bg-card/50 backdrop-blur-sm glow-green">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-2 px-4 py-2 border-b border-accent/20 hover:bg-accent/5 transition-all"
      >
        <ChevronRight
          className={`w-4 h-4 text-accent transition-transform ${
            isExpanded ? "rotate-90" : ""
          }`}
        />
        <span className="text-accent font-bold text-sm">Log Console</span>
      </button>

      {/* Logs */}
      {isExpanded && (
        <div className="p-4 space-y-1 max-h-40 overflow-auto font-mono text-xs">
          {logs.map((log) => (
            <div key={log.id} className="text-accent animate-fade-in">
              <span className="text-accent/70">[{log.timestamp}]</span>{" "}
              <span className="text-glow-green">{log.message}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
