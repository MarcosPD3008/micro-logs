import connectDB from "./config/db";
import dotenv from 'dotenv';
import { connectRabbitMQ } from "./config/rabbitmq";
import { Consume } from "./consumer";

const run = async () => {
    dotenv.config();
    await connectDB();
    await connectRabbitMQ();

    await Consume(process.env.QUEUE_NAME as string);
    console.log('Server started');
}

run().catch(err => console.error('Error:', err));