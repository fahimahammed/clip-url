import { z } from "zod";

export const shortenUrlSchema = z.object({
    body: z.object({
        originalUrl: z.string().url().refine((url) => {
            const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
            return regex.test(url);
        }, {
            message: "URL must be valid and use http, https, or ftp protocols."
        }),
        customShortCode: z.string().max(20).optional(),
    })
});