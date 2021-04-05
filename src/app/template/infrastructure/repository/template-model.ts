import { Document } from 'mongoose';

export interface TemplateModel extends Document {
  id: string;
  name: string;
  html: string;
  paperFormat: string;
}