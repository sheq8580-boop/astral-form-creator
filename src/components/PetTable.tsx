import { useState, useEffect } from "react";

interface Pet {
  id: number;
  mutation: string;
  rarity: "common" | "gold" | "rainbow";
  petName: string;
  generation: string;
  player: string;
  time: string;
}

const mockPets: Pet[] = [
  {
    id: 1,
    mutation: "",
    rarity: "common",
    petName: "Las Sis",
    generation: "$17.5M/s",
    player: "?",
    time: "06:24:40",
  },
  {
    id: 2,
    mutation: "",
    rarity: "gold",
    petName: "Tralalita Tralala",
    generation: "21m",
    player: "?",
    time: "06:12:54",
  },
  {
    id: 3,
    mutation: "",
    rarity: "rainbow",
    petName: "Strawberry Elephant",
    generation: "$9.7B/s",
    player: "?",
    time: "06:44:24",
  },
];

export const PetTable = () => {
  const [pets] = useState<Pet[]>(mockPets);
  const [activeFilter, setActiveFilter] = useState("1M - 10M");

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
        return "";
    }
  };

  return (
    <div className="flex-1 flex flex-col border border-primary/30 bg-card/50 backdrop-blur-sm glow-cyan">
      {/* Filter Tabs */}
      <div className="flex border-b border-primary/30">
        {["1M - 10M", "10M+"].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-2 text-sm font-bold transition-all ${
              activeFilter === filter
                ? "bg-primary/20 text-primary border-b-2 border-primary text-glow-cyan"
                : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[120px_1fr_140px_100px_100px] gap-4 px-4 py-3 border-b border-primary/20 bg-card/30">
        <div className="text-primary font-bold text-sm">Mutation</div>
        <div className="text-primary font-bold text-sm">Pet Name</div>
        <div className="text-primary font-bold text-sm">Generation</div>
        <div className="text-primary font-bold text-sm">Player</div>
        <div className="text-primary font-bold text-sm">Time</div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-auto">
        {pets.map((pet) => (
          <div
            key={pet.id}
            className={`grid grid-cols-[120px_1fr_140px_100px_100px] gap-4 px-4 py-3 border-b border-primary/10 hover:bg-primary/5 transition-all ${getRarityColor(
              pet.rarity
            )} group`}
          >
            <div className="font-bold group-hover:text-glow-cyan transition-all">
              {getRarityTag(pet.rarity)}
            </div>
            <div className="group-hover:text-glow-cyan transition-all">{pet.petName}</div>
            <div className="font-bold">{pet.generation}</div>
            <div>{pet.player}</div>
            <div className="text-muted-foreground">{pet.time}</div>
          </div>
        ))}
      </div>

      {/* Scrollbar Indicator */}
      <div className="h-4 border-t border-primary/20 bg-card/30 flex items-center justify-end px-2">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow"></div>
      </div>
    </div>
  );
};
