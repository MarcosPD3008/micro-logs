import { Request, Response } from 'express';
import { ServiceService } from '../../services/services.service';
import { FilterQuery } from 'mongoose';
import { Services } from '../../models/service.model';

const service = new ServiceService();

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Retrieve all services with optional filtering and pagination
 *     description: Retrieve a list of all services from the database. You can filter the results using query parameters and paginate the response.
 *     tags: 
 *       - Services
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter services by name
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
 *         description: A paginated list of services
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
 *                         description: The service ID
 *                       name:
 *                         type: string
 *                         description: The name of the service
 *                       description:
 *                         type: string
 *                         description: The description of the service
 *                 total:
 *                   type: integer
 *                   description: The total number of services that match the filter criteria
 *                 pageNumber:
 *                   type: integer
 *                   description: The current page number
 *                 totalPages:
 *                   type: integer
 *                   description: The total number of pages available
 *       500:
 *         description: Error fetching services
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
export const getServices = async (req: Request, res: Response) => {
    try {        
        const pageNumber = parseInt(req.query?.pageNumber as string) || 1;
        const pageSize = parseInt(req.query?.pageSize as string) || 10;
        
        const filters: FilterQuery<Services> = req.query;
        delete filters?.pageSize;
        delete filters?.pageNumber;

        const services = await service.findAll(filters, pageNumber, pageSize);
        res.status(200).json(services);
    } 
    catch (error: any) {
        res.status(500).json({ message: 'Error fetching services', error: error.message });
    }
};

/**
 * @swagger
 * /api/services/{id}:
 *   get:
 *     summary: Retrieve a single service by ID
 *     description: Retrieve a specific service entry by its unique ID.
 *     tags: 
 *       - Services
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The service ID
 *     responses:
 *       200:
 *         description: A single service entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The service ID
 *                 name:
 *                   type: string
 *                   description: The name of the service
 *                 description:
 *                   type: string
 *                   description: The description of the service
 *       404:
 *         description: Service not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error fetching service
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
export const getServiceById = async (req: Request, res: Response) => {
    try {
        const serviceEntity = await service.findById(req.params.id);
        if (!serviceEntity) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(200).json(serviceEntity);
    } 
    catch (error: any) {
        res.status(500).json({ message: 'Error fetching service', error: error.message });
    }
};

/**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Create a new service
 *     description: Create a new service entry in the database.
 *     tags: 
 *       - Services
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the service
 *               description:
 *                 type: string
 *                 description: The description of the service
 *     responses:
 *       201:
 *         description: Service created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The service ID
 *                 name:
 *                   type: string
 *                   description: The name of the service
 *                 description:
 *                   type: string
 *                   description: The description of the service
 *       500:
 *         description: Error creating service
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
export const createService = async (req: Request, res: Response) => {
    try {
        const serviceEntity = await service.create(req.body);
        res.status(201).json(serviceEntity);
    } 
    catch (error: any) {
        res.status(500).json({ message: 'Error creating service', error: error.message });
    }
};

/**
 * @swagger
 * /api/services/{id}:
 *   put:
 *     summary: Update an existing service by ID
 *     description: Update an existing service entry in the database by its unique ID.
 *     tags: 
 *       - Services
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The service ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the service
 *               description:
 *                 type: string
 *                 description: The description of the service
 *     responses:
 *       200:
 *         description: Service updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The service ID
 *                 name:
 *                   type: string
 *                   description: The name of the service
 *                 description:
 *                   type: string
 *                   description: The description of the service
 *       404:
 *         description: Service not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error updating service
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
export const updateService = async (req: Request, res: Response) => {
    try {
        const serviceEntity = await service.update(req.params.id, req.body);
        if (!serviceEntity) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(200).json(serviceEntity);
    } 
    catch (error: any) {
        res.status(500).json({ message: 'Error updating service', error: error.message });
    }
};

/**
 * @swagger
 * /api/services/{id}:
 *   delete:
 *     summary: Delete a service by ID
 *     description: Delete an existing service entry from the database by its unique ID.
 *     tags: 
 *       - Services
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The service ID
 *     responses:
 *       200:
 *         description: Service deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A confirmation message that the service was deleted
 *       404:
 *         description: Service not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error deleting service
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
export const deleteService = async (req: Request, res: Response) => {
    try {
        const serviceEntity = await service.delete(req.params.id);
        if (!serviceEntity) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(200).json({ message: 'Service deleted' });
    } 
    catch (error: any) {
        res.status(500).json({ message: 'Error deleting service', error: error.message });
    }
};
