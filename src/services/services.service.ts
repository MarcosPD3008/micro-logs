import { Services, Service } from "../models/service.model";
import { BaseService } from "./base.service";

export class ServiceService extends BaseService<Services> {
    constructor() {
        super(Service);
    }
}
