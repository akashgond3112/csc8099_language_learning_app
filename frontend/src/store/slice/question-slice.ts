import { createSlice } from "@reduxjs/toolkit";
import { UserTestDetail } from "../../state/types";

const questionSlice = createSlice({
  name: "questions",
  initialState: {
    userTest: undefined as UserTestDetail | undefined,
    isLoading: true,
    err : undefined as Error | undefined
  },
  reducers: {
    startExamAction(state, action) {
      state.userTest = action.payload

    },
    moveNextPreviousQuestion(state, action) {
      state.userTest = action.payload
    },
    evaluate(state, action) {
      state.userTest =action.payload
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload
    },
    setError(state, action) {
      state.err =action.payload
    }
  },
});

export const { startExamAction, moveNextPreviousQuestion, evaluate, setIsLoading, setError } =
  questionSlice.actions;
export default questionSlice;
