import { EntityLogs } from "../models/entityLog.model";
import { EntityLogService } from "../services/entityLogs.service";

export default async (msg: any): Promise<EntityLogs> => {
    const content = JSON.parse(msg.content.toString());

    const log = {
        serviceId: content?.serviceId,
        entityName: content?.entityName,
        action: content?.action,
        timestamp: content?.timestamp,
        userId: content?.userId,
        userName: content?.userName,
        changes: content?.changes
    };

    const entityLogService = new EntityLogService();

    return await entityLogService.create(log);
}