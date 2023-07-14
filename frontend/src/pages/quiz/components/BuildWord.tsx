import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import image from "../../../assets/images/Hello_Polish.jpg";
import FlexBetween from "../../../component/FlexBetween";
import { QuestionsResponse } from "../../../state/types";

type Props = {
  question: QuestionsResponse;
};

const WordBuilder: React.FC<Props> = ({ question }) => {
  const { palette } = useTheme();
  const [selectedOption, setSelectedOption] = useState("");
  const [word, setWord] = useState("");

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setWord(word + option);
  };

  const handleSubmit = () => {};

  return (
    <Box>
      <FlexBetween flexDirection={"column"} justifyContent={"center"}>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "35vh", // Set the desired height of the container
          }}
        >
          <Typography variant="h6">{question.question}</Typography>
          <img src={image} alt="Dummy" style={{ width: "50%" }} />
        </Box>
        <Box mt={2}>
          <TextField
            id="outlined-basic"
            label="Build a word"
            value={word}
            disabled
            sx={{
              backgroundColor: palette.grey[300],
              color: palette.grey[300],
            }}
          />
        </Box>
      </FlexBetween>
      <Box
        mt={2}
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
            // disabled={selectedOption !== ""}
          >
            {option}
          </Button>
        ))}
      </Box>
      {selectedOption && (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleSubmit()}
          sx={{ mt: 1, mr: 1 }}
        >
          Check Answer
        </Button>
      )}
    </Box>
  );
};

export default WordBuilder;
