import Point from './PointInterface'

export default interface Session extends Document {
    session : string;
    points: Point[];
    sessionId: string;
}