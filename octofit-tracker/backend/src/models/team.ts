import { model, Schema } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, trim: true, default: '' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    seedKey: { type: String, unique: true, sparse: true },
  },
  { timestamps: true },
);

export default model('Team', teamSchema);
