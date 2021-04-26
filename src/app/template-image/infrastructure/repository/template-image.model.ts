import { Document } from 'mongoose';

export interface TemplateImageModel extends Document {
  id: string;
  path: string;
  url: string;
  expiration: number;
}
