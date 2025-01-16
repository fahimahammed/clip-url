import { createClient } from 'redis';
import { config } from './env';

export const redisClient = createClient({
    url: config.redisUri,
});

redisClient.on('error', (err) => console.error(err));

export const connectRedis = async (): Promise<void> => {
    try {
        await redisClient.connect();
        console.log('Redis connected successfully');
    } catch (error) {
        console.error('Connection Error - Redis: ', error);
        process.exit(1);
    }
};
