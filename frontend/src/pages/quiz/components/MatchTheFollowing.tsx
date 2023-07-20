import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { QuestionsResponse } from "../../../state/types";

type Props = {
  question: QuestionsResponse;
};

function MatchQuestion({ question }: Props) {
  const [isAnswerChanged, setIsAnswerChanged] = useState(false);
  const [matchedOptions, setMatchedOptions] = useState(
    question.options.definitions
  );

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
      console.log(matchedOptions);
      setIsAnswerChanged(false);
    }
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
      {/*Question  */}
      <Box>
        <Typography variant="h2">{question.question}</Typography>
      </Box>
      {/* Terms and Definitions Options */}
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 4,
            gap: 10,
          }}
        >
          <Box>
            <Typography variant="subtitle1">Question:</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {question.options.terms.map((option: any) => (
                <Box
                  sx={{
                    cursor: "grab",
                    py: 2,
                    px: 2,
                    borderRadius: 4,
                    boxShadow: 1,
                    backgroundColor: "background.paper",
                    width: "100%",
                  }}
                >
                  <Typography key={option.id} color={"black"}>
                    {option.content}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
          <Box>
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
                    {question.options.definitions.map(
                      (option: any, index: number) => (
                        <Draggable
                          key={option.id}
                          draggableId={option.id}
                          index={index}
                        >
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
                                width: "100%",
                              }}
                            >
                              <Typography color={"black"}>
                                {option.content}
                              </Typography>
                            </Box>
                          )}
                        </Draggable>
                      )
                    )}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </DragDropContext>
          </Box>
        </Box>
      </Box>
      <Box>
        {isAnswerChanged && (
          <Button
            variant="outlined"
            color="primary"
            onClick={handleSubmit}
            sx={{ mt: 1, mr: 1 }}
          >
            Check Answer
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default MatchQuestion;
