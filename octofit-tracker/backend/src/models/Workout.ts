import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  description?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exercises: Array<{
    name: string;
    sets: number;
    reps: number;
    duration?: number; // in minutes
  }>;
  creator: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const WorkoutSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true
    },
    exercises: [
      {
        name: { type: String, required: true },
        sets: { type: Number, required: true, min: 1 },
        reps: { type: Number, required: true, min: 1 },
        duration: { type: Number, min: 1 } // minutes
      }
    ],
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

export const Workout = mongoose.model<IWorkout>('Workout', WorkoutSchema);
