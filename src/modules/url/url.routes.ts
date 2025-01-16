import { Router } from 'express';
import { UrlController } from './url.controller';

const router = Router();

router.post('/', UrlController.createShortUrl);
router.get('/:shortUrl', UrlController.redirectToOriginalUrl);

export const UrlRoutes = router;
