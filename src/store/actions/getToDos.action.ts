import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "../store";
import axios from "axios";
import { AnyAction } from "redux";
import {
  FETCH_TODO_FAILURE,
  FETCH_TODO_REQUEST,
  FETCH_TODO_SUCCESS,
} from "../constants/reducer.constants";

export const fetchTodoRequest = () => ({
  type: FETCH_TODO_REQUEST,
});

export const fetchTodoSuccess = (data: any) => ({
  type: FETCH_TODO_SUCCESS,
  payload: data,
});

export const fetchTodoFailure = (error: any) => ({
  type: FETCH_TODO_FAILURE,
  payload: error,
});

// Define a custom action type
export type FetchTodoAction =
  | ReturnType<typeof fetchTodoRequest>
  | ReturnType<typeof fetchTodoSuccess>
  | ReturnType<typeof fetchTodoFailure>;

// Async action using Thunk
export const fetchTodoList = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (
    dispatch: ThunkDispatch<RootState, unknown, AnyAction>,
    getState
  ) => {
    dispatch(fetchTodoRequest());

    try {
      // Make a GET request to get tasks
      const response = await axios.get("http://localhost:8080/tasks");
      dispatch(fetchTodoSuccess(response.data));
    } catch (error) {
      dispatch(fetchTodoFailure(error));
    }
  };
};

export const fetchTodoListCompleted = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (
    dispatch: ThunkDispatch<RootState, unknown, AnyAction>,
    getState
  ) => {
    dispatch(fetchTodoRequest());

    try {
      // Make a GET request to get tasks completed
      const response = await axios.get("http://localhost:8080/tasks/completed");
      dispatch(fetchTodoSuccess(response.data));
    } catch (error) {
      dispatch(fetchTodoFailure(error));
    }
  };
};
