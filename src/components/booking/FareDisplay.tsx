import { Card } from "@/components/ui/card";
import { IndianRupee, Route, Plane } from "lucide-react";

type TierType = "standard" | "premium" | null;

interface FareDisplayProps {
  distance: number;
  tier: TierType;
  fare: number;
}

export function FareDisplay({ distance, tier, fare }: FareDisplayProps) {
  if (!tier || fare === 0) return null;

  const baseRate = tier === "standard" ? 50 : 80;
  const fixedFee = 100;

  return (
    <Card className="p-6 bg-gradient-hero text-primary-foreground shadow-premium">
      <h3 className="text-lg font-semibold mb-4">Fare Breakdown</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-primary-foreground/20">
          <div className="flex items-center gap-2">
            <Route className="w-4 h-4" />
            <span>Distance</span>
          </div>
          <span className="font-semibold">{distance.toFixed(2)} km</span>
        </div>

        <div className="flex items-center justify-between pb-2 border-b border-primary-foreground/20">
          <div className="flex items-center gap-2">
            <Plane className="w-4 h-4" />
            <span>Tier Rate</span>
          </div>
          <span className="font-semibold">₹{baseRate}/km</span>
        </div>

        <div className="flex items-center justify-between pb-2 border-b border-primary-foreground/20">
          <div className="flex items-center gap-2">
            <IndianRupee className="w-4 h-4" />
            <span>Fixed Fee</span>
          </div>
          <span className="font-semibold">₹{fixedFee}</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <IndianRupee className="w-5 h-5" />
            <span className="text-lg font-bold">Total Fare</span>
          </div>
          <span className="text-2xl font-bold">₹{fare.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-4 p-3 bg-primary-foreground/10 rounded-lg">
        <p className="text-sm text-center">
          Estimated flight time: {(distance / 120 * 60).toFixed(0)} minutes
        </p>
      </div>
    </Card>
  );
}
