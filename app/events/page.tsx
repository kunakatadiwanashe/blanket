'use client';

import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Clock, Music, ShoppingBag, UserPlus } from "lucide-react";
import blanketsImage from "@/assets/blankets.jpg";
import marketImage from "@/assets/market-day.jpg";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

interface Event {
  _id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  type: string;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [vendorForm, setVendorForm] = useState({
    name: '',
    email: '',
    eventId: ''
  });
  const [isVendorDialogOpen, setIsVendorDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVendorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/vendors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vendorForm),
      });

      if (response.ok) {
        alert('Vendor registration submitted successfully! You will be notified once approved.');
        setVendorForm({ name: '', email: '', eventId: '' });
        setIsVendorDialogOpen(false);
      } else {
        alert('Failed to register. Please try again.');
      }
    } catch (error) {
      console.error('Error registering vendor:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getIcon = (type: string) => {
    return type === 'Music Event' ? Music : ShoppingBag;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">


          {/* Hero Section */}
          <div className="max-w-4xl pl-20 mb-20">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Upcoming{" "}
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                Events
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Join us for unforgettable experiences that bring our community together while making a real difference.
            </p>
          </div>




          {/* Events Grid */}
          <div className="max-w-6xl mx-auto space-y-8 mb-20">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading events...</p>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No upcoming events at the moment.</p>
              </div>
            ) : (
              events.map((event) => {
                const IconComponent = getIcon(event.type);
                return (
                  <Card key={event._id} className="border-none shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div
                        className="h-64 md:h-auto bg-cover bg-center"
                        style={{ backgroundImage: `url(${marketImage.src})` }}
                      />
                      <CardContent className="pt-8 pb-8 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-sm text-primary mb-4">
                            <IconComponent className="w-4 h-4" />
                            <span className="font-medium">{event.type}</span>
                          </div>
                          <h3 className="text-3xl font-bold mb-4">{event.title}</h3>
                          <p className="text-muted-foreground mb-6 leading-relaxed">
                            {event.description}
                          </p>

                          <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3 text-muted-foreground">
                              <Calendar className="w-5 h-5 text-primary" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-3 text-muted-foreground">
                              <Clock className="w-5 h-5 text-primary" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-3 text-muted-foreground">
                              <MapPin className="w-5 h-5 text-primary" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>

                        <Dialog open={isVendorDialogOpen} onOpenChange={setIsVendorDialogOpen}>
                          <DialogTrigger asChild>
                            <Button
                              className="w-full"
                              onClick={() => setVendorForm({ ...vendorForm, eventId: event._id })}
                            >
                              <UserPlus className="w-4 h-4 mr-2" />
                              Register as Vendor
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Register as Vendor for {event.title}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleVendorSubmit} className="space-y-4">
                              <div>
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                  id="name"
                                  value={vendorForm.name}
                                  onChange={(e) => setVendorForm({ ...vendorForm, name: e.target.value })}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                  id="email"
                                  type="email"
                                  value={vendorForm.email}
                                  onChange={(e) => setVendorForm({ ...vendorForm, email: e.target.value })}
                                  required
                                />
                              </div>
                              <Button type="submit" disabled={submitting} className="w-full">
                                {submitting ? 'Submitting...' : 'Submit Registration'}
                              </Button>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </CardContent>
                    </div>
                  </Card>
                );
              })
            )}
          </div>

<section className="flex bg-amber-50 p-14 gap-6">
            {/* Artist Info Section */}
          <div className="max-w-4xl mx-auto">
            <Card className="border-none bg-linear-to-r from-primary/5 via-accent/50 to-secondary/5">
              <CardContent className="pt-8 pb-8">
                <Music className="w-12 h-12 text-primary mb-4" />
                <h2 className="text-3xl font-bold mb-4">Are You an Artist?</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed max-w-2xl mx-auto">
                  We&apos;re always looking for talented musicians and performers to join our lineup.
                  Help us create unforgettable experiences while supporting a great cause.
                </p>
                <Button>
                  Apply to Perform
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Vendor Info Section */}
          <div className="max-w-4xl mx-auto">
            <Card className="border-none ">
              <CardContent className="pt-8 pb-8">
                <ShoppingBag className="w-12 h-12 text-secondary mb-4" />
                <h2 className="text-3xl font-bold mb-4">Become a Vendor</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed max-w-2xl mx-auto">
                  Showcase your products or crafts at our market days. Connect with the community
                  and contribute to our charitable mission. Register for specific events above.
                </p>
                <p className="text-sm text-muted-foreground">
                  Click "Register as Vendor" on any event card to apply.
                </p>
              </CardContent>
            </Card>
          </div>


</section>




        </div>
      </main>




      <Footer />
    </div>
  );
};

export default Events;
