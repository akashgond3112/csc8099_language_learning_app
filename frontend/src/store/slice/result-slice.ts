import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface ResultState {
  userId: string;
  result: number[];
}

// Define the initial state using that type
const initialState: ResultState = {
  userId: "",
  result: [],
};

const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setResult(state, action: PayloadAction<number>) {
      state.result.push(action.payload);
    },
  },
});

export const { setUserId, setResult } = resultSlice.actions;
export default resultSlice;
