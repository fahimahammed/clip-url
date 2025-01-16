import express from 'express';
import { UrlRoutes } from './modules/url/url.routes';
import { errorHandler } from './middlewares/errorHandler';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import helmet from 'helmet';
import { seedUrls } from './utils/seed';

const app = express();

// seedUrls();

app.use(express.json());
app.use(helmet());
app.use(cors({ origin: '*' }));

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: 'Too many requests. Try again later.',
});

app.use(rateLimiter);

app.use('/api/v1/url', UrlRoutes);
app.use(errorHandler);

export default app;
