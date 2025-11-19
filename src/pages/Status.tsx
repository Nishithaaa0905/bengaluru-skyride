import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, MapPin, Clock, IndianRupee, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

type BookingStatus = "confirmed" | "arriving" | "in_flight" | "completed" | "cancelled";

interface Booking {
  id: string;
  start_lat: number;
  start_lng: number;
  end_lat: number;
  end_lng: number;
  distance_km: number;
  tier: string;
  fare_amount: number;
  status: BookingStatus;
  booking_time: string;
}

const Status = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooking();
  }, [bookingId]);

  const fetchBooking = async () => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("id", bookingId)
        .single();

      if (error) throw error;
      setBooking(data as Booking);
    } catch (error) {
      console.error("Error fetching booking:", error);
      toast.error("Failed to load booking details");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case "confirmed":
        return "bg-primary";
      case "arriving":
        return "bg-accent";
      case "in_flight":
        return "bg-secondary";
      case "completed":
        return "bg-green-500";
      case "cancelled":
        return "bg-destructive";
      default:
        return "bg-muted";
    }
  };

  const getStatusMessage = (status: BookingStatus) => {
    switch (status) {
      case "confirmed":
        return "Your FlyTaxi is confirmed and on its way";
      case "arriving":
        return "Your FlyTaxi is arriving at pickup location";
      case "in_flight":
        return "You're in flight! Enjoy the journey";
      case "completed":
        return "Journey completed. Thank you for flying with us!";
      case "cancelled":
        return "This booking has been cancelled";
      default:
        return "Processing your booking...";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-sky flex items-center justify-center">
        <div className="animate-pulse text-primary text-xl">Loading booking details...</div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gradient-sky flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Booking Not Found</h2>
          <p className="text-muted-foreground mb-6">
            We couldn't find the booking you're looking for.
          </p>
          <Button onClick={() => navigate("/")} className="bg-gradient-hero">
            Return Home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-sky">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="p-8 shadow-premium">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-hero rounded-full mb-4 animate-pulse-glow">
                <Plane className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Booking Status</h1>
              <Badge className={`${getStatusColor(booking.status)} text-white px-4 py-2 text-sm`}>
                {booking.status.toUpperCase().replace("_", " ")}
              </Badge>
            </div>

            <div className="bg-muted/50 rounded-lg p-6 mb-6">
              <p className="text-center text-lg font-medium">
                {getStatusMessage(booking.status)}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-semibold">Route</p>
                  <p className="text-sm text-muted-foreground">
                    {booking.start_lat.toFixed(4)}, {booking.start_lng.toFixed(4)} →{" "}
                    {booking.end_lat.toFixed(4)}, {booking.end_lng.toFixed(4)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Plane className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-semibold">Tier</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {booking.tier} ({booking.tier === "standard" ? "2" : "4"} seats)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-semibold">Distance</p>
                  <p className="text-sm text-muted-foreground">
                    {booking.distance_km.toFixed(2)} km
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <IndianRupee className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-semibold">Fare</p>
                  <p className="text-sm text-muted-foreground">
                    ₹{booking.fare_amount.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <p className="text-sm text-muted-foreground text-center">
              Booking ID: {booking.id}
            </p>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Booked at: {new Date(booking.booking_time).toLocaleString()}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Status;
