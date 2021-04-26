import { Schema } from 'mongoose';

export const templateSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  html: { type: String, required: true },
  header: { type: String, default: null },
  footer: { type: String, default: null },
  paperFormat: { type: String, required: true },
  templateImages: {
    type: [String],
    default: [],
  },
});
