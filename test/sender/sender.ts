import amqp from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

const sendMessage = async (queueName: string, message: any) => {
    try {
        // Connect to RabbitMQ server
        const connection = await amqp.connect(process.env.RABBITMQ_URI as string);
        const channel = await connection.createChannel();

        // Ensure the queue exists
        await channel.assertQueue(queueName, {
            durable: true, // Queue will survive broker restarts
        });

        // Send the message to the queue
        const msgBuffer = Buffer.from(JSON.stringify(message));
        channel.sendToQueue(queueName, msgBuffer, {
            persistent: true, // Marks the message as persistent
        });

        console.log(`Sent message to queue "${queueName}":`, message);

        // Close the connection
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Error sending message:', error);
    }
};

// Example usage
const run = async () => {
    const queueName = process.env.QUEUE_NAME || 'MicroLogs';
    const message = {
        type: 'Service',
        data: {
            name: 'service1234',
            description:"This is a service",
        },
    };

    await sendMessage(queueName, message);
};

run();
