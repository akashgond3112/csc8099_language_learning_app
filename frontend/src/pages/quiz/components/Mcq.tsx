import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Alert, AlertTitle, Box, useTheme } from "@mui/material";
import { QuestionsResponse, UserTestItemResponses } from "../../../state/types";
import CustomButton from "../../../component/CustomButton";
import { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useAppDispatch } from "../../../hooks/utils";
import { evaluateQuestion } from "../../../store/actions/question-action";

type Props = {
  userTestItemResponses: UserTestItemResponses;
};

function Mcq({ userTestItemResponses }: Props) {
  const question: QuestionsResponse = JSON.parse(userTestItemResponses.content);

  const { palette } = useTheme();
  const axiosprivate = useAxiosPrivate();
  const dispatch = useAppDispatch();
  const key = window.location.pathname.split("/")[2];

  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(
    userTestItemResponses.status === `completed`
  );
  const [isCorrect, setIsCorrect] = useState(
    userTestItemResponses?.isCorrect ?? false
  );

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    setError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsAnswerSubmitted(true);
    console.log(value);

    let isMounted = true;
    const controller = new AbortController();

    if (question.options[value].isCorrect) {
      setIsCorrect(true);
      setError(false);
    } else if (!question.options[value].isCorrect) {
      setError(true);
      setIsCorrect(false);
    } else {
      setError(true);
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
    <form
      onSubmit={handleSubmit}
      id={question.id}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FormControl sx={{ m: 3 }} error={error} variant="standard">
        <FormLabel
          id="demo-error-radios"
          sx={{ color: palette.grey[300], fontSize: 20 }}
        >
          {question.question}
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-error-radios"
          name="quiz"
          value={value}
          onChange={handleRadioChange}
        >
          {question.options.map((_option: any, i: number) => {
            return (
              <FormControlLabel
                id={_option.id}
                value={i}
                control={
                  <Radio
                    sx={{
                      color: palette.grey[300],
                      "&.Mui-checked": {
                        color: palette.grey[300],
                      },
                    }}
                  />
                }
                sx={{ color: "white" }}
                label={_option.content}
              />
            );
          })}
        </RadioGroup>
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
              type={"submit"}
              disabled={userTestItemResponses.status === `completed`}
            />
          </Box>
        )}
      </FormControl>
    </form>
  );
}

export default Mcq;
