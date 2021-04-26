import { Document, Schema } from 'mongoose';

export interface TemplateModel extends Document {
  id: string;
  name: string;
  html: string;
  header: string;
  footer: string;
  paperFormat: string;
  templateImages: string[];
}