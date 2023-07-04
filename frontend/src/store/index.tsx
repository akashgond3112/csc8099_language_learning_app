import { configureStore } from "@reduxjs/toolkit";
import navSlice from "./slice/nav-slice";
import { api } from "../state/api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    nav: navSlice.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
