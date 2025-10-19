import { useState, useEffect } from "react";
import { Search, ArrowUpDown, RefreshCw } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface Pet {
  id: number;
  mutation: string;
  rarity: "common" | "gold" | "rainbow" | "legendary";
  petName: string;
  generation: string;
  player: string;
  time: string;
}

const mockPets: Pet[] = [
  { id: 1, mutation: "", rarity: "common", petName: "Las Sis", generation: "$17.5M/s", player: "Player_42", time: "06:24:40" },
  { id: 2, mutation: "", rarity: "gold", petName: "Tralalita Tralala", generation: "21m", player: "CyberHunter", time: "06:12:54" },
  { id: 3, mutation: "", rarity: "rainbow", petName: "Strawberry Elephant", generation: "$9.7B/s", player: "NeonDreamer", time: "06:44:24" },
  { id: 4, mutation: "", rarity: "legendary", petName: "Cosmic Dragon", generation: "$127B/s", player: "QuantumX", time: "06:50:12" },
  { id: 5, mutation: "", rarity: "rainbow", petName: "Lotus Phoenix", generation: "$8.2B/s", player: "VoidWalker", time: "06:38:15" },
  { id: 6, mutation: "", rarity: "gold", petName: "Crystal Wolf", generation: "45m", player: "StarCoder", time: "06:55:33" },
  { id: 7, mutation: "", rarity: "common", petName: "Shadow Cat", generation: "$12.3M/s", player: "GlitchMaster", time: "07:01:22" },
  { id: 8, mutation: "", rarity: "legendary", petName: "Void Serpent", generation: "$215B/s", player: "NeonKnight", time: "07:05:44" },
];

export const PetTable = () => {
  const [pets, setPets] = useState<Pet[]>(mockPets);
  const [filteredPets, setFilteredPets] = useState<Pet[]>(mockPets);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<keyof Pet | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      // Simulate new pets appearing
      const rarities: Array<"common" | "gold" | "rainbow" | "legendary"> = ["common", "gold", "rainbow", "legendary"];
      const names = ["Nova Beast", "Cyber Hawk", "Digital Unicorn", "Pixel Dragon", "Neon Tiger"];
      const newPet: Pet = {
        id: Date.now(),
        mutation: "",
        rarity: rarities[Math.floor(Math.random() * rarities.length)],
        petName: names[Math.floor(Math.random() * names.length)],
        generation: `$${(Math.random() * 100).toFixed(1)}${Math.random() > 0.5 ? "B" : "M"}/s`,
        player: "NewPlayer",
        time: new Date().toLocaleTimeString("en-US", { hour12: false }),
      };
      setPets((prev) => [newPet, ...prev.slice(0, 9)]);
    }, 20000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  useEffect(() => {
    let filtered = pets;

    // Filter by rarity
    if (activeFilter !== "ALL") {
      filtered = filtered.filter((pet) => pet.rarity === activeFilter.toLowerCase());
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((pet) =>
        pet.petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.player.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        if (sortDirection === "asc") {
          return aVal > bVal ? 1 : -1;
        }
        return aVal < bVal ? 1 : -1;
      });
    }

    setFilteredPets(filtered);
  }, [pets, activeFilter, searchQuery, sortField, sortDirection]);

  const handleSort = (field: keyof Pet) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "text-neon-red";
      case "gold":
        return "text-neon-yellow";
      case "rainbow":
        return "text-neon-magenta";
      default:
        return "text-foreground";
    }
  };

  const getRarityTag = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "[LEGENDARY]";
      case "gold":
        return "[Gold]";
      case "rainbow":
        return "[Rainbow]";
      default:
        return "";
    }
  };

  return (
    <div className="flex-1 flex flex-col border border-primary/30 bg-card/50 backdrop-blur-sm glow-cyan">
      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-primary/30 bg-card/30">
        <div className="flex">
          {["ALL", "legendary", "rainbow", "gold", "common"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 text-sm font-bold transition-all uppercase ${
                activeFilter === filter
                  ? "bg-primary/20 text-primary border-b-2 border-primary text-glow-cyan"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-2 px-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="pl-8 w-48 h-8 bg-input border-primary/30 text-foreground text-xs font-mono focus:border-primary focus:glow-cyan transition-all"
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`h-8 ${autoRefresh ? "text-accent" : "text-muted-foreground"}`}
          >
            <RefreshCw className={`w-4 h-4 ${autoRefresh ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[120px_1fr_140px_120px_100px] gap-4 px-4 py-3 border-b border-primary/20 bg-card/30">
        <button onClick={() => handleSort("mutation")} className="text-primary font-bold text-sm text-left hover:text-glow-cyan transition-all flex items-center gap-1">
          Mutation <ArrowUpDown className="w-3 h-3" />
        </button>
        <button onClick={() => handleSort("petName")} className="text-primary font-bold text-sm text-left hover:text-glow-cyan transition-all flex items-center gap-1">
          Pet Name <ArrowUpDown className="w-3 h-3" />
        </button>
        <button onClick={() => handleSort("generation")} className="text-primary font-bold text-sm text-left hover:text-glow-cyan transition-all flex items-center gap-1">
          Generation <ArrowUpDown className="w-3 h-3" />
        </button>
        <button onClick={() => handleSort("player")} className="text-primary font-bold text-sm text-left hover:text-glow-cyan transition-all flex items-center gap-1">
          Player <ArrowUpDown className="w-3 h-3" />
        </button>
        <button onClick={() => handleSort("time")} className="text-primary font-bold text-sm text-left hover:text-glow-cyan transition-all flex items-center gap-1">
          Time <ArrowUpDown className="w-3 h-3" />
        </button>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-auto">
        {filteredPets.map((pet) => (
          <div
            key={pet.id}
            className={`grid grid-cols-[120px_1fr_140px_120px_100px] gap-4 px-4 py-3 border-b border-primary/10 hover:bg-primary/5 transition-all ${getRarityColor(
              pet.rarity
            )} group`}
          >
            <div className="font-bold group-hover:text-glow-cyan transition-all">
              {getRarityTag(pet.rarity)}
            </div>
            <div className="group-hover:text-glow-cyan transition-all">{pet.petName}</div>
            <div className="font-bold">{pet.generation}</div>
            <div className="text-sm">{pet.player}</div>
            <div className="text-muted-foreground text-sm">{pet.time}</div>
          </div>
        ))}
        {filteredPets.length === 0 && (
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            No pets found matching criteria
          </div>
        )}
      </div>

      {/* Scrollbar Indicator */}
      <div className="h-4 border-t border-primary/20 bg-card/30 flex items-center justify-between px-4">
        <span className="text-xs text-muted-foreground">
          Showing {filteredPets.length} of {pets.length} pets
        </span>
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow"></div>
      </div>
    </div>
  );
};
