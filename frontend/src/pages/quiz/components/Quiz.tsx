import { Box, Typography } from "@mui/material";
import FlexBetween from "../../../component/FlexBetween";
import CustomButton from "../../../component/CustomButton";
import { useEffect } from "react";
import {
  MoveNextQuestion,
  MovePreviousQuestion,
} from "../../../store/actions/question-action";
import { useAppSelector, useAppDispatch } from "../../../hooks/utils";
import { useGetQuestionsQuery } from "../../../state/api";
import Question from "./Question";

function Quiz() {
  const dispatch = useAppDispatch();

  const { data, error, isLoading, isFetching, isSuccess } =
    useGetQuestionsQuery();

  const trace = useAppSelector((state) => state.questions.trace);

  useEffect(() => {
    console.log(trace);
  }, [trace]);

  function onNext() {
    if (data !== undefined && trace < data.length) {
      console.log("Clicked on Next" + data.length);
      dispatch(MoveNextQuestion());
    } else {
      return;
    }
  }

  function onPrevious() {
    console.log("Clicked on Previous");
    if (trace > 0) {
      dispatch(MovePreviousQuestion());
    } else {
      return;
    }
  }

  return (
    <Box>
      {/* display Question */}
      <Box padding={10}>
        {isLoading && <Typography>Loading...</Typography>}
        {error && <Typography>Something went wrong</Typography>}
        {isFetching && <Typography>Fetching...</Typography>}
        {isSuccess && <Question ques={data[trace]} />}
      </Box>
      {/* display Next previous buttons */}
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <CustomButton text="Previous" onClick={onPrevious} />
        </Box>
        <Box>
          <CustomButton text="Next" onClick={onNext} />
        </Box>
      </Box>
    </Box>
  );
}

export default Quiz;
