import mongoose, { Schema, Document } from 'mongoose';

export interface IVendor extends Document {
  name: string;
  email: string;
  products: string;
  eventId: mongoose.Types.ObjectId;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const VendorSchema: Schema = new Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  products: { type: String, required: true },
  eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, {
  timestamps: true,
});

export default mongoose.models.Vendor || mongoose.model<IVendor>('Vendor', VendorSchema);
