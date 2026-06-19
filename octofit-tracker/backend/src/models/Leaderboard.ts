import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ILeaderboard extends Document {
  user: Types.ObjectId;
  team?: Types.ObjectId;
  score: number;
  activitiesCount: number;
  totalDuration: number; // in minutes
  totalCalories: number;
  period: 'daily' | 'weekly' | 'monthly' | 'alltime';
  rank?: number;
  createdAt: Date;
  updatedAt: Date;
}

const LeaderboardSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    score: { type: Number, required: true, default: 0 },
    activitiesCount: { type: Number, required: true, default: 0 },
    totalDuration: { type: Number, required: true, default: 0 }, // minutes
    totalCalories: { type: Number, required: true, default: 0 },
    period: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'alltime'],
      required: true
    },
    rank: { type: Number }
  },
  { timestamps: true }
);

// Index for efficient leaderboard queries
LeaderboardSchema.index({ period: 1, score: -1 });
LeaderboardSchema.index({ team: 1, period: 1, score: -1 });

export const Leaderboard = mongoose.model<ILeaderboard>(
  'Leaderboard',
  LeaderboardSchema
);
