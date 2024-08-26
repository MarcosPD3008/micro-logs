import { Schema, Document, model, Types } from 'mongoose';
import { Services } from './service.model';

export interface EntityLogs extends Document {
    service: Types.ObjectId | Services;
    entityName: string;
    action: ActionType;
    timestamp:Date;
    userId?: string;
    userName?: string;
    changes?: any;
}

export enum ActionType {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE'
}

//schema
const EntityLogSchema = new Schema<EntityLogs>({
    service: { type: Schema.Types.ObjectId, ref: 'Services', required: true }, // Reference field
    entityName: { type: String, required: true },
    action: { type: String, enum: Object.values(ActionType), required: true },
    timestamp: { type: Date, default: Date.now },
    userId: { type: String },
    userName: { type: String },
    changes: { type: Schema.Types.Mixed },
});

export const EntityLog = model<EntityLogs>('EntityLogs', EntityLogSchema);