export interface EntityLogs {
    service: string;
    entityName: string;
    action: ActionType;
    timestamp:Date;
    userId?: string;
    userName?: string;
    changes?: any;
    oldValue?:any;
    newValue?:any;
}

export enum ActionType {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE'
}