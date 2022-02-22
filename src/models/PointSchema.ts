import mongoose from 'mongoose';
import PointInterface from '../interfaces/PointInterface';

const PointSchema = new mongoose.Schema<PointInterface>(
    {
        x: {type: mongoose.Schema.Types.Number, required: true},
        y: {type: mongoose.Schema.Types.Number, required: true},
        z: {type: mongoose.Schema.Types.Number, required: true},
    },
    {
        timestamps: true
    }
);

export default mongoose.model<PointInterface>('Point', PointSchema);
