import { FilterQuery } from "mongoose";
import { EntityLog, EntityLogs } from "../models/entityLog.model";
import { PaginatedResult } from "../models/paginatedResult.model";
import { BaseService } from "./base.service";

export class EntityLogService extends BaseService<EntityLogs> {
    constructor() {
        super(EntityLog);
    }

    override async findAll(filters: FilterQuery<EntityLogs> = {}, pageNumber: number = 1, pageSize: number = 10): Promise<PaginatedResult<EntityLogs>> {
        const skip = (pageNumber - 1) * pageSize;
    
        const serviceFilter = filters['service'] ? { name: filters['service'] } : {};

        delete filters['service']
        
        const [data] = await Promise.all([
            this.model
                .find(filters)
                .populate({
                    path: 'service',
                    match: serviceFilter,
                    select: 'name',
                })
                .skip(skip)
                .limit(pageSize)
                .exec()
        ]);
    
        const filteredData = data.filter(entry => entry.service);
    
        const totalPages = Math.ceil(filteredData.length / pageSize);
    
        return {
            data: filteredData,
            total: filteredData.length,
            pageNumber,
            totalPages
        };
    }
}
