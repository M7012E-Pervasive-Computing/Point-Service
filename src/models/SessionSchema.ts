import mongoose from 'mongoose';
import { PointSchema } from './PointSchema';
import SessionInterface from '../interfaces/SessionInterface';

export const SessionSchema = new mongoose.Schema({
  sessionName: { type: String, required: true, unique: true },
  points: { type: [PointSchema], required: true, default: [] }
});

SessionSchema.post<SessionInterface>('save', function () {});

export default mongoose.model<SessionInterface>('Session', SessionSchema);
