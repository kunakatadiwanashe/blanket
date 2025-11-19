'use client';

import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";

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

interface Vendor {
  _id: string;
  name: string;
  email: string;
  eventId: { title: string };
  status: 'pending' | 'approved' | 'rejected';
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [events, setEvents] = useState<Event[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);

  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    image: '',
    type: '',
    adminPassword: 'admin123'
  });

  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    image: '',
    type: '',
    adminPassword: 'admin123'
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchEvents();
      fetchVendors();
    }
  }, [isAuthenticated]);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        if (data.user && data.user.role === 'admin') {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.user && data.user.role === 'admin') {
          setIsAuthenticated(true);
          setAuthError('');
        } else {
          setAuthError('Access denied. Admin privileges required.');
        }
      } else {
        const errorData = await response.json();
        setAuthError(errorData.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setAuthError('An error occurred during login');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setIsAuthenticated(false);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchVendors = async () => {
    try {
      const response = await fetch('/api/vendors?adminPassword=admin123');
      if (response.ok) {
        const data = await response.json();
        setVendors(data);
      }
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventForm),
      });

      if (response.ok) {
        alert('Event created successfully!');
        setEventForm({
          title: '',
          date: '',
          time: '',
          location: '',
          description: '',
          image: '',
          type: '',
          adminPassword: 'admin123'
        });
        fetchEvents();
      } else {
        alert('Failed to create event.');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      alert('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleVendorApproval = async (vendorId: string, status: 'approved' | 'rejected') => {
    try {
      const response = await fetch('/api/vendors', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: vendorId, status, adminPassword: 'admin123' }),
      });

      if (response.ok) {
        alert(`Vendor ${status} successfully!`);
        fetchVendors();
      } else {
        alert('Failed to update vendor status.');
      }
    } catch (error) {
      console.error('Error updating vendor:', error);
      alert('An error occurred.');
    }
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setEditForm({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description,
      image: event.image,
      type: event.type,
      adminPassword: 'admin123'
    });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/events', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: editingEvent?._id, ...editForm }),
      });

      if (response.ok) {
        alert('Event updated successfully!');
        setEditingEvent(null);
        fetchEvents();
      } else {
        alert('Failed to update event.');
      }
    } catch (error) {
      console.error('Error updating event:', error);
      alert('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      const response = await fetch('/api/events', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: eventId, adminPassword: 'admin123' }),
      });

      if (response.ok) {
        alert('Event deleted successfully!');
        fetchEvents();
      } else {
        alert('Failed to delete event.');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('An error occurred.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {authError && <p className="text-red-500 text-sm">{authError}</p>}
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl pl-20 mb-20">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-5xl md:text-6xl font-bold">
                Admin{" "}
                <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Panel
                </span>
              </h1>
              <Button onClick={handleLogout} variant="outline">
                Logout
              </Button>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Manage events and approve vendor registrations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Add Event Form */}
            <Card>
              <CardHeader>
                <CardTitle>Add New Event</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEventSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={eventForm.title}
                      onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      value={eventForm.date}
                      onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      value={eventForm.time}
                      onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={eventForm.location}
                      onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={eventForm.description}
                      onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      value={eventForm.image}
                      onChange={(e) => setEventForm({ ...eventForm, image: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select value={eventForm.type} onValueChange={(value: string) => setEventForm({ ...eventForm, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Music Event">Music Event</SelectItem>
                        <SelectItem value="Market Event">Market Event</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? 'Creating...' : 'Create Event'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Vendor Approvals */}
            <Card>
              <CardHeader>
                <CardTitle>Vendor Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vendors.length === 0 ? (
                    <p className="text-muted-foreground">No vendor applications.</p>
                  ) : (
                    vendors.map((vendor) => (
                      <div key={vendor._id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{vendor.name}</h4>
                            <p className="text-sm text-muted-foreground">{vendor.email}</p>
                            <p className="text-sm text-muted-foreground">Event: {vendor.eventId.title}</p>
                          </div>
                          <Badge variant={vendor.status === 'pending' ? 'secondary' : vendor.status === 'approved' ? 'default' : 'destructive'}>
                            {vendor.status}
                          </Badge>
                        </div>
                        {vendor.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleVendorApproval(vendor._id, 'approved')}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleVendorApproval(vendor._id, 'rejected')}
                            >
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Events List */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Current Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event._id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">{event.date} • {event.location}</p>
                        <p className="text-sm">{event.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" onClick={() => handleEditEvent(event)}>
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Event</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleEditSubmit} className="space-y-4">
                              <div>
                                <Label htmlFor="edit-title">Title</Label>
                                <Input
                                  id="edit-title"
                                  value={editForm.title}
                                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-date">Date</Label>
                                <Input
                                  id="edit-date"
                                  value={editForm.date}
                                  onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-time">Time</Label>
                                <Input
                                  id="edit-time"
                                  value={editForm.time}
                                  onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-location">Location</Label>
                                <Input
                                  id="edit-location"
                                  value={editForm.location}
                                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-description">Description</Label>
                                <Textarea
                                  id="edit-description"
                                  value={editForm.description}
                                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-image">Image URL</Label>
                                <Input
                                  id="edit-image"
                                  value={editForm.image}
                                  onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-type">Type</Label>
                                <Select value={editForm.type} onValueChange={(value: string) => setEditForm({ ...editForm, type: value })}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select event type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Music Event">Music Event</SelectItem>
                                    <SelectItem value="Market Event">Market Event</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <Button type="submit" disabled={loading} className="w-full">
                                {loading ? 'Updating...' : 'Update Event'}
                              </Button>
                            </form>
                          </DialogContent>
                        </Dialog>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this event?')) {
                              handleDeleteEvent(event._id);
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
