import { Router } from 'express';
import { UrlController } from './url.controller';
import validateRequest from '../../middlewares/validateRequest';
import { shortenUrlSchema } from './url.validation';

const router = Router();

router.post(
    '/',
    validateRequest(shortenUrlSchema),
    UrlController.createShortUrl
);
router.get('/:shortUrl', UrlController.redirectToOriginalUrl);

export const UrlRoutes = router;
