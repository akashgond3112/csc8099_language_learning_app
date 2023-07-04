import { Box, Button, TextField, useTheme } from "@mui/material";
import React, { useState } from "react";
import image from "../../../assets/images/Hello_Polish.jpg";
import FlexBetween from "../../../component/FlexBetween";

interface Props {
  options: string[];
  onSubmit: (value: string) => void;
}

const WordBuilder: React.FC<Props> = ({ options, onSubmit }) => {
  const { palette } = useTheme();
  const [selectedOption, setSelectedOption] = useState("");
  const [word, setWord] = useState("");

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setWord(word + option);
  };

  const handleSubmit = () => {
    onSubmit(word);
  };

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
          <img src={image} alt="Dummy Image" style={{ width: "50%" }} />
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
        {options.map((option, index) => (
          <Button
            key={index}
            variant="contained"
            color="primary"
            onClick={() => handleOptionSelect(option)}
            // disabled={selectedOption !== ""}
          >
            {option}
          </Button>
        ))}
      </Box>
      {selectedOption && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSubmit()}
          sx={{ mt: 4 }}
        >
          Submit
        </Button>
      )}
    </Box>
  );
};

export default WordBuilder;
