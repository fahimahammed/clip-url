import { Document } from "mongoose";

export interface ILinkRecord extends Document {
    originalUrl: string;
    shortUrl: string;
    clickCount: number;
}