import express from 'express';
import { UrlRoutes } from './modules/url/url.routes';
// import urlRoutes from './modules/url/route';
// import { rateLimiter } from './middlewares/rateLimiter';
// import { errorHandler } from './middlewares/errorHandler';
// import { applySecurityMiddlewares } from './middlewares/security';

const app = express();

app.use(express.json());
// applySecurityMiddlewares(app);
// app.use(rateLimiter);

app.use('/api/v1/url', UrlRoutes);
// app.use(errorHandler);

export default app;
