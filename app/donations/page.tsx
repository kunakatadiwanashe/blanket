import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Package, Gift, Users } from "lucide-react";

const Donations = () => {
  const impactItems = [
    { amount: "$10", impact: "1 warm blanket for someone in need" },
    { amount: "$25", impact: "Blankets for a small family" },
    { amount: "$50", impact: "Care package with blankets and essentials" },
    { amount: "$100", impact: "Support a full community charity drive" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Make a{" "}
              <span className="bg-linear-r from-primary to-secondary bg-clip-text text-transparent">
                Difference
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Your generous donation helps us provide warmth and care to those who need it most. 
              Every contribution, big or small, creates real impact.
            </p>
          </div>

          {/* Impact Section */}
          <div className="max-w-4xl mx-auto mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Your Impact</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {impactItems.map((item, index) => (
                <Card key={index} className="border-none shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-glow)] transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Heart className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-primary mb-2">{item.amount}</h3>
                        <p className="text-muted-foreground">{item.impact}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Donation Options */}
          <div className="max-w-5xl mx-auto mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">Ways to Give</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-none shadow-[var(--shadow-soft)] text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">One-Time Gift</h3>
                  <p className="text-muted-foreground mb-6">
                    Make a single donation to support our current initiatives.
                  </p>
                  <Button variant="hero" className="w-full">
                    Donate Now
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-[var(--shadow-soft)] text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Users className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Monthly Support</h3>
                  <p className="text-muted-foreground mb-6">
                    Become a recurring donor and provide sustained impact.
                  </p>
                  <Button variant="secondary" className="w-full">
                    Give Monthly
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-[var(--shadow-soft)] text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Package className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">In-Kind Donation</h3>
                  <p className="text-muted-foreground mb-6">
                    Donate blankets, clothes, or other essentials directly.
                  </p>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Transparency Section */}
          <div className="max-w-3xl mx-auto">
            <Card className="border-none shadow-[var(--shadow-soft)] bg-gradient-to-r from-primary/5 via-accent/50 to-secondary/5">
              <CardContent className="pt-8 pb-8">
                <div className="text-center mb-8">
                  <Gift className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h2 className="text-3xl font-bold mb-4">How We Use Your Donation</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <p>
                      <span className="font-bold text-foreground">80%</span> directly funds blankets, 
                      essentials, and charity distribution to communities in need
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0" />
                    <p>
                      <span className="font-bold text-foreground">15%</span> supports event organization, 
                      venue costs, and artist fees for our fundraising concerts
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <p>
                      <span className="font-bold text-foreground">5%</span> covers operational costs 
                      to keep our organization running smoothly
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Donations;
