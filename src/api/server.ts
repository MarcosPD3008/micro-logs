import express, { Application } from 'express';
import logsRoutes from './routes/entityLogs.routes';
import { addSwagger } from './swagger';


export const runServer = async () => {
    const app: Application = express();
    
    app.use(express.json());
    
    // Add Routes
    app.use('/api/logs', logsRoutes);
    
    addSwagger(app);
    const PORT = process.env.API_PORT || 3000;
    
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
