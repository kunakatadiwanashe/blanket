import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Sparkles, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-background via-accent/10 to-background text-foreground">
      <Navigation />

      <main className="pt-25 pb-20">
        <div className="container mx-auto px-6 md:px-12">
          {/* Hero Section */}
          <div className="max-w-4xl text-left mb-24 pl-6">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
              About
              <span className="pl-6 bg-linear-to-r from-orange-500 to-amber-700 bg-clip-text text-transparent">
                Blankets
              </span>
              <span className="bg-linear-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
                {" "}
                & Chill
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              A youth-driven movement bringing warmth, hope, and community
              together through the power of music, art, and compassion.
            </p>
          </div>

          {/* Story Section */}
          <div className="mb-20 flex gap-4">
            <Card className="border-none shadow-xl backdrop-blur-sm bg-amber-50 dark:bg-background/50 h-[50vh]">
              <CardContent className="pt-8 pb-1 px-8 md:px-12">
                <h2 className="text-3xl font-bold mb-4  text-primary">
                  Our Story
                </h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
                  <p>
                    Blankets &amp; Chill began with a simple idea — what if we
                    could combine the things young people love: music, art, and
                    community, with making a real difference in people&apos;s
                    lives?
                  </p>
                  <p>
                    Our first event was a small acoustic night where we
                    collected blankets for a local shelter. The energy was
                    incredible, and we realized we were onto something special.
                  </p>
                  <p>
                    Today, we&apos;ve grown into a vibrant community hosting
                    concerts, market days, and charity drives that bring people
                    together while supporting those in need of warmth and care.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Mission & Vision */}
            <div className="gap-10 mb-10 max-w-6xl mx-auto flex flex-col ">
              {[
                {
                  title: "Our Mission",
                  icon: <Target className="w-8 h-8 text-primary" />,
                  text: "To create meaningful community experiences that bring people together and provide essential support to vulnerable populations through youth-led initiatives.",
                  bg: "bg-primary/10",
                },
                {
                  title: "Our Vision",
                  icon: <Sparkles className="w-8 h-8 text-secondary" />,
                  text: "A world where young people lead the charge in building compassionate communities, where everyone has access to warmth, care, and hope.",
                  bg: "bg-secondary/10",
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-amber-50 dark:bg-background/40"
                >
                  <CardContent className="pt-10 pb-10 ">
                    <h3 className="text-2xl font-bold mb-4 text-foreground flex justify-between w-43">
                      {item.icon} {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.text}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Values Section */}
          <div className="max-w-5xl mx-auto mb-24">
            <h2 className="text-4xl font-extrabold mb-14 bg-linear-to-r from-orange-500 to-amber-700 bg-clip-text text-transparent">
              Our 
              <span className="pl-6 bg-linear-to-r from-orange-500 to-amber-700 bg-clip-text text-transparent">
                Core 
              </span>
              <span className="bg-linear-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
                {" "}
                Values
              </span>
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  title: "Compassion",
                  icon: <Heart className="w-8 h-8 text-primary" />,
                  desc: "Leading with empathy and care in everything we do.",
                  bg: "bg-primary/10",
                },
                {
                  title: "Community",
                  icon: <Users className="w-8 h-8 text-secondary" />,
                  desc: "Building connections that last beyond our events.",
                  bg: "bg-secondary/10",
                },
                {
                  title: "Creativity",
                  icon: <Sparkles className="w-8 h-8 text-accent" />,
                  desc: "Finding innovative ways to make social impact.",
                  bg: "bg-accent/10",
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="text-center p-8 rounded-2xl hover:bg-white/70 dark:hover:bg-background/40 transition-all duration-300 shadow-md hover:shadow-xl"
                >
                  <div
                    className={`w-20 h-20 mx-auto mb-6 rounded-full ${value.bg} flex items-center justify-center`}
                  >
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="max-w-4xl mx-auto text-center bg-amber-50">
            <Card className="border-none shadow-xl bg-gradient-to-r from-primary/5 via-secondary/10 to-accent/5 backdrop-blur-sm">
              <CardContent className="pt-12 pb-12 px-8 md:px-16">
                <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
                <p className="text-muted-foreground mb-8 leading-relaxed text-lg max-w-2xl mx-auto">
                  Whether you&apos;re an artist, volunteer, or someone who just
                  wants to help, there&apos;s a place for you in our community.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/contact" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      Volunteer With Us
                    </Button>
                  </Link>

                  <Link href="/donations" className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto rounded-2xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      Support Our Cause
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
