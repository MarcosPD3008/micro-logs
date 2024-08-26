import { Router } from 'express';
import { getLogs, getLogById } from '../controllers/entityLogsController';

const router = Router();

router.get('/', getLogs);
router.get('/:id', getLogById);

export default router;
