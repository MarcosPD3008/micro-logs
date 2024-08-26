import { Model, Document, FilterQuery } from 'mongoose';
import { PaginatedResult } from '../models/paginatedResult.model';

export class BaseService<T extends Document> {
    protected model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async create(data: Partial<T>): Promise<T> {
        const document = new this.model(data);
        return await document.save();
    }

    async findById(id: string): Promise<T | null> {
        return await this.model.findById(id).exec();
    }

    async findAll(filters: FilterQuery<T> = {}, pageNumber: number = 1, pageSize: number = 10): Promise<PaginatedResult<T>> {
        const skip = (pageNumber - 1) * pageSize;
        const [data, total] = await Promise.all([
            this.model.find(filters).skip(skip).limit(pageSize).exec(),
            this.model.countDocuments(filters).exec()
        ]);
    
        const totalPages = Math.ceil(total / pageSize);
    
        return {
            data,
            total,
            pageNumber,
            totalPages
        };
    }
    

    async update(id: string, data: Partial<T>): Promise<T | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async delete(id: string): Promise<T | null> {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
