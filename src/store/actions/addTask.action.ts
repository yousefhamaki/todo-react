import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import axios from "axios";
import Task from "../../interface/task.interface";
import {
  ADD_TASK_FAILURE,
  ADD_TASK_SUCCESS,
} from "../constants/reducer.constants";

// Action creators
export const addTaskSuccess = (task: Task) => ({
  type: ADD_TASK_SUCCESS as typeof ADD_TASK_SUCCESS,
  payload: task,
});

export const addTaskFailure = (error: Error) => ({
  type: ADD_TASK_FAILURE as typeof ADD_TASK_FAILURE,
  payload: error,
});

// Define a custom action type
export type TodoActionTypes = ReturnType<
  typeof addTaskSuccess | typeof addTaskFailure
>;

// Async action using Redux Thunk
export const addTaskAction = (
  newTaskText: string
): ThunkAction<void, RootState, null, TodoActionTypes> => {
  return async (dispatch: Dispatch<TodoActionTypes>) => {
    try {
      // Make a POST request to add new Task
      const response = await axios.post("http://localhost:8080/tasks", {
        text: newTaskText,
      });
      const addedTask: Task = response.data;
      dispatch(addTaskSuccess(addedTask));
    } catch (error) {
      dispatch(addTaskFailure(error as Error));
    }
  };
};
