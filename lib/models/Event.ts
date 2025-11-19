import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  type: string;
  approvedVendors: mongoose.Types.ObjectId[];
  tickets: {
    earlyBird: {
      available: number;
      price: number;
    };
    ordinary: {
      available: number;
      price: number;
    };
    vip: {
      available: number;
      price: number;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  type: { type: String, required: true },
  approvedVendors: [{ type: Schema.Types.ObjectId, ref: 'Vendor' }],
  tickets: {
    earlyBird: {
      available: { type: Number, required: true, default: 0 },
      price: { type: Number, required: true, default: 0 },
    },
    ordinary: {
      available: { type: Number, required: true, default: 0 },
      price: { type: Number, required: true, default: 0 },
    },
    vip: {
      available: { type: Number, required: true, default: 0 },
      price: { type: Number, required: true, default: 0 },
    },
  },
}, {
  timestamps: true,
});

export default mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);
