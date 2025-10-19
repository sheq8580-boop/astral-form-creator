import { useState, useEffect } from "react";
import { Bell, X } from "lucide-react";
import { Button } from "./ui/button";

interface Notification {
  id: number;
  type: "info" | "warning" | "success";
  message: string;
  timestamp: string;
}

export const NotificationFeed = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "success",
      message: "Rainbow pet detected: Cosmic Dragon",
      timestamp: "06:44:21",
    },
    {
      id: 2,
      type: "warning",
      message: "High latency detected on server #3",
      timestamp: "06:42:15",
    },
  ]);

  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const types: Array<"info" | "warning" | "success"> = ["info", "warning", "success"];
      const messages = [
        "New rare pet found in sector 7",
        "Generation rate increased by 15%",
        "Scanner #5 offline - switching to backup",
        "Gold tier pet acquired",
        "System optimization complete",
      ];

      const newNotif: Notification = {
        id: Date.now(),
        type: types[Math.floor(Math.random() * types.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
      };

      setNotifications((prev) => [newNotif, ...prev.slice(0, 4)]);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "border-l-accent text-accent";
      case "warning":
        return "border-l-neon-yellow text-neon-yellow";
      default:
        return "border-l-primary text-primary";
    }
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="border border-secondary/30 bg-card/50 backdrop-blur-sm glow-magenta">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-2 px-4 py-2 border-b border-secondary/20 hover:bg-secondary/5 transition-all"
      >
        <Bell className="w-4 h-4 text-secondary" />
        <span className="text-secondary font-bold text-sm">Notifications</span>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{notifications.length}</span>
          <div className="w-2 h-2 bg-secondary rounded-full animate-pulse-glow"></div>
        </div>
      </button>

      {isExpanded && (
        <div className="max-h-60 overflow-auto">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`border-l-2 ${getTypeColor(notif.type)} p-3 border-b border-secondary/10 hover:bg-secondary/5 transition-all animate-fade-in group`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 space-y-1">
                  <div className="text-xs font-mono">{notif.message}</div>
                  <div className="text-xs text-muted-foreground">
                    [{notif.timestamp}]
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeNotification(notif.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
