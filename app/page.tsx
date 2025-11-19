import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Calendar, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import heroImage from "@/assets/hero-community.jpg";
import blanketsImage from "@/assets/blankets.jpg";
import marketImage from "@/assets/market-day.jpg";
import Link from "next/link";
import Footer from "@/components/Footer";

const Page = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden mt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage.src})` }}
        >
          <div className="absolute inset-0 bg-linear-to-b from-foreground/60 via-foreground/40 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-2 animate-fade-in flex flex-col">
            Spread Warmth.
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text ">
              Share Love.
            </span>
            Chill Together.
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            A youth-driven charity bringing communities together through music,
            art, and kindness.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Go
              </Button>
            </Link>

            <Link href="/events" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto rounded-2xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Join an Event
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Blankets & Chill brings people together through the power of
              music, art, and community events. We host concerts, market days,
              and charity drives to provide warmth and support to those who need
              it most.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-glow)] transition-all duration-300">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Give Warmth</h3>
                <p className="text-muted-foreground">
                  Every donation provides blankets and essentials to vulnerable
                  communities.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-glow)] transition-all duration-300">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Users className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Build Community</h3>
                <p className="text-muted-foreground">
                  Connect with like-minded people who care about making a
                  difference.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-glow)] transition-all duration-300">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Create Impact</h3>
                <p className="text-muted-foreground">
                  Join events that combine entertainment with meaningful social
                  impact.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Events Preview Section */}
      <section className="py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Upcoming Events
            </h2>
            <p className="text-lg text-muted-foreground">
              Join us for music, markets, and meaningful moments
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="overflow-hidden border-none shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-glow)] transition-all duration-300">
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${blanketsImage.src})` }}
              />
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>Coming Soon</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Blankets & Beats</h3>
                <p className="text-muted-foreground mb-4">
                  Live music performances with local artists. All proceeds go
                  towards providing blankets to those in need.
                </p>
                <Link href="/events">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-glow)] transition-all duration-300">
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${marketImage.src})` }}
              />
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>Coming Soon</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  Community Market Day
                </h3>
                <p className="text-muted-foreground mb-4">
                  Support local vendors and artists while contributing to
                  charity. Shop, connect, and give back.
                </p>
                <Link href="/events">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/events">
              <Button size="lg">View All Events</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-accent to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your contribution, no matter how small, creates real impact. Join
            our community today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donations">
              <Button variant="hero" size="lg">
                Donate Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Volunteer With Us
              </Button>
            </Link>
          </div>
        </div>
      </section>


    <Footer />
    
    </div>

  );
};

export default Page;
