import { Dispatch } from "redux";
import { setResult } from "../slice/result-slice";

export const pushResult = (result: number) => async (dispatch: Dispatch) => {
  try {
    dispatch(setResult(result));
  } catch (error) {
    console.log(error);
  }
};
