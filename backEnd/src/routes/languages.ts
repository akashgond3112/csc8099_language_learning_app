import express from "express";
import Languages from "../models/Language.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const wordLimit = Number(
      req.query.noOfWords !== undefined ? req.query.noOfWords : 10
    );
    const lng = String(req.query.lng !== undefined ? req.query.lng : "french");
    const difficultyLevel = String(
      req.query.difficultyLevel !== undefined
        ? req.query.difficultyLevel
        : "easy"
    );
    const bloomsLevel = String(
      req.query.bloomsLevel !== undefined
        ? req.query.bloomsLevel
        : "Comprehension"
    );

    console.log(wordLimit, lng, difficultyLevel, bloomsLevel);

    const pipeline = [
      {
        $match: {
          lng: `${lng}`,
          "words.difficulty_level": `${difficultyLevel}`,
          "words.blooms_level": `${bloomsLevel}`,
        },
      },
      {
        $project: {
          lng: 1,
          flag: 1,
          voice: 1,
          words: {
            $filter: {
              input: "$words",
              as: "word",
              cond: {
                $and: [
                  { $eq: ["$$word.difficulty_level", difficultyLevel] },
                  { $eq: ["$$word.blooms_level", `${bloomsLevel}`] },
                ],
              },
            },
          },
        },
      },
      {
        $project: {
          lng: 1,
          flag: 1,
          voice: 1,
          words: { $slice: ["$words", wordLimit] },
        },
      },
    ];

    const languages = await Languages.aggregate(pipeline);
    res.status(200).json(languages);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});

export default router;
