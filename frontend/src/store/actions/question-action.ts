import {
  moveNextQuestion,
  movePreviousQuestion,
  startExamAction,
} from "../slice/question-slice";
import { Dispatch } from "redux";

export const fetchQuestionData = () => {
  return async (dispatch: Dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://practice-react-138b3-default-rtdb.firebaseio.com/questions.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch card data failed");
      }

      const data = await response.json();
      return data;
    };

    try {
      const questionData = await fetchData();
      dispatch(startExamAction(questionData));
    } catch (error) {
      console.log(error);
    }
  };
};

export const MoveNextQuestion = () => async (dispatch: Dispatch) => {
  try {
    dispatch(moveNextQuestion());
  } catch (error) {
    console.log(error);
  }
};

export const MovePreviousQuestion = () => async (dispatch: Dispatch) => {
  try {
    dispatch(movePreviousQuestion());
  } catch (error) {
    console.log(error);
  }
};
