import mongoose, { Schema, Document } from "mongoose";

export interface Option {
    id: string;
    content: string;
    isCorrect: boolean;
}

export interface OptionSet {
    terms: Option[];
    definitions: Option[];
}

export interface Question {
    blooms_level: string;
    difficulty_level: string;
    options: Option[] | OptionSet;
    question: string;
    type: string;
    total_points: number;
}

export interface QuestionModel extends Question, Document { }


const optionSchema = new mongoose.Schema({
    id: { type: String, required: true },
    content: { type: String, required: true },
    isCorrect: { type: Boolean, required: true }
});

const optionSetSchema = new mongoose.Schema({
    terms: { type: [optionSchema], required: true },
    definitions: { type: [optionSchema], required: true }
});

const questionSchema = new mongoose.Schema({
    blooms_level: { type: String, required: true },
    difficulty_level: { type: String, required: true },
    options: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: function (options: any) {
                return options instanceof Array || options instanceof Object;
            },
            message: 'Options must be an array or an object'
        }
    },
    question: { type: String, required: true },
    type: { type: String, required: true },
    total_points: { type: Number, required: true }
});

export default mongoose.model<QuestionModel>('Question', questionSchema);
