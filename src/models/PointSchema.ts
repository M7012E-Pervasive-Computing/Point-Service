import { Schema } from 'mongoose';
import PointInterface from '../interfaces/PointInterface';

export const PointSchema = new Schema<PointInterface>(
    {
        x: {type: Schema.Types.Number, required: true},
        y: {type: Schema.Types.Number, required: true},
        z: {type: Schema.Types.Number, required: true},
    },
    {
        timestamps: true
    }
);
