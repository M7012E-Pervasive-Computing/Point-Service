import { Schema } from 'mongoose';
import PointInterface from '../interfaces/PointInterface';

export const PointSchema = new Schema<PointInterface>(
    {
        pointId: { type: Schema.Types.String, required: true, unique: true},
        x: {type: Schema.Types.Number, required: true},
        y: {type: Schema.Types.Number, required: true},
        z: {type: Schema.Types.Number, required: true},
    },
    {
        timestamps: true
    }
);
