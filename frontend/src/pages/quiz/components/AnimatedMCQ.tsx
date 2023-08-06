import { useState } from "react";
import { Box, Typography, Alert, AlertTitle } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { keyframes } from "@emotion/react";
import { QuestionsResponse, UserTestItemResponses } from "../../../state/types";
import CustomButton from "../../../component/CustomButton";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useAppDispatch } from "../../../hooks/utils";
import { evaluateQuestion } from "../../../store/actions/question-action";

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
  padding: "2em",
}));

type Props = {
  userTestItemResponses: UserTestItemResponses;
};

function AnimatedMcqQuestion({ userTestItemResponses }: Props) {
  const question: QuestionsResponse = JSON.parse(userTestItemResponses.content);

  console.log(question);

  const axiosprivate = useAxiosPrivate();
  const dispatch = useAppDispatch();
  const key = window.location.pathname.split("/")[2];

  const { palette } = useTheme();
  const [selectedOption, setSelectedOption] = useState<any | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(
    userTestItemResponses.status === `completed`
  );
  const [isCorrect, setIsCorrect] = useState(
    userTestItemResponses?.isCorrect ?? false
  );

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
  };

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(
    userTestItemResponses.answer
  );

  const handleSubmit = () => {
    setIsAnswerSubmitted(true);
    setIsCorrect(selectedOption.isCorrect);
    setSelectedOptionId(selectedOption.id);

    let isMounted = true;
    const controller = new AbortController();

    dispatch(
      evaluateQuestion(isMounted, controller, key, axiosprivate, {
        userTestItemId: userTestItemResponses.testItemId,
        gainedPoints: isCorrect ? userTestItemResponses.totalPoints : 0,
        isCorrect,
        answer: selectedOption.id,
      })
    );

    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  return (
    <Box textAlign="center">
      <Typography variant="h2" sx={{ color: "white" }}>
        {question.question}
      </Typography>
      <Box display="flex" justifyContent="center" m={4} gap={3}>
        {question.options.map((option: any) => (
          <BalloonOption
            key={option.id}
            onClick={() => handleOptionClick(option)}
            style={{
              backgroundColor:
                selectedOption === option || selectedOptionId === option.id
                  ? `${palette.secondary.main}`
                  : `${palette.primary.main}`,
            }}
          >
            {option.content}
          </BalloonOption>
        ))}
      </Box>
      {isAnswerSubmitted && !isCorrect && (
        <Alert severity="error">
          <AlertTitle>Wrong</AlertTitle>
          Sorry, wrong answer!
        </Alert>
      )}
      {isAnswerSubmitted && isCorrect && (
        <Alert severity="success">
          <AlertTitle>Correct</AlertTitle>
          You got it!
        </Alert>
      )}
      {!isAnswerSubmitted && (
        <Box>
          <CustomButton
            text="Check Answer"
            onClick={handleSubmit}
            disabled={userTestItemResponses.status === `completed`}
          />
        </Box>
      )}
    </Box>
  );
}

export default AnimatedMcqQuestion;
