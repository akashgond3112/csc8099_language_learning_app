import { createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
  name: "nav",
  initialState: { firstLanguage: "English", secondLanguage: null },
  reducers: {
    setFirstLanguage(state, action) {
      state.firstLanguage = action.payload.firstLangauge;
    },
    setSecondLanguage(state, action) {
      state.firstLanguage = action.payload.firstLangauge;
    },
  },
});

export const navActions = navSlice.actions;
export default navSlice;
