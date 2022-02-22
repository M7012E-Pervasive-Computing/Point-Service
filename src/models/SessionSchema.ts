import mongoose from 'mongoose';
import PointSchema from '../models/PointSchema';
import SessionInterface from '../interfaces/SessionInterface';

const SessionSchema = new mongoose.Schema<SessionInterface>(
    {
        session: { type: mongoose.Schema.Types.String, required: true, unique: true},
        points: { type: [PointSchema]}
    },
    {
        timestamps : true
    }
);

export default mongoose.model<SessionInterface>('Session', SessionSchema); 