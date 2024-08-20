// src/api/routes/logsRoutes.ts
import { Router } from 'express';
import { getLogs, getLogById } from '../controllers/logsController';

const router = Router();

// Route to get all logs
router.get('/', getLogs);

// Route to get a log by ID
router.get('/:id', getLogById);

export default router;
