import { model, Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    activityType: {
      type: String,
      required: true,
      enum: ['walking', 'running', 'cycling', 'swimming', 'strength'],
    },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    durationMinutes: { type: Number, required: true, min: 1 },
    seedKey: { type: String, unique: true, sparse: true },
  },
  { timestamps: true },
);

export default model('Workout', workoutSchema);
