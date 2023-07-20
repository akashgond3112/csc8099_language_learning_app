import { Dispatch } from "redux";
import {
  setFirstLanguage,
  setSecondLanguage,
  setSecondLanguageImageUrl,
} from "../slice/nav-slice";

export const setNativeLanguage =
  (result: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(setFirstLanguage(result));
    } catch (error) {
      console.log(error);
    }
  };

export const setTargetLanguage =
  (result: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(setSecondLanguage(result));
    } catch (error) {
      console.log(error);
    }
  };

export const setTargetLanguageImageUrl =
  (result: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(setSecondLanguageImageUrl(result));
    } catch (error) {
      console.log(error);
    }
  };
