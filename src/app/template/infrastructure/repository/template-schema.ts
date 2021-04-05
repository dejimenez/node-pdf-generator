import { Schema } from 'mongoose';

export const templateSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  html: { type: String, required: true },
  paperFormat: { type: String, required: true },
});
