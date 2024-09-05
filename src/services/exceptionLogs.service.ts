import { BaseService } from "./base.service";
import ExceptionLogModel, { ExceptionLog } from "../models/ExceptionLog.model";
import { FilterQuery } from "mongoose";
import { PaginatedResult } from "../models/paginatedResult.model";

export class ExceptionLogService extends BaseService<ExceptionLog> {
    constructor() {
        super(ExceptionLogModel);
    }

    override async findAll(filters: FilterQuery<ExceptionLog> = {}, pageNumber: number = 1, pageSize: number = 10): Promise<PaginatedResult<ExceptionLog>> {
        const skip = (pageNumber - 1) * pageSize;
    
        const serviceFilter = filters['service'] ? { name: filters['service'] } : {};
        delete filters['service']
        
        const [data, total] = await Promise.all([
            this.model
                .find(filters)
                .populate({
                    path: 'service',
                    match: serviceFilter,
                    select: 'name',
                })
                .skip(skip)
                .limit(pageSize)
                .exec(),
            this.model.countDocuments(filters).exec()
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
