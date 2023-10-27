// All components props
import Task from "./task.interface";

export interface AddTodoProps {
  addTask: (task: string) => void;
}

export interface FilterProps {
  checked: string;
  onSelect: (task: string) => void;
}

export interface TaskUpdatePopupProps {
  task: Task;
  onUpdate: (taskId: string, updatedText: string) => void;
  onCancel: () => void;
}

export interface LoadingProps {
  text?: string; // Optional text to display alongside the loading spinner
}

export interface TodoListProps {
  tasks: {
    id: string;
    text: string;
    completed: boolean;
    createdDate: number;
  }[];
}
