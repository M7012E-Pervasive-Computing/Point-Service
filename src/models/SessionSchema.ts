import { Schema } from 'mongoose';
import { PointSchema } from '../models/PointSchema'

export const SessionSchema: Schema = new Schema(
    {
        session: { type: Schema.Types.String, required: true, unique: true},
        points: { type: [PointSchema]}
    },
    {
        timestamps : true
    }
);