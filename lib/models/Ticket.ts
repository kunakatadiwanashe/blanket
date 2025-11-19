import mongoose, { Schema, Document } from 'mongoose';

export interface ITicket extends Document {
  eventId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  type: 'earlyBird' | 'ordinary' | 'vip';
  quantity: number;
  totalPrice: number;
  purchasedAt: Date;
}

const TicketSchema: Schema = new Schema({
  eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['earlyBird', 'ordinary', 'vip'], required: true },
  quantity: { type: Number, required: true, min: 1 },
  totalPrice: { type: Number, required: true },
  purchasedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Ticket || mongoose.model<ITicket>('Ticket', TicketSchema);
