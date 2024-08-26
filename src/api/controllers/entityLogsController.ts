import { Request, Response } from 'express';
import { EntityLogService } from '../../services/entityLogs.service';
import { FilterQuery } from 'mongoose';
import { EntityLogs } from '../../models/entityLog.model';

const service = new EntityLogService();

/**
 * @swagger
 * /api/entityLogs:
 *   get:
 *     summary: Retrieve all logs with optional filtering and pagination
 *     description: Retrieve a list of all entity logs from the database. You can filter the results using query parameters and paginate the response.
 *     tags: 
 *       - EntityLogs
 *     parameters:
 *       - in: query
 *         name: action
 *         schema:
 *           type: string
 *         description: Filter logs by action type (e.g., "create", "update", "delete")
 *       - in: query
 *         name: entityId
 *         schema:
 *           type: string
 *         description: Filter logs by entity ID
 *       - in: query
 *         name: timestamp
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter logs by timestamp
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
 *         description: A paginated list of logs
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
 *                       entityId:
 *                         type: string
 *                         description: The entity ID associated with the log
 *                       action:
 *                         type: string
 *                         description: The action performed (create, update, delete)
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
 *         description: Error fetching logs
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

export const getLogs = async (req: Request, res: Response) => {
    try {
        const pageNumber = parseInt(req.query?.pageNumber as string) || 1;
        const pageSize = parseInt(req.query?.pageSize as string) || 10;
        
        const filters: FilterQuery<EntityLogs> = req.query;
        delete filters?.pageSize;
        delete filters?.pageNumber;

        const logs = await service.findAll(filters, pageNumber, pageSize);
        res.status(200).json(logs);
    } 
    catch (error:any) {
        res.status(500).json({ message: 'Error fetching logs', error: error.message });
    }
};

/**
 * @swagger
 * /api/entityLogs/{id}:
 *   get:
 *     summary: Retrieve a single log by ID
 *     description: Retrieve a specific log entry by its unique ID.
 *     tags: 
 *       - EntityLogs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The log ID
 *     responses:
 *       200:
 *         description: A single log entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The log ID
 *                 entityId:
 *                   type: string
 *                   description: The entity ID associated with the log
 *                 action:
 *                   type: string
 *                   description: The action performed (create, update, delete)
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   description: The time when the log was created
 *       404:
 *         description: Log not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error fetching log
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
export const getLogById = async (req: Request, res: Response) => {
    try {
        const log = await service.findById(req.params.id);
        if (!log) {
            return res.status(404).json({ message: 'Log not found' });
        }
        res.status(200).json(log);
    } 
    catch (error: any) {
        res.status(500).json({ message: 'Error fetching log', error: error.message });
    }
};
