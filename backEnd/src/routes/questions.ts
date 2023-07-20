import express from "express";
import Questions from "../models/Questions.js"

const router = express.Router();

router.get("/", async (req, res) => {
    console.log("Questions :");
    try {
        const questions = await Questions.find();

        console.log("Questions :", questions);

        res.status(200).json(questions);
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
});

export default router;