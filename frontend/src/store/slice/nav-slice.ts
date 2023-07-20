import { createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
  name: "nav",
  initialState: {
    firstLanguage: null,
    secondLanguage: null,
    secondLanguageImageUrl: null,
  },
  reducers: {
    setFirstLanguage(state, action) {
      state.firstLanguage = action.payload;
    },
    setSecondLanguage(state, action) {
      state.secondLanguage = action.payload;
    },
    setSecondLanguageImageUrl(state, action) {
      state.secondLanguageImageUrl = action.payload;
    },
  },
});

export const {
  setFirstLanguage,
  setSecondLanguage,
  setSecondLanguageImageUrl,
} = navSlice.actions;
export default navSlice;
