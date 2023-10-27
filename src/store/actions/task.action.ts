import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import axios from "axios";
import {
  DELETE_TASK_FAILURE,
  DELETE_TASK_SUCCESS,
  MARK_TASK_COMPLETED,
  MARK_TASK_UN_COMPLETED,
  UPDATE_TASK_FAILURE,
  UPDATE_TASK_SUCCESS,
} from "../constants/reducer.constants";

// Action creators
export const markTaskCompleted = (taskId: string) => ({
  type: MARK_TASK_COMPLETED as typeof MARK_TASK_COMPLETED,
  payload: taskId,
});

export const markTaskUnCompleted = (taskId: string) => ({
  type: MARK_TASK_UN_COMPLETED as typeof MARK_TASK_UN_COMPLETED,
  payload: taskId,
});

export const deleteTaskSuccess = (taskId: string) => ({
  type: DELETE_TASK_SUCCESS as typeof DELETE_TASK_SUCCESS,
  payload: taskId,
});

export const updateTaskSuccess = (taskId: string, updatedText: string) => ({
  type: UPDATE_TASK_SUCCESS as typeof UPDATE_TASK_SUCCESS,
  payload: { taskId, updatedText },
});
export const updateTaskFailure = (error: Error) => ({
  type: UPDATE_TASK_FAILURE as typeof UPDATE_TASK_FAILURE,
  payload: error,
});

export const deleteTaskFailure = (error: Error) => ({
  type: DELETE_TASK_FAILURE as typeof DELETE_TASK_FAILURE,
  payload: error,
});

// Define custom action types
export type TodoActionTypes =
  | ReturnType<typeof markTaskCompleted>
  | ReturnType<typeof markTaskUnCompleted>
  | ReturnType<typeof deleteTaskSuccess>
  | ReturnType<typeof deleteTaskFailure>
  | ReturnType<typeof updateTaskSuccess>
  | ReturnType<typeof updateTaskFailure>;

// Async action to mark a task as completed
export const markTaskAsCompleted = (
  taskId: string
): ThunkAction<void, RootState, null, TodoActionTypes> => {
  return async (dispatch: Dispatch<TodoActionTypes>) => {
    try {
      // Make a post request to mark the task as completed
      await axios.post(`http://localhost:8080/tasks/${taskId}/complete`);

      dispatch(markTaskCompleted(taskId));
    } catch (error) {
      dispatch(deleteTaskFailure(error as Error));
    }
  };
};

export const markTaskAsUnCompleted = (
  taskId: string
): ThunkAction<void, RootState, null, TodoActionTypes> => {
  return async (dispatch: Dispatch<TodoActionTypes>) => {
    try {
      // Make a post request to mark the task as not completed
      await axios.post(`http://localhost:8080/tasks/${taskId}/incomplete`);

      dispatch(markTaskUnCompleted(taskId));
    } catch (error) {
      dispatch(deleteTaskFailure(error as Error));
    }
  };
};

// Async action to delete a task
export const deleteTask = (
  taskId: string
): ThunkAction<void, RootState, null, TodoActionTypes> => {
  return async (dispatch: Dispatch<TodoActionTypes>) => {
    try {
      // Make a DELETE request to delete the task
      await axios.delete(`http://localhost:8080/tasks/${taskId}`);

      dispatch(deleteTaskSuccess(taskId));
    } catch (error) {
      dispatch(deleteTaskFailure(error as Error));
    }
  };
};

// Async action to update a task
export const updateTask = (
  taskId: string,
  newTaskText: string
): ThunkAction<void, RootState, null, TodoActionTypes> => {
  return async (dispatch: Dispatch<TodoActionTypes>) => {
    try {
      // Make a post request to update the task
      await axios.post(`http://localhost:8080/tasks/${taskId}`, {
        text: newTaskText,
        // Include other properties as needed
      });

      dispatch(updateTaskSuccess(taskId, newTaskText));
    } catch (error) {
      dispatch(updateTaskFailure(error as Error));
    }
  };
};
