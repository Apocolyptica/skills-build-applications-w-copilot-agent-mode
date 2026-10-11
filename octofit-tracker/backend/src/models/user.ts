import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    bio: { type: String, trim: true, default: '' },
    seedKey: { type: String, unique: true, sparse: true },
  },
  { timestamps: true },
);

export default model('User', userSchema);
