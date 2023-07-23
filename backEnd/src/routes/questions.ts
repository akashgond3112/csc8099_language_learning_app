import express from "express";
import Questions from "../models/Questions.js"

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const questions = await Questions.find();
        res.status(200).json(questions);
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
});

export default router;