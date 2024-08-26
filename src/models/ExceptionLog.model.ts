import { Document, Schema, Types, model } from 'mongoose';
import { Services } from './service.model';

export interface ExceptionLog extends Document {
  timestamp: Date;
  service: Types.ObjectId | Services; 
  exceptionType: string; 
  environment?: string; 
  message: string;
  stackTrace?: string; 
  language?: string; 
  context?: any;
  resolved?: boolean; 
  resolutionDetails?: string; 
}

const exceptionLogSchema = new Schema<ExceptionLog>({
  timestamp: { type: Date, default: Date.now },
  service: { type: Schema.Types.ObjectId, ref: 'Services', required: true },
  exceptionType: { type: String, required: true },
  environment: { type: String },
  message: { type: String },
  stackTrace: { type: String },
  language: { type: String },
  context: { type: Schema.Types.Mixed },
  resolved: { type: Boolean, default: false },
  resolutionDetails: { type: String },
});

const ExceptionLogModel = model<ExceptionLog>('ExceptionLog', exceptionLogSchema);

export default ExceptionLogModel;
