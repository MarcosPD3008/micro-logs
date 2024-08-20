import { Model, Document, FilterQuery } from 'mongoose';

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

    async findAll(filters: FilterQuery<T> = {}): Promise<T[]> {
        return await this.model.find(filters).exec();
    }

    async update(id: string, data: Partial<T>): Promise<T | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async delete(id: string): Promise<T | null> {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
