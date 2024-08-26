import { Router } from 'express';
import { getExceptionLogById, getExceptionLogs } from '../controllers/exceptionLogController';

const router = Router();

router.get('/', getExceptionLogs);
router.get('/:id', getExceptionLogById);

export default router;
