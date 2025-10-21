import { createContext, useContext, useState, ReactNode } from "react";

interface ModeContextType {
  isRealMode: boolean;
  setRealMode: (mode: boolean) => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const ModeProvider = ({ children }: { children: ReactNode }) => {
  const [isRealMode, setIsRealMode] = useState(false);

  const setRealMode = (mode: boolean) => {
    setIsRealMode(mode);
  };

  return (
    <ModeContext.Provider value={{ isRealMode, setRealMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  return context;
};
