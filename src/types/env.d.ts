export interface EnvVars {
    MONGODB_URI: string;
    RABBITMQ_URI: string;
    QUEUE_NAME: string;
}

declare global {
    namespace NodeJS {
        interface ProcessEnv extends EnvVars { }
    }
}