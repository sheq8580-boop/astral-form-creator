import { useState, useEffect } from "react";
import { Search, ArrowUpDown, RefreshCw } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface Pet {
  id: number;
  mutation: string;
  rarity: "common" | "gold" | "rainbow";
  petName: string;
  generation: string;
  generationValue: number; // numeric value for filtering
  player: string;
  time: string;
}

const brainrotData = [
  { name: "Strawberry Elephant", value: 350, baseChance: 1 },
  { name: "Dragon Cannelloni", value: 250, baseChance: 1.2 },
  { name: "Burguro & Fryuro", value: 150, baseChance: 1.5 },
  { name: "La Secret Combinasion", value: 125, baseChance: 2 },
  { name: "Spooky & Pumpky", value: 80, baseChance: 3 },
  { name: "Spaghetti Tualetti", value: 60, baseChance: 4 },
  { name: "Garama & Madundung", value: 50, baseChance: 5 },
  { name: "Ketchuru & Musturu", value: 42.5, baseChance: 6 },
  { name: "La Supreme Combinasion", value: 40, baseChance: 7 },
  { name: "Tictac Sahur", value: 37.5, baseChance: 8 },
  { name: "Ketupat Kepat", value: 35, baseChance: 9 },
  { name: "Tang Tang Keletang", value: 33.5, baseChance: 10 },
  { name: "Los Tacoritas", value: 32, baseChance: 11 },
  { name: "Eviledon", value: 31.5, baseChance: 12 },
  { name: "Los Primos", value: 31, baseChance: 13 },
  { name: "Esok Sekolah", value: 30, baseChance: 14 },
  { name: "Tralaledon", value: 27.5, baseChance: 15 },
  { name: "Chillin Chili", value: 25, baseChance: 16 },
  { name: "La Spooky Grande", value: 24.5, baseChance: 17 },
  { name: "Los Bros", value: 24, baseChance: 18 },
  { name: "La Extinct Grande", value: 23.5, baseChance: 19 },
  { name: "Las Sis", value: 17.5, baseChance: 25 },
  { name: "Tacorita Bicicleta", value: 16.5, baseChance: 27 },
  { name: "Nuclearo Dinossauro", value: 15, baseChance: 30 },
  { name: "Mariachi Corazoni", value: 12.5, baseChance: 35 },
  { name: "La Grande Combinasion", value: 10, baseChance: 40 },
  { name: "Chicleteira Bicicleteira", value: 3.5, baseChance: 60 },
  { name: "Quesadilla Crocodila", value: 3, baseChance: 65 },
  { name: "Pot Hotspot", value: 2.5, baseChance: 70 },
  { name: "To to to Sahur", value: 2.2, baseChance: 73 },
  { name: "Perrito Burrito", value: 1, baseChance: 85 },
  { name: "Graipuss Medussi", value: 1, baseChance: 85 },
];

const generateRarity = (baseChance: number): "common" | "gold" | "rainbow" => {
  const rainbowChance = 2;
  const goldChance = 5;
  
  const rand = Math.random() * 100;
  if (rand < rainbowChance) return "rainbow";
  if (rand < rainbowChance + goldChance) return "gold";
  return "common";
};

const generateMockPets = (): Pet[] => {
  const players = ["xX_Pro_Xx", "CyberHunter", "NeonDreamer", "QuantumX", "VoidWalker", "StarCoder", "GlitchMaster", "NeonKnight", "ShadowRunner", "PixelMaster"];
  
  return brainrotData.slice(0, 8).map((brainrot, index) => ({
    id: Date.now() + index,
    mutation: "",
    rarity: generateRarity(brainrot.baseChance),
    petName: brainrot.name,
    generation: `${brainrot.value}M/s`,
    generationValue: brainrot.value,
    player: players[Math.floor(Math.random() * players.length)],
    time: new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString("en-US", { hour12: false }),
  }));
};

const mockPets: Pet[] = generateMockPets();

export const PetTable = () => {
  const [pets, setPets] = useState<Pet[]>(mockPets);
  const [filteredPets, setFilteredPets] = useState<Pet[]>(mockPets);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [minGeneration, setMinGeneration] = useState("");
  const [sortField, setSortField] = useState<keyof Pet | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (!autoRefresh) return;
    
    const spawnNewPet = () => {
      const players = ["xX_Pro_Xx", "CyberHunter", "NeonDreamer", "QuantumX", "VoidWalker", "StarCoder", "GlitchMaster", "NeonKnight"];
      const randomBrainrot = brainrotData[Math.floor(Math.random() * brainrotData.length)];
      
      const newPet: Pet = {
        id: Date.now(),
        mutation: "",
        rarity: generateRarity(randomBrainrot.baseChance),
        petName: randomBrainrot.name,
        generation: `${randomBrainrot.value}M/s`,
        generationValue: randomBrainrot.value,
        player: players[Math.floor(Math.random() * players.length)],
        time: new Date().toLocaleTimeString("en-US", { hour12: false }),
      };
      setPets((prev) => [newPet, ...prev.slice(0, 49)]);
      
      // Random interval for next spawn
      const intervals = [500, 1000, 2000];
      const nextInterval = intervals[Math.floor(Math.random() * intervals.length)];
      setTimeout(spawnNewPet, nextInterval);
    };
    
    const timer = setTimeout(spawnNewPet, 2000);
    return () => clearTimeout(timer);
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
        pet.petName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Minimum generation filter
    if (minGeneration) {
      const minValue = parseFloat(minGeneration);
      if (!isNaN(minValue)) {
        filtered = filtered.filter((pet) => pet.generationValue >= minValue);
      }
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
  }, [pets, activeFilter, searchQuery, minGeneration, sortField, sortDirection]);

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
      case "gold":
        return "[Gold]";
      case "rainbow":
        return "[Rainbow]";
      default:
        return "[common]";
    }
  };

  return (
    <div className="flex-1 flex flex-col border border-primary/30 bg-card/50 backdrop-blur-sm glow-cyan">
      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-primary/30 bg-card/30">
        <div className="flex">
          {["ALL", "rainbow", "gold", "common"].map((filter) => (
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
              className="pl-8 w-32 h-8 bg-input border-primary/30 text-foreground text-xs font-mono focus:border-primary focus:glow-cyan transition-all"
            />
          </div>
          <div className="relative">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-primary font-bold">+</span>
            <Input
              value={minGeneration}
              onChange={(e) => setMinGeneration(e.target.value)}
              placeholder="Min M/s"
              className="pl-6 w-24 h-8 bg-input border-primary/30 text-foreground text-xs font-mono focus:border-primary focus:glow-cyan transition-all"
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
      <div className="grid grid-cols-[120px_1fr_140px_100px] gap-4 px-4 py-3 border-b border-primary/20 bg-card/30">
        <button onClick={() => handleSort("mutation")} className="text-primary font-bold text-sm text-left hover:text-glow-cyan transition-all flex items-center gap-1">
          Mutation <ArrowUpDown className="w-3 h-3" />
        </button>
        <button onClick={() => handleSort("petName")} className="text-primary font-bold text-sm text-left hover:text-glow-cyan transition-all flex items-center gap-1">
          Pet Name <ArrowUpDown className="w-3 h-3" />
        </button>
        <button onClick={() => handleSort("generation")} className="text-primary font-bold text-sm text-left hover:text-glow-cyan transition-all flex items-center gap-1">
          Generation <ArrowUpDown className="w-3 h-3" />
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
            className={`grid grid-cols-[120px_1fr_140px_100px] gap-4 px-4 py-3 border-b border-primary/10 hover:bg-primary/5 transition-all ${getRarityColor(
              pet.rarity
            )} group`}
          >
            <div className="font-bold group-hover:text-glow-cyan transition-all">
              {getRarityTag(pet.rarity)}
            </div>
            <div className="group-hover:text-glow-cyan transition-all">{pet.petName}</div>
            <div className="font-bold">{pet.generation}</div>
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
