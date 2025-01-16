import mongoose from 'mongoose';
import { config } from './env';

export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(config.mongoUri);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Connection error - MONGODB: ', error);
        process.exit(1);
    }
};
