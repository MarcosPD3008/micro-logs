import connectDB from "./config/db";
import dotenv from 'dotenv';
import { connectRabbitMQ } from "./config/rabbitmq";
import { Consume } from "./consumer";
import { runServer } from "./api/server";
import { EntityMockData, exceptionsMockData } from "./services/mock.service";

const run = async () => {
    try{
        dotenv.config();
        await connectDB();
        await connectRabbitMQ();
    
        await Consume(process.env.QUEUE_NAME as string);
        await runServer();
        console.log('Server started');

        // EntityMockData();
        // exceptionsMockData();
    }
    catch(err){
        console.error('Error running app:', err);
    }
}

run().catch(err => console.error('Error:', err));