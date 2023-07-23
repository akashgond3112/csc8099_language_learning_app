import { createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
  name: "nav",
  initialState: {
    firstLanguage: null,
    firstLanguageImageUrl: null,
    secondLanguage: null,
    secondLanguageImageUrl: null,
    imageUrl: null
  },
  reducers: {
    setFirstLanguage(state, action) {
      state.firstLanguage = action.payload;
    },

    setFirstLanguageImageUrl(state, action) {
      state.firstLanguageImageUrl = action.payload;
    },
    setSecondLanguage(state, action) {
      state.secondLanguage = action.payload;
    },
    setSecondLanguageImageUrl(state, action) {
      state.secondLanguageImageUrl = action.payload;
    },
    setImageUrl(state, action) {
      state.imageUrl = action.payload;
    }
  },
});

export const {
  setFirstLanguage,
  setFirstLanguageImageUrl,
  setSecondLanguage,
  setSecondLanguageImageUrl,
  setImageUrl
} = navSlice.actions;
export default navSlice;
