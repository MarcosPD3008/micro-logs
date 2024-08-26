import { ExceptionLog } from "../models/ExceptionLog.model";
import { ExceptionLogService } from "../services/exceptionLogs.service";

export default async (msg: any): Promise<ExceptionLog> => {
    const content = JSON.parse(msg.content.toString());

    const exceptionLog = {
        service: content?.serviceId, // Assuming serviceId is provided in the message
        environment: content?.environment,
        exceptionType: content?.exceptionType,
        message: content?.message,
        stackTrace: content?.stackTrace,
        language: content?.language,
        context: content?.context,
        resolved: content?.resolved || false, // Default to false if not provided
        resolutionDetails: content?.resolutionDetails
    };

    const exceptionLogService = new ExceptionLogService();

    return await exceptionLogService.create(exceptionLog);
}
