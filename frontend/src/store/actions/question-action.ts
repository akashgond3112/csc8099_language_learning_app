import {
  moveNextPreviousQuestion,
  startExamAction,
  setIsLoading,
  setError,
} from "../slice/question-slice";
import { Dispatch } from "redux";
import { UserTestDetail } from "../../state/types";
import { AxiosInstance } from "axios";
import { NavigateFunction } from "react-router-dom";


export const fetchQuestionData = (isMounted: boolean, controller: AbortController, key: string, axiosprivate: AxiosInstance, location: any, navigate: NavigateFunction) => {
  return async (dispatch: Dispatch) => {

    const getUserTests = async () => {
      try {
        const response = await axiosprivate.get(`/api/v1/user/test/${key}`, {
          signal: controller.signal,
        });

        const result: UserTestDetail = response.data;

        return result;

      } catch (err) {
        navigate("/", { state: { from: location }, replace: true });
        throw err; // Propagate the error to the calling function
      }
    };

    try {
      const questionData = isMounted && await getUserTests();
      if (isMounted) { // Check if the component is still mounted before dispatching data
        dispatch(startExamAction(questionData));
        dispatch(setIsLoading(false))
        dispatch(setError(undefined))
      }
    } catch (error) {
      dispatch(setError(error))
    }
  };
};

export const navigateQuestion = (isMounted: boolean, controller: AbortController, key: string, axiosprivate: AxiosInstance, location: any, navigate: NavigateFunction, intent: string) => {

  return async (dispatch: Dispatch) => {

    const getUserTests = async () => {
      try {
        const response = await axiosprivate.get(`/api/v1/user/test/${key}?intent=${intent}`, {
          signal: controller.signal,
        });

        const result: UserTestDetail = response.data;

        return result;

      } catch (err) {
        console.error("Something went wrong", err);
        navigate("/", { state: { from: location }, replace: true });
        throw err; // Propagate the error to the calling function
      }
    };

    try {
      dispatch(setIsLoading(true))
      const questionData = isMounted && await getUserTests();
      if (isMounted) { // Check if the component is still mounted before dispatching data
        dispatch(moveNextPreviousQuestion(questionData));
        dispatch(setIsLoading(false))
        dispatch(setError(undefined))
      }
    } catch (error) {
      dispatch(setError(error))
    }
  };
};

export const evaluateQuestion = (isMounted: boolean, controller: AbortController, key: string, axiosprivate: AxiosInstance, userItemEvaluation: object) => {

  return async (dispatch: Dispatch) => {

    const getUserTests = async () => {
      try {
        const response = await axiosprivate.patch(`/api/v1/user/test/${key}/item`,
          userItemEvaluation
        );

        const result: UserTestDetail = response.data;

        return result;

      } catch (err) {
        console.error("Something went wrong", err);
        throw err; // Propagate the error to the calling function
      }
    };

    try {
      dispatch(setIsLoading(true))
      const questionData = isMounted && await getUserTests();
      if (isMounted) { // Check if the component is still mounted before dispatching data
        dispatch(moveNextPreviousQuestion(questionData));
        dispatch(setIsLoading(false))
        dispatch(setError(undefined))
      }
    } catch (error) {
      dispatch(setError(error))
    }
  };
};

