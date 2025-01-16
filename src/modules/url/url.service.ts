import { redisClient } from '../../config/redis';
import { Url } from './url.model';
import { generateShortCode } from './url.utils';

const createShortUrl = async (
    payload: {
        originalUrl: string,
        customShortCode?: string
    }
): Promise<string> => {
    const { originalUrl, customShortCode } = payload;
    const shortCode = customShortCode || generateShortCode();

    console.log({ shortCode });

    const existing = await Url.findOne({ shortCode });

    if (existing) {
        throw new Error('Short URL already exists.');
    }

    const urlDoc = new Url({ originalUrl, shortCode });
    await urlDoc.save();
    return `http://localhost:3000/api/v1/url/${shortCode}`;
};

const getOriginalUrl = async (shortCode: string): Promise<string> => {
    const cachedUrl = await redisClient.get(shortCode);
    if (cachedUrl) return cachedUrl;

    const result = await Url.findOne(
        { shortCode }
    );

    if (!result) throw new Error('URL not found.');

    await redisClient.set(shortCode, result.originalUrl, { EX: 3600 });
    return result.originalUrl;
};

export const UrlService = {
    createShortUrl,
    getOriginalUrl
}
