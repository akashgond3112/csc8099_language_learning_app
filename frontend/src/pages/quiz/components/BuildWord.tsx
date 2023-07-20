import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import React, { useRef, useState } from "react";
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
  const [isHovered, setIsHovered] = useState(false);

  const disabledOptions = useRef<string[]>([]);

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
    console.log(word);
  };

  const clearField = () => {
    setSelectedOption("");
    setWord("");
    disabledOptions.current = [];
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
      {/* Question Box */}
      <Box sx={{ padding: "0.5rem", margin: "0.5rem" }}>
        <Typography variant="h2">{question.question}</Typography>
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
      {/* Text Field Box */}
      <Box
        sx={{
          padding: "0.5rem",
          margin: "0.5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ padding: "0.5rem", margin: "0.5rem" }}>
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
      </Box>

      <Box>
        <Typography variant="h6">Select the options below.</Typography>
      </Box>

      {/* Options Box*/}
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
