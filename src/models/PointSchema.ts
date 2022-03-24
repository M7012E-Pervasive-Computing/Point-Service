import mongoose from 'mongoose';
import PointInterface from '../interfaces/PointInterface';

export const PointSchema = new mongoose.Schema(
  {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    z: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);

PointSchema.post<PointInterface>('save', function () {});

export default mongoose.model<PointInterface>('Point', PointSchema);
