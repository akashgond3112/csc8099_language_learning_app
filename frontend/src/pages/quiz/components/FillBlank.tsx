import { useState } from "react";
import { TextField, Box, Typography, Alert, AlertTitle } from "@mui/material";
import { QuestionsResponse, UserTestItemResponses } from "../../../state/types";
import CustomButton from "../../../component/CustomButton";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useAppDispatch } from "../../../hooks/utils";
import { evaluateQuestion } from "../../../store/actions/question-action";

type Props = {
  userTestItemResponses: UserTestItemResponses;
};

function Fib({ userTestItemResponses }: Props) {
  const question: QuestionsResponse = JSON.parse(userTestItemResponses.content);

  const axiosprivate = useAxiosPrivate();
  const dispatch = useAppDispatch();
  const key = window.location.pathname.split("/")[2];

  const [answer, setAnswer] = useState<string>("");
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(
    userTestItemResponses.status === `completed`
  );
  const [isCorrect, setIsCorrect] = useState(
    userTestItemResponses?.isCorrect ?? false
  );

  const handleSubmit = () => {
    let isMounted = true;
    const controller = new AbortController();

    console.log(answer);
    setIsAnswerSubmitted(true);
    if (answer === question.options[0].content) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }

    dispatch(
      evaluateQuestion(isMounted, controller, key, axiosprivate, {
        userTestItemId: userTestItemResponses.testItemId,
        gainedPoints: isCorrect ? userTestItemResponses.totalPoints : 0,
        isCorrect,
      })
    );

    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography variant="h2" color={"white"}>
          {question.question}
        </Typography>
      </Box>
      <Box>
        {answer.length > 1 ? (
          <TextField
            label="Enter your answer"
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
            sx={{ background: "white" }}
            color={isCorrect ? "success" : "error"}
            helperText={isCorrect ? "Correct entry." : "Incorrect entry."}
          />
        ) : (
          <TextField
            label="Enter your answer"
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
            sx={{ background: "white" }}
          />
        )}
      </Box>
      {/* Evaluation */}
      {isAnswerSubmitted && !isCorrect && (
        <Alert severity="error">
          <AlertTitle>InCorrect</AlertTitle>
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

export default Fib;
