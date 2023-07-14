import express from "express";
import LeaderBoards from "../models/LeaderBoards.js";
// LeaderBoards

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const leaderBoards = await LeaderBoards.find();

    console.log("leaderBoards :", leaderBoards);

    res.status(200).json(leaderBoards);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});

export default router;
