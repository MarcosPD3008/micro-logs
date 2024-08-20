import { Services } from "../models/service.model";
import { ServiceService } from "../services/services.service"

const serviceService = new ServiceService();

export default async (msg: any): Promise<Services> => {
    const content = JSON.parse(msg.content.toString());

    const { name, description } = content.data;

    return await serviceService.create({ name, description });
}