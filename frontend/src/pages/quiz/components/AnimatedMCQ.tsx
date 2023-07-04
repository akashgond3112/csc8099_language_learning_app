import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { keyframes } from "@emotion/react";

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

interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface QuestionProps {
  question: string;
  options: QuestionOption[];
  onAnswerSubmit: (selectedOption: QuestionOption | null) => void;
}

const AnimatedMcqQuestion: React.FC<QuestionProps> = ({
  question,
  options,
  onAnswerSubmit,
}) => {
  const [selectedOption, setSelectedOption] = useState<QuestionOption | null>(
    null
  );
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  const handleOptionClick = (option: QuestionOption) => {
    if (isAnswerSubmitted) return;

    setSelectedOption(option);
    setIsAnswerSubmitted(true);
    onAnswerSubmit(option);
  };

  return (
    <Box textAlign="center">
      <Typography variant="h6">{question}</Typography>
      <Box display="flex" justifyContent="center" mt={4}>
        {options.map((option) => (
          <BalloonOption
            key={option.id}
            onClick={() => handleOptionClick(option)}
          >
            {option.text}
          </BalloonOption>
        ))}
      </Box>
      {isAnswerSubmitted && (
        <Typography variant="body1" mt={4}>
          {selectedOption?.isCorrect ? "Correct answer!" : "Incorrect answer!"}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        disabled={isAnswerSubmitted}
        onClick={() => onAnswerSubmit(null)}
        sx={{ mt: 4 }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default AnimatedMcqQuestion;
