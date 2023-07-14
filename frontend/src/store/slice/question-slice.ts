import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
  name: "questions",
  initialState: {
    queue: [],
    answers: [],
    trace: 0,
  },
  reducers: {
    startExamAction(state, action) {
      return {
        ...state,
        queue: action.payload,
      };
    },
    moveNextQuestion(state) {
      return {
        ...state,
        trace: state.trace + 1,
      };
    },
    movePreviousQuestion(state) {
      return {
        ...state,
        trace: state.trace + -1,
      };
    },
  },
});

export const { startExamAction, moveNextQuestion, movePreviousQuestion } =
  questionSlice.actions;
export default questionSlice;
