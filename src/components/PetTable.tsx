import { useState, useEffect } from "react";
import { Search, ArrowUpDown, RefreshCw } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMode } from "../contexts/ModeContext";

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
  { name: "Strawberry Elephant", value: 350, spawnChance: 1 },
  { name: "Dragon Cannelloni", value: 250, spawnChance: 1.5 },
  { name: "Burguro & Fryuro", value: 150, spawnChance: 2 },
  { name: "La Secret Combinasion", value: 125, spawnChance: 2.5 },
  { name: "Spooky & Pumpky", value: 80, spawnChance: 4 },
  { name: "Spaghetti Tualetti", value: 60, spawnChance: 5 },
  { name: "Garama & Madundung", value: 50, spawnChance: 6 },
  { name: "Ketchuru & Musturu", value: 42.5, spawnChance: 7 },
  { name: "La Supreme Combinasion", value: 40, spawnChance: 8 },
  { name: "Tictac Sahur", value: 37.5, spawnChance: 9 },
  { name: "Ketupat Kepat", value: 35, spawnChance: 10 },
  { name: "Tang Tang Keletang", value: 33.5, spawnChance: 11 },
  { name: "Los Tacoritas", value: 32, spawnChance: 12 },
  { name: "Eviledon", value: 31.5, spawnChance: 13 },
  { name: "Los Primos", value: 31, spawnChance: 14 },
  { name: "Esok Sekolah", value: 30, spawnChance: 15 },
  { name: "Tralaledon", value: 27.5, spawnChance: 16 },
  { name: "Chillin Chili", value: 25, spawnChance: 17 },
  { name: "La Spooky Grande", value: 24.5, spawnChance: 18 },
  { name: "Los Bros", value: 24, spawnChance: 19 },
  { name: "La Extinct Grande", value: 23.5, spawnChance: 20 },
  { name: "Las Sis", value: 17.5, spawnChance: 25 },
  { name: "Tacorita Bicicleta", value: 16.5, spawnChance: 27 },
  { name: "Nuclearo Dinossauro", value: 15, spawnChance: 30 },
  { name: "Mariachi Corazoni", value: 12.5, spawnChance: 35 },
  { name: "La Grande Combinasion", value: 10, spawnChance: 40 },
  { name: "Chicleteira Bicicleteira", value: 3.5, spawnChance: 60 },
  { name: "Quesadilla Crocodila", value: 3, spawnChance: 65 },
  { name: "Pot Hotspot", value: 2.5, spawnChance: 70 },
  { name: "To to to Sahur", value: 2.2, spawnChance: 73 },
  { name: "Vulturino Skeletono", value: 1, spawnChance: 90 },
  { name: "Perrito Burrito", value: 1, spawnChance: 85 },
  { name: "Graipuss Medussi", value: 1, spawnChance: 85 },
];

const generateRarity = (baseChance: number): "common" | "gold" | "rainbow" => {
  const rainbowChance = 2;
  const goldChance = 5;
  
  const rand = Math.random() * 100;
  if (rand < rainbowChance) return "rainbow";
  if (rand < rainbowChance + goldChance) return "gold";
  return "common";
};

const selectWeightedPet = () => {
  const totalWeight = brainrotData.reduce((sum, pet) => sum + pet.spawnChance, 0);
  let random = Math.random() * totalWeight;
  
  for (const pet of brainrotData) {
    random -= pet.spawnChance;
    if (random <= 0) return pet;
  }
  return brainrotData[brainrotData.length - 1];
};

const generateMockPets = (): Pet[] => {
  const players = ["xX_Pro_Xx", "CyberHunter", "NeonDreamer", "QuantumX", "VoidWalker", "StarCoder", "GlitchMaster", "NeonKnight"];
  
  return Array.from({ length: 8 }, (_, index) => {
    const brainrot = selectWeightedPet();
    return {
      id: Date.now() + index,
      mutation: "",
      rarity: generateRarity(brainrot.spawnChance),
      petName: brainrot.name,
      generation: `${brainrot.value}M/s`,
      generationValue: brainrot.value,
      player: players[Math.floor(Math.random() * players.length)],
      time: new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString("en-US", { hour12: false }),
    };
  });
};

const mockPets: Pet[] = generateMockPets();

export const PetTable = () => {
  const { isRealMode } = useMode();
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
      
      // Filter pets based on real mode
      const availablePets = isRealMode 
        ? brainrotData.filter(pet => pet.value >= 200)
        : brainrotData;
      
      if (availablePets.length === 0) return;
      
      const totalWeight = availablePets.reduce((sum, pet) => sum + pet.spawnChance, 0);
      let random = Math.random() * totalWeight;
      
      let randomBrainrot = availablePets[availablePets.length - 1];
      for (const pet of availablePets) {
        random -= pet.spawnChance;
        if (random <= 0) {
          randomBrainrot = pet;
          break;
        }
      }
      
      const newPet: Pet = {
        id: Date.now(),
        mutation: "",
        rarity: generateRarity(randomBrainrot.spawnChance),
        petName: randomBrainrot.name,
        generation: `${randomBrainrot.value}M/s`,
        generationValue: randomBrainrot.value,
        player: players[Math.floor(Math.random() * players.length)],
        time: new Date().toLocaleTimeString("en-US", { hour12: false }),
      };
      setPets((prev) => [newPet, ...prev.slice(0, 19)]);
      
      // Real mode: 90% faster (0.5-2s), Normal: 5-20s
      const intervalTime = isRealMode
        ? Math.random() * 1500 + 500    // 0.5-2 seconds
        : Math.random() * 15000 + 5000; // 5-20 seconds
      
      setTimeout(spawnNewPet, intervalTime);
    };
    
    const timer = setTimeout(spawnNewPet, isRealMode ? 1000 : 10000);
    return () => clearTimeout(timer);
  }, [autoRefresh, isRealMode]);

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
            <a 
              href="https://chillihub1.github.io/chillihub-joiner/?placeId=109983668079237&gameInstanceId=14314425-0cd5-43e2-bfe7-d5f2fc37655c"
              target="_blank"
              rel="noopener noreferrer"
              className="group-hover:text-glow-cyan transition-all hover:underline cursor-pointer"
            >
              {pet.petName}
            </a>
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
