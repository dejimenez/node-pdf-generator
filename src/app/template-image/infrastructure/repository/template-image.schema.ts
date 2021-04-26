import { Schema } from 'mongoose';

export const templateImageSchema = new Schema({
  id: { type: String, required: true, unique: true },
  path: { type: String, required: true },
  url: { type: String, required: true },
  expiration: { type: Number, required: true },
});
