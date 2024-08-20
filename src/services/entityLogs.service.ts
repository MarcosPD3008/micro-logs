import { EntityLog, EntityLogs } from "../models/entityLog.model";
import { BaseService } from "./base.service";

export class EntityLogService extends BaseService<EntityLogs> {
    constructor() {
        super(EntityLog);
    }
}
