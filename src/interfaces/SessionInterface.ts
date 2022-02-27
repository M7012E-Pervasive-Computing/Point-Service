import { Schema } from "mongoose";

export default interface Session extends Document {
    sessionName : String;
    points: Schema[];
}