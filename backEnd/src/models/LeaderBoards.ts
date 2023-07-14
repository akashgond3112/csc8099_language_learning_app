import mongoose, { Schema, Document } from "mongoose";

export interface LeaderBoard {
  name: string;
  location: string;
  score: number;
  img: string;
  date: string;
}

export interface LeaderBoardModel extends LeaderBoard, Document {}

const LeaderBoardSchema: Schema = new Schema(
  {
    name: { type: String },
    location: { type: String },
    score: { type: Number },
    img: { type: String },
    date: { type: String },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<LeaderBoardModel>(
  "leaderBoard",
  LeaderBoardSchema
);
