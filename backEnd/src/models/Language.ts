import mongoose, { Schema, Document } from "mongoose";

export interface word {
  translation: string;
  word: string;
  id: string;
  difficulty_level: string;
  blooms_level: string;
  total_points: number;
  romanization: string;
}

export interface language {
  lng: string;
  flag: string;
  voice: string;
  words: Array<word>;
}

export interface LanguagesModel extends language, Document {}

const wordsObject = {
  word: { type: String },
  translation: { type: String },
  romanization: { type: String },
  id: { type: String },
  difficulty_level: { type: String },
  blooms_level: { type: String },
  total_points: { type: Number },
};

const LanguagesSchema = new Schema(
  {
    lng: { type: String },
    flag: { type: String },
    voice: { type: String },
    words: [wordsObject],
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<LanguagesModel>("languages", LanguagesSchema);
