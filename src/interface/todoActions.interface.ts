import { ADD_TODO, DELETE_TODO } from "../store/constants/reducer.constants";

export interface AddTodoAction {
  type: typeof ADD_TODO;
  payload: string;
}

export interface DeleteTodoAction {
  type: typeof DELETE_TODO;
  payload: number;
}

export type TodoAction = AddTodoAction | DeleteTodoAction;
