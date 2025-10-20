import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const VALID_KEY = "Lifetime-4fK9qZdefgf3R";

const Login = () => {
  const [key, setKey] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (key === VALID_KEY) {
      localStorage.setItem("auth_key", VALID_KEY);
      toast.success("Access granted");
      navigate("/");
    } else {
      toast.error("Invalid key");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 scanline">
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-md">
        <div className="border border-primary/30 bg-card/50 backdrop-blur-sm glow-cyan p-8">
          <h1 className="text-3xl font-bold text-primary text-glow-cyan mb-2">
            INDE<span className="text-secondary">VICES</span>
          </h1>
          <div className="h-1 w-40 bg-gradient-to-r from-primary via-secondary to-accent animate-pulse-glow mb-8"></div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-primary font-bold mb-2 block">ENTER YOUR KEY</label>
              <Input
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Lifetime-XXXXXXXXXXXX"
                className="bg-input border-primary/30 text-foreground font-mono focus:border-primary focus:glow-cyan transition-all"
              />
            </div>
            
            <Button
              onClick={handleLogin}
              className="w-full bg-primary/20 border border-primary text-primary hover:bg-primary hover:text-background transition-all glow-cyan"
            >
              ACCESS SYSTEM
            </Button>
          </div>

          <div className="mt-8 text-xs text-muted-foreground text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse-glow"></div>
              <span>SECURE CONNECTION</span>
            </div>
            <div>v3.1.7-NEXUS</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
