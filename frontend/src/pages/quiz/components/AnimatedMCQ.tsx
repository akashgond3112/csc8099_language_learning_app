import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { keyframes } from "@emotion/react";
import { QuestionsResponse } from "../../../state/types";

// Define keyframes for the balloon animation
const waveAnimation = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(10deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
`;

// Styled component for the balloon option
const BalloonOption = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 120,
  height: 120,
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  cursor: "pointer",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  animation: `${waveAnimation} 2s infinite`,
}));

type Props = {
  question: QuestionsResponse;
};

function AnimatedMcqQuestion({ question }: Props) {
  const [selectedOption, setSelectedOption] = useState<any | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    setIsAnswerSubmitted(true);
  };

  return (
    <Box textAlign="center">
      <Typography variant="h2">{question.question}</Typography>
      <Box display="flex" justifyContent="center" mt={4}>
        {question.options.map((option: any, i: number) => (
          <BalloonOption
            key={option.id}
            onClick={() => handleOptionClick(option)}
          >
            {option.content}
          </BalloonOption>
        ))}
      </Box>
      {isAnswerSubmitted && (
        <Typography variant="body1" mt={4}>
          {selectedOption?.isCorrect ? "Correct answer!" : "Incorrect answer!"}
        </Typography>
      )}
      <Button
        variant="outlined"
        color="primary"
        disabled={isAnswerSubmitted}
        onClick={() => handleSubmit()}
        sx={{ mt: 1, mr: 1 }}
      >
        Check Answer
      </Button>
    </Box>
  );
}

export default AnimatedMcqQuestion;
