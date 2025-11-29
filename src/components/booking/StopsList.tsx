import { LatLng } from "@/pages/Booking";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface StopsListProps {
  stops: LatLng[];
  onRemoveStop: (index: number) => void;
}

export default function StopsList({ stops, onRemoveStop }: StopsListProps) {
  if (stops.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg">Intermediate Stops</h3>
      <ul className="space-y-2">
        {stops.map((stop, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-muted p-2 rounded-md"
          >
            <span>
              Stop {index + 1}: {stop[0].toFixed(4)}, {stop[1].toFixed(4)}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveStop(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
