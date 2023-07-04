import { Box, Typography } from "@mui/material";
import React from "react";
import FlexBetween from "../../../component/FlexBetween";
import Mcq from "./Mcq";
import FillBlankQuestion from "./FillBlank";
import MatchQuestion from "./MatchTheFollowing";
import AnimatedMcqQuestion from "./AnimatedMCQ";
import WordBuilder from "./BuildWord";

type Props = {};

interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

function Question({}: Props) {
  const handleFillInTheBlanksAnswerSubmit = (answer: string) => {
    console.log("Submitted answer:", answer);
  };

  const handleMatchTheFollowingAnswerSubmit = (answerOptions: string[]) => {
    console.log("Submitted answer options:", answerOptions);
  };

  const handleAnimatedMcqAnswerSubmit = (
    selectedOption: QuestionOption | null
  ) => {
    console.log("Submitted option:", selectedOption);
  };

  const options = ["Hel", "lo"];
  const handleWordBuilderSubmit = (value: string) => {
    console.log("Submitted value:", value);
    // Do something with the submitted value, e.g., make an API call
  };

  return (
    // <FlexBetween>
      <Box>
        {/* <Mcq /> */}
        <FillBlankQuestion
          question="Fill in the blank: OpenAI is a leading provider of ____."
          image="https://example.com/image.jpg"
          options={["A", "B", "C"]}
          onAnswerSubmit={handleFillInTheBlanksAnswerSubmit}
        />
        {/* <MatchQuestion
          question="Match the following:"
        questionOptions={['Question1', 'Question2', 'Question3']}
        answerOptions={['Answer 1', 'Answer 2', 'Answer 3']}
        onAnswerSubmit={handleMatchTheFollowingAnswerSubmit}
        /> */}
        {/* <AnimatedMcqQuestion
          question="What is the capital of France?"
          options={[
            { id: "option1", text: "Paris", isCorrect: true },
            { id: "option2", text: "London", isCorrect: false },
            { id: "option3", text: "Berlin", isCorrect: false },
          ]}
          onAnswerSubmit={handleAnimatedMcqAnswerSubmit}
        /> */}
        {/* <WordBuilder options={options} onSubmit={handleWordBuilderSubmit} /> */}
      </Box>
    // </FlexBetween>
  );
}

export default Question;
