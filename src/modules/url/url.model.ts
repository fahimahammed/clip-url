import mongoose, { Schema } from 'mongoose';
import { ILinkRecord } from './url.interface';

const urlSchema = new Schema<ILinkRecord>(
    {
        originalUrl: {
            type: String,
            required: true
        },
        shortCode: {
            type: String,
            required: true,
            unique: true
        },
        clickCount: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

urlSchema.index({ shortCode: 1 });

export const Url = mongoose.model<ILinkRecord>('Url', urlSchema);
