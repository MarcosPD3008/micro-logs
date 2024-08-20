import amqp, { Connection, Channel } from 'amqplib';

let connection: Connection;
let channel: Channel;

export const connectRabbitMQ = async (): Promise<void> => {
    try {
        connection = await amqp.connect(process.env.RABBITMQ_URI as string);
        channel = await connection.createChannel();
        console.log('Connected to RabbitMQ successfully');
    } catch (err) {
        console.error('Failed to connect to RabbitMQ:', err);
        process.exit(1);
    }
};

export const getChannel = (): Channel => {
    if (!channel) {
        throw new Error('RabbitMQ channel is not initialized');
    }
    return channel;
};
