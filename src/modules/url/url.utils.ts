import { nanoid } from 'nanoid';

export const generateShortCode = (): string => nanoid(8);
