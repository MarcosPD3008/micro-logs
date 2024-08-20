import { getChannel } from '../config/rabbitmq';
import entityLogHandler from './entityLogHandler';
import serviceHandler from './serviceHandler';

const handlers: { [key: string]: any } = {
    "service": serviceHandler,
    "entitylog": entityLogHandler
};

const MAX_RETRIES = 5;

export const Consume = async (queueName: string) => {
    const channel = getChannel();

    await channel.assertQueue(queueName, { durable: true });

    channel.consume(queueName, async (msg) => {
        if (msg !== null) {
            const content = msg.content.toString();
            console.log(`Received message in ${queueName}:`, content);

            if (!content) {
                console.error('Content is empty');
                channel.nack(msg, false, false); // Discard message
                return;
            }

            try {
                const data = JSON.parse(content);
                const type = (data.type as string).toLowerCase();

                const handler = handlers[type];

                if (!handler) {
                    console.error(`Handler for type ${type} not found`);
                    channel.nack(msg, false, false); // Discard message
                    return;
                }

                await handler(msg);
                channel.ack(msg); 
            } catch (err) {
                console.error('Error processing message:', err);

                const headers = msg.properties.headers || {};
                const retries = headers['x-retries'] || 0;

                if (retries < MAX_RETRIES) {
                    headers['x-retries'] = retries + 1;
                    channel.nack(msg, false, true); 
                } else {
                    console.error(`Max retries reached for message: ${content}`);
                    // Move to DLQ or discard
                    channel.nack(msg, false, false);
                }
            }
        }
    }, { noAck: false });
}
