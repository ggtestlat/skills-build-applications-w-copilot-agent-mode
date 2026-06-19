import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IActivity extends Document {
  user: Types.ObjectId;
  type: 'running' | 'cycling' | 'swimming' | 'gym' | 'yoga' | 'walking' | 'other';
  duration: number; // in minutes
  distance?: number; // in km
  caloriesBurned?: number;
  notes?: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ActivitySchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['running', 'cycling', 'swimming', 'gym', 'yoga', 'walking', 'other'],
      required: true
    },
    duration: { type: Number, required: true, min: 1 }, // minutes
    distance: { type: Number, min: 0 }, // km
    caloriesBurned: { type: Number, min: 0 },
    notes: { type: String, trim: true },
    date: { type: Date, required: true, default: Date.now }
  },
  { timestamps: true }
);

export const Activity = mongoose.model<IActivity>('Activity', ActivitySchema);
