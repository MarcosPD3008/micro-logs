import { Schema, Document, model } from 'mongoose';

export interface Services extends Document {
    name: string;
    description: string;
}

const ServiceSchema = new Schema<Services>({
    name: { type: String, required: true },
    description: { type: String },
});

export const Service = model<Services>('Services', ServiceSchema);