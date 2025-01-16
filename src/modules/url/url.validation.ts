import { z } from 'zod';

export const shortenUrlSchema = z.object({
    body: z.object({
        originalUrl: z.string().url(),
        customShortUrl: z.string().max(20).optional(),
    })
});