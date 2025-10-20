import { useState, useEffect } from "react";
import { Activity, TrendingUp, Zap, Users } from "lucide-react";

interface Stat {
  label: string;
  value: string;
  icon: typeof Activity;
  color: string;
  glowClass: string;
}

export const StatsPanel = () => {
  const [stats, setStats] = useState<Stat[]>([
    {
      label: "Active Scans",
      value: "247",
      icon: Activity,
      color: "text-primary",
      glowClass: "glow-cyan",
    },
    {
      label: "Server Tracking",
      value: String(Math.floor(Math.random() * (6000 - 5000 + 1)) + 5000),
      icon: TrendingUp,
      color: "text-accent",
      glowClass: "glow-green",
    },
    {
      label: "Rainbow Pets",
      value: "12",
      icon: Zap,
      color: "text-secondary",
      glowClass: "glow-magenta",
    },
    {
      label: "Online Users",
      value: String(Math.floor(Math.random() * (1850 - 1800 + 1)) + 1800),
      icon: Users,
      color: "text-neon-yellow",
      glowClass: "border-neon-yellow/30",
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) =>
        prev.map((stat) => {
          if (stat.label === "Active Scans") {
            return { ...stat, value: String(Math.floor(Math.random() * 300 + 200)) };
          }
          if (stat.label === "Server Tracking") {
            const currentValue = parseInt(stat.value.replace(/,/g, ''));
            const change = Math.floor(Math.random() * 21) - 10; // -10 to +10
            const newValue = Math.max(5000, Math.min(6000, currentValue + change));
            return { ...stat, value: String(newValue) };
          }
          if (stat.label === "Online Users") {
            const currentValue = parseInt(stat.value.replace(/,/g, ''));
            const change = Math.floor(Math.random() * 11) - 5; // -5 to +5
            const newValue = Math.max(1800, Math.min(1850, currentValue + change));
            return { ...stat, value: String(newValue.toLocaleString()) };
          }
          return stat;
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={`border border-${stat.color.split('-')[1]}/30 bg-card/50 backdrop-blur-sm p-4 ${stat.glowClass} hover:scale-105 transition-transform`}
          >
            <div className="flex items-center justify-between mb-2">
              <Icon className={`w-5 h-5 ${stat.color}`} />
              <div className="w-2 h-2 bg-current rounded-full animate-pulse-glow" style={{ color: `var(--neon-${stat.color.split('-')[1]})` }}></div>
            </div>
            <div className={`text-2xl font-bold ${stat.color} mb-1`}>
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
};
