import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Event from '@/lib/models/Event';
import Ticket from '@/lib/models/Ticket';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { eventId, userId, ticketType, quantity } = body;

    if (!eventId || !userId || !ticketType || !quantity) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!['earlyBird', 'ordinary', 'vip'].includes(ticketType)) {
      return NextResponse.json({ error: 'Invalid ticket type' }, { status: 400 });
    }

    if (quantity < 1) {
      return NextResponse.json({ error: 'Quantity must be at least 1' }, { status: 400 });
    }

    // Fetch the event
    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // Check availability
    if (event.tickets[ticketType].available < quantity) {
      return NextResponse.json({ error: 'Not enough tickets available' }, { status: 400 });
    }

    // Calculate total price
    const price = event.tickets[ticketType].price;
    const totalPrice = price * quantity;

    // Create ticket
    const ticket = new Ticket({
      eventId,
      userId,
      type: ticketType,
      quantity,
      totalPrice,
    });
    await ticket.save();

    // Update event availability
    event.tickets[ticketType].available -= quantity;
    await event.save();

    return NextResponse.json({ message: 'Ticket purchased successfully', ticket }, { status: 201 });
  } catch (error) {
    console.error('Error purchasing ticket:', error);
    return NextResponse.json({ error: 'Failed to purchase ticket' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const tickets = await Ticket.find({ userId }).populate('eventId');
    return NextResponse.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return NextResponse.json({ error: 'Failed to fetch tickets' }, { status: 500 });
  }
}
