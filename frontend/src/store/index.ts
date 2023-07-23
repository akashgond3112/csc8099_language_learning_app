import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import navSlice from "./slice/nav-slice";
import questionSlice from "./slice/question-slice";
import resultSlice from "./slice/result-slice";
import socketSlice from "./slice/socket-slice";
import { api } from "../state/api";
import authSlice from "./slice/auth-slice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    nav: navSlice.reducer,
    questions: questionSlice.reducer,
    result: resultSlice.reducer,
    socket: socketSlice.reducer,
    auth: authSlice.reducer
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
