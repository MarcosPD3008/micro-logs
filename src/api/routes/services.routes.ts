import { Router } from 'express';
import { getServiceById, getServices, createService, updateService, deleteService } from '../controllers/servicesController';

const router = Router();

router.get('/', getServices);
router.get('/:id', getServiceById);
router.post('/', createService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

export default router;
