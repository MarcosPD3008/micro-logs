import { BaseService } from "./base.service";
import ExceptionLogModel, { ExceptionLog } from "../models/ExceptionLog.model";

export class ExceptionLogService extends BaseService<ExceptionLog> {
    constructor() {
        super(ExceptionLogModel);
    }
}
