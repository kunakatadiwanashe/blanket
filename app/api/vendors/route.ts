import { NextRequest, NextResponse } from 'next/server';
import Vendor from '@/lib/models/Vendor';
import connectToDatabase from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { name, email, products, eventId } = body;

    if (!name || !email || !products || !eventId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const vendor = new Vendor({ name, email, products, eventId, status: 'pending' });
    await vendor.save();

    return NextResponse.json({ message: 'Vendor registered successfully', vendor }, { status: 201 });
  } catch (error) {
    console.error('Error registering vendor:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
