import { useState } from "react";
import { Box, Typography, Alert, AlertTitle } from "@mui/material";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { QuestionsResponse, UserTestItemResponses } from "../../../state/types";
import CustomButton from "../../../component/CustomButton";

type Props = {
  userTestItemResponses: UserTestItemResponses;
};

function MatchQuestion({ userTestItemResponses }: Props) {
  const question: QuestionsResponse = JSON.parse(userTestItemResponses.content);

  const [isAnswerChanged, setIsAnswerChanged] = useState(false);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(
    userTestItemResponses.status === `completed`
  );
  const [isCorrect, setIsCorrect] = useState(
    userTestItemResponses?.isCorrect ?? false
  );
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
     setIsAnswerSubmitted(true);
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
        <Typography variant="h2" color={"white"}>
          {question.question}
        </Typography>
      </Box>
      {/* Terms and Definitions Options */}
      <Box sx={{ paddingBottom: "2em" }}>
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
      {!isAnswerSubmitted && isAnswerChanged && (
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

export default MatchQuestion;
