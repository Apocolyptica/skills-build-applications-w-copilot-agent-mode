import { model, Schema } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    type: {
      type: String,
      required: true,
      enum: ['walking', 'running', 'cycling', 'swimming', 'strength'],
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    calories: { type: Number, min: 0 },
    performedAt: { type: Date, required: true, default: Date.now },
    seedKey: { type: String, unique: true, sparse: true },
  },
  { timestamps: true },
);

export default model('Activity', activitySchema);
