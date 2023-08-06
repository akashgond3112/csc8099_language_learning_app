import {
  Alert,
  AlertTitle,
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import image from "../../../assets/images/Hello_Polish.jpg";
import { QuestionsResponse, UserTestItemResponses } from "../../../state/types";
import CustomButton from "../../../component/CustomButton";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useAppDispatch } from "../../../hooks/utils";
import { evaluateQuestion } from "../../../store/actions/question-action";

type Props = {
  userTestItemResponses: UserTestItemResponses;
};

const WordBuilder: React.FC<Props> = ({ userTestItemResponses }) => {
  const question: QuestionsResponse = JSON.parse(userTestItemResponses.content);

  /* Utilities Variables */
  const axiosprivate = useAxiosPrivate();
  const dispatch = useAppDispatch();
  const key = window.location.pathname.split("/")[2];
  const { palette } = useTheme();

  /* State maintainence */
  const [selectedOption, setSelectedOption] = useState("");
  const [word, setWord] = useState(userTestItemResponses?.answer ?? "");
  const [isHovered, setIsHovered] = useState(false);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(
    userTestItemResponses.status === `completed`
  );
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(
    userTestItemResponses?.isCorrect ?? false
  );

  /* Refrence of selected option */
  const disabledOptions = useRef<string[]>([]);

  /* Handling functions  */
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const iconStyles = {
    width: "20px",
    height: "20px",
    transition: "all 0.4s ease-in-out",
    transform: isHovered
      ? "rotate(360deg) scale(1.2)"
      : "rotate(0deg) scale(1)",
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setWord(word + option);
    disabledOptions.current.push(option);
  };

  const isOptionDisabled = (option: string) => {
    return disabledOptions.current.includes(option);
  };

  const handleSubmit = () => {
    setIsAnswerSubmitted(true);
    const isCorrect: boolean = word === "Hello";
    setIsAnswerCorrect(isCorrect);
    console.log(word);

    const controller = new AbortController();
    let isMounted = true;

    dispatch(
      evaluateQuestion(isMounted, controller, key, axiosprivate, {
        userTestItemId: userTestItemResponses.testItemId,
        gainedPoints: isCorrect ? userTestItemResponses.totalPoints : 0,
        isCorrect:isCorrect,
        answer: word,
      })
    );

    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  const clearField = () => {
    setSelectedOption("");
    setWord("");
    disabledOptions.current = [];
  };

  /* Return component */
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Question Box */}
      <Box sx={{ padding: "0.5rem", margin: "0.5rem" }}>
        <Typography variant="h2" sx={{ color: "white" }}>
          {question.question}
        </Typography>
      </Box>
      {/*Image Box */}
      <Box
        sx={{
          padding: "0.5rem",
          margin: "0.5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={image} alt="Dummy" style={{ width: "30%" }} />
      </Box>
      {/* Text Field Container */}
      <Box
        sx={{
          padding: "0.5rem",
          margin: "0.5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Text Field Box */}
        <Box sx={{ padding: "0.4rem", margin: "0.4rem", width: "100px" }}>
          <TextField
            id="outlined-basic"
            value={word}
            disabled
            sx={{
              backgroundColor: palette.grey[300],
              color: palette.grey[300],
            }}
          />
        </Box>
        {/* Reload Button */}
        {!isAnswerSubmitted && (
          <>
            <Box>
              <Button onClick={() => clearField()}>
                <img
                  alt="reload"
                  className="icon"
                  src="https://htmlacademy.ru/assets/icons/reload-6x-white.png"
                  width={"15px"}
                  style={iconStyles}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              </Button>
            </Box>
            <Box>
              <Typography variant="h6">Select the options below.</Typography>
            </Box>
          </>
        )}
      </Box>

      {/* Options Box*/}
      {!isAnswerSubmitted &&
        selectedOption.length !== question.options.length && (
          <Box sx={{ padding: "0.5rem", margin: "0.5rem" }}>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {question.options.map((option: any, index: number) => (
                <Button
                  key={index}
                  variant="contained"
                  color="primary"
                  onClick={() => handleOptionSelect(option.content)}
                  disabled={isOptionDisabled(option.content)}
                >
                  {option.content}
                </Button>
              ))}
            </Box>
          </Box>
        )}

      {/* Evaluation */}
      {isAnswerSubmitted && !isAnswerCorrect && (
        <Alert severity="error">
          <AlertTitle>InCorrect</AlertTitle>
          Sorry, wrong answer!
        </Alert>
      )}
      {isAnswerSubmitted && isAnswerCorrect && (
        <Alert severity="success">
          <AlertTitle>Correct</AlertTitle>
          You got it!
        </Alert>
      )}

      {!isAnswerSubmitted &&
        selectedOption.length === question.options.length && (
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
};

export default WordBuilder;
