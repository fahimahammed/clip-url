import app from './app';
import { connectDB } from './config/db';
import { config } from './config/env';
import { connectRedis } from './config/redis';

async function run() {
    await connectDB();
    await connectRedis();

    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
    });
};

run();