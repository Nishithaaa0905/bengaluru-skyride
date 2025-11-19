-- Create bookings table for FlyTaxi
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  start_lat DOUBLE PRECISION NOT NULL,
  start_lng DOUBLE PRECISION NOT NULL,
  end_lat DOUBLE PRECISION NOT NULL,
  end_lng DOUBLE PRECISION NOT NULL,
  distance_km DOUBLE PRECISION NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('standard', 'premium')),
  fare_amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'arriving', 'in_flight', 'completed', 'cancelled')),
  booking_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to view bookings (for MVP)
CREATE POLICY "Anyone can view bookings" 
ON public.bookings 
FOR SELECT 
USING (true);

-- Create policy to allow anyone to create bookings (for MVP)
CREATE POLICY "Anyone can create bookings" 
ON public.bookings 
FOR INSERT 
WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_bookings_booking_time ON public.bookings(booking_time DESC);
CREATE INDEX idx_bookings_status ON public.bookings(status);