import { Reducer } from "react";
import Task from "../../interface/task.interface";
import { DataState } from "../../interface/dataState.interface";
import {
  ADD_TASK_FAILURE,
  ADD_TASK_SUCCESS,
  FETCH_TODO_REQUEST,
  FETCH_TODO_SUCCESS,
  FETCH_TODO_FAILURE,
  DELETE_TASK_FAILURE,
  DELETE_TASK_SUCCESS,
  MARK_TASK_COMPLETED,
  MARK_TASK_UN_COMPLETED,
  UPDATE_TASK_FAILURE,
  UPDATE_TASK_SUCCESS,
} from "../constants/reducer.constants";

const initialState: DataState = {
  loading: false,
  data: null,
  error: null,
};

const todoReducer: Reducer<DataState, any> = (state = initialState, action) => {
  switch (action.type) {
    // fetch todos request waiting
    case FETCH_TODO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    // fetch todos request success
    case FETCH_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload as Task[],
        error: null,
      };
    // fetch todos request failed
    case FETCH_TODO_FAILURE:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    // add task request success
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        data: [action.payload, ...(state.data as Task[])],
        error: null,
      };
    // add task request failed
    case ADD_TASK_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    //mark task as complete request
    case MARK_TASK_COMPLETED:
      // Find the task by ID and mark it as completed
      const markedTasks =
        state.data !== null
          ? state.data.map((task) => {
              if (task.id === action.payload) {
                return { ...task, completed: true };
              }
              return task;
            })
          : state.data;

      return {
        ...state,
        data: markedTasks,
        error: null,
      };
    //mark task as uncomplete request
    case MARK_TASK_UN_COMPLETED:
      // Find the task by ID and mark it as completed
      const newmarkedTasks =
        state.data !== null
          ? state.data.map((task) => {
              if (task.id === action.payload) {
                return { ...task, completed: false };
              }
              return task;
            })
          : state.data;

      return {
        ...state,
        data: newmarkedTasks,
        error: null,
      };

    // Delete task request success
    case DELETE_TASK_SUCCESS:
      // Remove the task by ID
      const updatedTasks =
        state.data !== null
          ? state.data.filter((task) => task.id !== action.payload)
          : state.data;
      return {
        ...state,
        data: updatedTasks,
        error: null,
      };

    // Delete task request failed
    case DELETE_TASK_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_TASK_SUCCESS:
      // Update the task with the new text
      const updatedTasksMessage =
        state.data !== null
          ? state.data.map((task) => {
              if (task.id === action.payload.taskId) {
                return { ...task, text: action.payload.updatedText };
              }
              return task;
            })
          : state.data;

      return {
        ...state,
        data: updatedTasksMessage,
        error: null,
      };

    // update task request failed
    case UPDATE_TASK_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default todoReducer;
