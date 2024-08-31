import express, { Application } from 'express';
import cors from 'cors';  // Import the CORS package
import { addSwagger } from './swagger';
import routes from './routes/routes';

export const runServer = async () => {
    const app: Application = express();
    
    app.use(cors());
    
    app.use(express.json());
    
    app.use('/api', routes);
    
    addSwagger(app);
    const PORT = process.env.API_PORT || 3000;
    
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
