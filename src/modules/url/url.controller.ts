import { Request, Response, NextFunction } from 'express';
import { UrlService } from './url.service';


const createShortUrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const shortUrl = await UrlService.createShortUrl(req.body);
        res.status(201).json({ shortUrl });
    } catch (err) {
        next(err);
    }
};

const redirectToOriginalUrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { shortUrl } = req.params;
        const longUrl = await UrlService.getOriginalUrl(shortUrl);
        res.redirect(longUrl);
    } catch (err) {
        next(err);
    }
};

export const UrlController = {
    createShortUrl,
    redirectToOriginalUrl
}