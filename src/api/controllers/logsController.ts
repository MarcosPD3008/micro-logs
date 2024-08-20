// src/api/controllers/logsController.ts
import { Request, Response } from 'express';
import { EntityLogService } from '../../services/entityLogs.service';
import { FilterQuery } from 'mongoose';
import { EntityLogs } from '../../models/entityLog.model';

const service = new EntityLogService();

/**
 * @swagger
 * /api/logs:
 *   get:
 *     summary: Retrieve all logs with optional filtering
 *     description: Retrieve a list of all entity logs from the database. You can filter the results using query parameters.
 *     tags: 
 *       - Logs
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
 *     responses:
 *       200:
 *         description: A list of logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The log ID
 *                   entityId:
 *                     type: string
 *                     description: The entity ID associated with the log
 *                   action:
 *                     type: string
 *                     description: The action performed (create, update, delete)
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     description: The time when the log was created
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
        const filters: FilterQuery<EntityLogs> = req.query;
        const logs = await service.findAll(filters);
        res.status(200).json(logs);
    } 
    catch (error:any) {
        res.status(500).json({ message: 'Error fetching logs', error: error.message });
    }
};

/**
 * @swagger
 * /api/logs/{id}:
 *   get:
 *     summary: Retrieve a single log by ID
 *     description: Retrieve a specific log entry by its unique ID.
 *     tags: 
 *       - Logs
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
