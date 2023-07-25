import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  LeaderBoardResponse,
  QuestionsResponse,
  NewFlashCardResponse,
} from "./types";
import axios from "axios";


export interface GetFlashCardsParams {
  noOfWords: number;
  lng: string;
  difficultyLevel: string;
  bloomsLevel: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8081",
  }),
  reducerPath: "main",
  tagTypes: ["Questions", "LeaderBoard", "FlashCards"],
  endpoints: (build) => ({
    getQuestions: build.query<Array<QuestionsResponse>, void>({
      query: () => "/questions",
      providesTags: ["Questions"],
    }),
    getLeaderBoard: build.query<Array<LeaderBoardResponse>, void>({
      query: () => "/leaderBoards",
      providesTags: ["LeaderBoard"],
    }),
    getFlashCards: build.query<
      Array<NewFlashCardResponse>,
      GetFlashCardsParams
    >({
      query: ({ noOfWords, lng, difficultyLevel, bloomsLevel }) =>
        `/languages?noOfWords=${noOfWords}&lng=${lng}&difficultyLevel=${difficultyLevel}&bloomsLevel=${bloomsLevel}`,
      providesTags: ["FlashCards"],
    }),
  }),
});

export const {
  useGetQuestionsQuery,
  useGetLeaderBoardQuery,
  useGetFlashCardsQuery,
} = api;

export const fetchFlashCards = async (
  noOfWords: number,
  lng: string,
  difficultyLevel: string,
  bloomsLevel: string
) => {
  try {
    const url: string = `${process.env.REACT_APP_BASE_URL}/languages?noOfWords=${noOfWords}&lng=${lng}&difficultyLevel=${difficultyLevel}&bloomsLevel=${bloomsLevel}`;
    const data = await axios.get(url);
    return data;
  } catch (error) {
    return error;
  }
};

