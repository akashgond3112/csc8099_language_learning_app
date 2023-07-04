import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

interface MatchQuestionProps {
  question: string;
  questionOptions: string[];
  answerOptions: string[];
  onAnswerSubmit: (answerOptions: string[]) => void;
}

const MatchQuestion: React.FC<MatchQuestionProps> = ({
  question,
  questionOptions,
  answerOptions,
  onAnswerSubmit,
}) => {
  const [isAnswerChanged, setIsAnswerChanged] = useState(false);
  const [matchedOptions, setMatchedOptions] = useState(answerOptions);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const updatedOptions = Array.from(matchedOptions);
    const [movedOption] = updatedOptions.splice(result.source.index, 1);
    updatedOptions.splice(result.destination.index, 0, movedOption);

    setMatchedOptions(updatedOptions);
    setIsAnswerChanged(true);
  };

  const handleSubmit = () => {
    if (isAnswerChanged) {
      onAnswerSubmit(matchedOptions);
      setIsAnswerChanged(false);
    }
  };

  return (
    <Box>
      <Typography variant="h2">{question}</Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Box sx={{ width: "50%", pr: 2 }}>
          <Typography variant="subtitle1">Question:</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {questionOptions.map((option) => (
              // <Typography key={option}>{option}</Typography>
              <Box
                sx={{
                  cursor: "grab",
                  py: 2,
                  px: 2,
                  borderRadius: 4,
                  boxShadow: 1,
                  backgroundColor: "background.paper",
                }}
              >
                <Typography key={option}>{option}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={{ width: "50%", pl: 2 }}>
          <Typography variant="subtitle1">Answer:</Typography>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="options">
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  {matchedOptions.map((option, index) => (
                    <Draggable key={option} draggableId={option} index={index}>
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            cursor: "grab",
                            py: 2,
                            px: 2,
                            borderRadius: 4,
                            boxShadow: 1,
                            backgroundColor: "background.paper",
                          }}
                        >
                          <Typography>{option}</Typography>
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        </Box>
      </Box>
      {isAnswerChanged && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 4 }}
        >
          Submit
        </Button>
      )}
    </Box>
  );
};

export default MatchQuestion;
