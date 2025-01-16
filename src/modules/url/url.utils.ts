import { nanoid } from 'nanoid';

export const generateShortUrl = (): string => nanoid(8);
