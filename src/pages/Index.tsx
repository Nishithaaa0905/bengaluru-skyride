import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Plane, MapPin, Clock, Shield, Zap, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-sky overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxNDgsIDE2MywgMTg0LCAwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-semibold text-sm mb-4">
              <Zap className="w-4 h-4" />
              <span>Now Live in Bengaluru</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Skip Traffic,
              <br />
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Fly Direct
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of urban mobility with autonomous air taxis. 
              Direct routes, zero congestion, premium comfort.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                onClick={() => navigate("/booking")}
                className="text-lg h-14 px-8 bg-gradient-hero hover:opacity-90 shadow-flight"
              >
                <Plane className="mr-2 h-5 w-5" />
                Book Your Flight
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg h-14 px-8 border-primary text-primary hover:bg-primary/10"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Floating animation elements */}
        <div className="absolute top-20 left-10 animate-float">
          <Plane className="w-12 h-12 text-primary/20" />
        </div>
        <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: "1s" }}>
          <Plane className="w-16 h-16 text-primary/20" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose FlyTaxi?</h2>
            <p className="text-xl text-muted-foreground">
              The fastest, safest way to travel across Bengaluru
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 shadow-card hover:shadow-flight transition-shadow">
              <div className="w-14 h-14 bg-gradient-hero rounded-lg flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Save Time</h3>
              <p className="text-muted-foreground">
                Direct aerial routes mean 5-10x faster travel compared to road traffic
              </p>
            </Card>

            <Card className="p-8 shadow-card hover:shadow-flight transition-shadow">
              <div className="w-14 h-14 bg-gradient-hero rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">100% Safe</h3>
              <p className="text-muted-foreground">
                Autonomous systems with multiple safety redundancies and real-time monitoring
              </p>
            </Card>

            <Card className="p-8 shadow-card hover:shadow-flight transition-shadow">
              <div className="w-14 h-14 bg-gradient-hero rounded-lg flex items-center justify-center mb-6">
                <MapPin className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Direct Routes</h3>
              <p className="text-muted-foreground">
                Point-to-point travel without detours, stops, or traffic delays
              </p>
            </Card>

            <Card className="p-8 shadow-card hover:shadow-flight transition-shadow">
              <div className="w-14 h-14 bg-gradient-premium rounded-lg flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Two Tiers</h3>
              <p className="text-muted-foreground">
                Choose Standard (2 seats) or Premium (4 seats) based on your needs
              </p>
            </Card>

            <Card className="p-8 shadow-card hover:shadow-flight transition-shadow">
              <div className="w-14 h-14 bg-gradient-hero rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Booking</h3>
              <p className="text-muted-foreground">
                Book in seconds with our intuitive map interface and transparent pricing
              </p>
            </Card>

            <Card className="p-8 shadow-card hover:shadow-flight transition-shadow">
              <div className="w-14 h-14 bg-gradient-hero rounded-lg flex items-center justify-center mb-6">
                <Plane className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Zero Emissions</h3>
              <p className="text-muted-foreground">
                Electric-powered aircraft for sustainable urban air mobility
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Take Flight?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of Bengaluru residents who've already experienced the future of transportation
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/booking")}
            className="text-lg h-14 px-8 bg-background text-primary hover:bg-background/90 shadow-premium"
          >
            Book Your First Flight
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
