import { PetTable } from "@/components/PetTable";
import { LogConsole } from "@/components/LogConsole";
import { ControlPanel } from "@/components/ControlPanel";
import { CommandTerminal } from "@/components/CommandTerminal";
import { StatsPanel } from "@/components/StatsPanel";
import { NotificationFeed } from "@/components/NotificationFeed";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-6 scanline">
      {/* Grid Background Effect */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>
      
      <div className="relative z-10 max-w-[1800px] mx-auto space-y-4">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-primary text-glow-cyan mb-2">
            INDE<span className="text-secondary">VICES</span>
          </h1>
          <div className="h-1 w-80 bg-gradient-to-r from-primary via-secondary to-accent animate-pulse-glow"></div>
        </header>

        {/* Stats Dashboard */}
        <StatsPanel />

        {/* Main Grid */}
        <div className="flex gap-4">
          {/* Left Column */}
          <div className="flex-1 space-y-4">
            <PetTable />
            <div className="grid grid-cols-2 gap-4">
              <LogConsole />
              <CommandTerminal />
            </div>
          </div>

          {/* Right Column */}
          <div className="w-80 space-y-4">
            <ControlPanel />
            <NotificationFeed />
          </div>
        </div>

        {/* Footer Status */}
        <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-primary/20 pt-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse-glow"></div>
              <span>SYSTEM ONLINE</span>
            </div>
            <div>CONNECTIONS: 247</div>
            <div>LATENCY: 12ms</div>
            <div>UPTIME: 99.7%</div>
          </div>
          <div className="text-primary/50">v3.1.7-NEXUS</div>
        </div>
      </div>
    </div>
  );
};

export default Index;
