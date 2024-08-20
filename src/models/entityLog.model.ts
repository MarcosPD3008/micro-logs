import { Schema, Document, model } from 'mongoose';

export interface EntityLogs extends Document {
    serviceId: string;
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
    serviceId: { type: String, required: true },
    entityName: { type: String, required: true },
    action: { type: String, enum: Object.values(ActionType), required: true },
    timestamp: { type: Date, default: Date.now },
    userId: { type: String },
    userName: { type: String },
    changes: { type: Schema.Types.Mixed },
});

export const EntityLog = model<EntityLogs>('EntityLogs', EntityLogSchema);