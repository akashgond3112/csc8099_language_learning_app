import React, { useState } from "react";
import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  useTheme,
  Box,
  Typography,
} from "@mui/material";
import { QuestionsResponse } from "../../../state/types";

type Props = {
  question: QuestionsResponse;
};

function Fib({ question }: Props) {
  const [answer, setAnswer] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean>();
  const { palette } = useTheme();

  const handleSubmit = () => {
    console.log(answer);
    if (answer === question.options[0].content) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <Box>
      <Typography variant="h3" mb="-0.1rem">
        {question.question}
      </Typography>
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

      <Button
        sx={{ mt: 1, mr: 1 }}
        variant="outlined"
        color="primary"
        onClick={handleSubmit}
      >
        Check Answer
      </Button>
    </Box>
  );
}

export default Fib;
