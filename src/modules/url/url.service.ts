import { redisClient } from '../../config/redis';
import { Url } from './url.model';
import { generateShortUrl } from './url.utils';

const createShortUrl = async (
    payload: {
        originalUrl: string,
        customShortUrl?: string
    }
): Promise<string> => {
    const { originalUrl, customShortUrl } = payload;
    const shortUrl = customShortUrl || generateShortUrl();

    const existing = await Url.findOne({ shortUrl });

    if (existing) {
        throw new Error('Short URL already exists.');
    }

    const url = new Url({ originalUrl, shortUrl });
    await url.save();
    return shortUrl;
};

const getOriginalUrl = async (shortUrl: string): Promise<string> => {
    const cachedUrl = await redisClient.get(shortUrl);
    if (cachedUrl) return cachedUrl;

    const url = await Url.findOne({ shortUrl });
    if (!url) throw new Error('URL not found.');

    await redisClient.set(shortUrl, url.originalUrl, { EX: 3600 });
    return url.originalUrl;
};

export const UrlService = {
    createShortUrl,
    getOriginalUrl
}
