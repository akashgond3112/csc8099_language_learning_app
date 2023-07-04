import React, { useState } from "react";
import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";

interface FillBlankQuestionProps {
  question: string;
  image: string;
  options: string[];
  onAnswerSubmit: (answer: string) => void;
}

const FillBlankQuestion: React.FC<FillBlankQuestionProps> = ({
  question,
  image,
  options,
  onAnswerSubmit,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
    setAnswer(event.target.value);
  };

  const handleSubmit = () => {
    onAnswerSubmit(answer);
    setAnswer("");
  };

  return (
    <div>
      <h2>{question}</h2>
      <img src={image} alt="Question Image" />

      <FormControl component="fieldset">
        <FormLabel component="legend">Select the correct answer:</FormLabel>
        <RadioGroup value={selectedOption} onChange={handleOptionChange}>
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <TextField
        label="Enter your answer"
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
        fullWidth
        variant="outlined"
        margin="normal"
      />

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default FillBlankQuestion;
