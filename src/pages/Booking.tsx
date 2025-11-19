import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapInterface } from "@/components/booking/MapInterface";
import { TierSelection } from "@/components/booking/TierSelection";
import { FareDisplay } from "@/components/booking/FareDisplay";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export type LatLng = [number, number];
export type TierType = "standard" | "premium";

const Booking = () => {
  const navigate = useNavigate();
  const [startPoint, setStartPoint] = useState<LatLng | null>(null);
  const [endPoint, setEndPoint] = useState<LatLng | null>(null);
  const [selectedTier, setSelectedTier] = useState<TierType | null>(null);
  const [distance, setDistance] = useState<number>(0);
  const [isBooking, setIsBooking] = useState(false);

  const calculateDistance = (start: LatLng, end: LatLng): number => {
    const R = 6371; // Earth's radius in km
    const dLat = ((end[0] - start[0]) * Math.PI) / 180;
    const dLon = ((end[1] - start[1]) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((start[0] * Math.PI) / 180) *
        Math.cos((end[0] * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleStartPointChange = (point: LatLng) => {
    setStartPoint(point);
    if (endPoint) {
      const dist = calculateDistance(point, endPoint);
      setDistance(dist);
    }
  };

  const handleEndPointChange = (point: LatLng) => {
    setEndPoint(point);
    if (startPoint) {
      const dist = calculateDistance(startPoint, point);
      setDistance(dist);
    }
  };

  const calculateFare = (): number => {
    if (!selectedTier || distance === 0) return 0;
    const baseRatePerKm = selectedTier === "standard" ? 50 : 80;
    const fixedFee = 100;
    return distance * baseRatePerKm + fixedFee;
  };

  const handleBooking = async () => {
    if (!startPoint || !endPoint || !selectedTier) {
      toast.error("Please complete all booking details");
      return;
    }

    setIsBooking(true);
    try {
      const fare = calculateFare();
      const { data, error } = await supabase
        .from("bookings")
        .insert({
          start_lat: startPoint[0],
          start_lng: startPoint[1],
          end_lat: endPoint[0],
          end_lng: endPoint[1],
          distance_km: distance,
          tier: selectedTier,
          fare_amount: fare,
          status: "confirmed",
        })
        .select()
        .single();

      if (error) throw error;

      toast.success("Booking confirmed!");
      navigate(`/status/${data.id}`);
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to create booking. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  const canShowTiers = startPoint && endPoint && distance > 0;
  const canBook = canShowTiers && selectedTier;

  return (
    <div className="min-h-screen bg-gradient-sky">
      <div className="container mx-auto px-4 py-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">Book Your FlyTaxi</h1>
          <p className="text-muted-foreground">Select your route and tier to get started</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="order-2 lg:order-1">
            <MapInterface
              startPoint={startPoint}
              endPoint={endPoint}
              onStartPointChange={handleStartPointChange}
              onEndPointChange={handleEndPointChange}
            />
          </div>

          <div className="order-1 lg:order-2 space-y-6">
            {canShowTiers ? (
              <>
                <TierSelection
                  selectedTier={selectedTier}
                  onTierSelect={setSelectedTier}
                  distance={distance}
                />
                <FareDisplay
                  distance={distance}
                  tier={selectedTier}
                  fare={calculateFare()}
                />
                {canBook && (
                  <Button
                    onClick={handleBooking}
                    disabled={isBooking}
                    className="w-full h-14 text-lg bg-gradient-hero hover:opacity-90 shadow-flight"
                  >
                    {isBooking ? "Processing..." : "Confirm & Book"}
                  </Button>
                )}
              </>
            ) : (
              <div className="bg-card rounded-xl p-8 shadow-card text-center">
                <p className="text-muted-foreground">
                  Select your pickup and destination points on the map to view available tiers and pricing
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
