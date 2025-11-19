import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, Users, Zap, Crown } from "lucide-react";

type TierType = "standard" | "premium";

interface TierSelectionProps {
  selectedTier: TierType | null;
  onTierSelect: (tier: TierType) => void;
  distance: number;
}

export function TierSelection({ selectedTier, onTierSelect, distance }: TierSelectionProps) {
  const calculateEstimatedFare = (tier: TierType) => {
    const baseRatePerKm = tier === "standard" ? 50 : 80;
    const fixedFee = 100;
    return (distance * baseRatePerKm + fixedFee).toFixed(2);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Select Your Tier</h2>
      
      <Card
        className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-flight ${
          selectedTier === "standard"
            ? "ring-2 ring-primary shadow-flight bg-primary/5"
            : "hover:border-primary/50"
        }`}
        onClick={() => onTierSelect("standard")}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Plane className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Standard</h3>
              <p className="text-sm text-muted-foreground">Perfect for solo or duo travel</p>
            </div>
          </div>
          {selectedTier === "standard" && (
            <Badge className="bg-primary">Selected</Badge>
          )}
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-primary" />
            <span>2 Seats</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Zap className="w-4 h-4 text-primary" />
            <span>₹50 per km + ₹100 fixed fee</span>
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <p className="text-2xl font-bold text-primary">
            ₹{calculateEstimatedFare("standard")}
          </p>
          <p className="text-xs text-muted-foreground">Estimated fare for {distance.toFixed(2)} km</p>
        </div>
      </Card>

      <Card
        className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-premium ${
          selectedTier === "premium"
            ? "ring-2 ring-secondary shadow-premium bg-gradient-premium/5"
            : "hover:border-secondary/50"
        }`}
        onClick={() => onTierSelect("premium")}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-premium rounded-lg">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Premium</h3>
              <p className="text-sm text-muted-foreground">Spacious comfort for groups</p>
            </div>
          </div>
          {selectedTier === "premium" && (
            <Badge className="bg-secondary">Selected</Badge>
          )}
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-secondary" />
            <span>4 Seats</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Zap className="w-4 h-4 text-secondary" />
            <span>₹80 per km + ₹100 fixed fee</span>
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <p className="text-2xl font-bold text-secondary">
            ₹{calculateEstimatedFare("premium")}
          </p>
          <p className="text-xs text-muted-foreground">Estimated fare for {distance.toFixed(2)} km</p>
        </div>
      </Card>
    </div>
  );
}
