import Task from "./task.interface";

export interface DataState {
  loading: boolean;
  data: Task[] | null;
  error: any;
}
