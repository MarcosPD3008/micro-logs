import { Request, Response } from 'express';
import { ExceptionLogService } from '../../services/exceptionLogs.service';
import { ExceptionLog } from '../../models/ExceptionLog.model';
import { FilterQuery } from 'mongoose';

const service = new ExceptionLogService();

/**
 * @swagger
 * /api/exceptionLogs:
 *   get:
 *     summary: Retrieve all exception logs with optional filtering and pagination
 *     description: Retrieve a list of all exception logs from the database. You can filter the results using query parameters and paginate the response.
 *     tags: 
 *       - ExceptionLogs
 *     parameters:
 *       - in: query
 *         name: environment
 *         schema:
 *           type: string
 *         description: Filter logs by environment (e.g., "production", "staging", "development")
 *       - in: query
 *         name: exceptionType
 *         schema:
 *           type: string
 *         description: Filter logs by exception type (e.g., "TypeError", "NullPointerException")
 *       - in: query
 *         name: service
 *         schema:
 *           type: string
 *         description: Filter logs by service ID
 *       - in: query
 *         name: resolved
 *         schema:
 *           type: boolean
 *         description: Filter logs by resolution status
 *       - in: query
 *         name: pageNumber
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of items per page
 *     responses:
 *       200:
 *         description: A paginated list of exception logs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The log ID
 *                       service:
 *                         type: string
 *                         description: The service ID associated with the log
 *                       environment:
 *                         type: string
 *                         description: The environment in which the exception occurred
 *                       exceptionType:
 *                         type: string
 *                         description: The type of exception (e.g., TypeError, NullPointerException)
 *                       message:
 *                         type: string
 *                         description: The exception message
 *                       stackTrace:
 *                         type: string
 *                         description: The stack trace of the exception
 *                       language:
 *                         type: string
 *                         description: The programming language of the service
 *                       resolved:
 *                         type: boolean
 *                         description: Indicates if the exception has been resolved
 *                       resolutionDetails:
 *                         type: string
 *                         description: Details on how the exception was resolved
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         description: The time when the log was created
 *                 total:
 *                   type: integer
 *                   description: The total number of logs that match the filter criteria
 *                 pageNumber:
 *                   type: integer
 *                   description: The current page number
 *                 totalPages:
 *                   type: integer
 *                   description: The total number of pages available
 *       500:
 *         description: Error fetching exception logs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
export const getExceptionLogs = async (req: Request, res: Response) => {
    try {
        const pageNumber = parseInt(req.query?.pageNumber as string) || 1;
        const pageSize = parseInt(req.query?.pageSize as string) || 10;
        
        const filters: FilterQuery<ExceptionLog> = req.query;
        delete filters?.pageSize;
        delete filters?.pageNumber;

        const logs = await service.findAll(filters, pageNumber, pageSize);
        res.status(200).json(logs);
    } 
    catch (error: any) {
        res.status(500).json({ message: 'Error fetching exception logs', error: error.message });
    }
};

/**
 * @swagger
 * /api/exceptionLogs/{id}:
 *   get:
 *     summary: Retrieve a single exception log by ID
 *     description: Retrieve a specific exception log entry by its unique ID.
 *     tags: 
 *       - ExceptionLogs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The log ID
 *     responses:
 *       200:
 *         description: A single exception log entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The log ID
 *                 service:
 *                   type: string
 *                   description: The service ID associated with the log
 *                 environment:
 *                   type: string
 *                   description: The environment in which the exception occurred
 *                 exceptionType:
 *                   type: string
 *                   description: The type of exception (e.g., TypeError, NullPointerException)
 *                 message:
 *                   type: string
 *                   description: The exception message
 *                 stackTrace:
 *                   type: string
 *                   description: The stack trace of the exception
 *                 language:
 *                   type: string
 *                   description: The programming language of the service
 *                 resolved:
 *                   type: boolean
 *                   description: Indicates if the exception has been resolved
 *                 resolutionDetails:
 *                   type: string
 *                   description: Details on how the exception was resolved
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   description: The time when the log was created
 *       404:
 *         description: Exception log not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error fetching exception log
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
export const getExceptionLogById = async (req: Request, res: Response) => {
    try {
        const log = await service.findById(req.params.id);
        if (!log) {
            return res.status(404).json({ message: 'Exception log not found' });
        }
        res.status(200).json(log);
    } 
    catch (error: any) {
        res.status(500).json({ message: 'Error fetching exception log', error: error.message });
    }
};