import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteTask,
  markTaskAsCompleted,
  markTaskAsUnCompleted,
  updateTask,
} from "../store/actions/task.action";
import TaskUpdatePopup from "./taskUpdatedPopup.component";
import Task from "../interface/task.interface";
import { TodoListProps } from "../interface/addToDoProps.interface";

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  const [selectedTask, setSelectedTask] = useState(null as null | Task);
  const dispatch = useDispatch();

  // function sending request to update task info
  const handleUpdate = (taskId: string, updatedText: string) => {
    dispatch(updateTask(taskId, updatedText) as any);
    setSelectedTask(null);
  };

  // function make task completed if not and make not completed if task completed
  const toggleCompleted = (id: string, completed: boolean) => {
    if (!completed) {
      dispatch(markTaskAsCompleted(id) as any);
    } else {
      dispatch(markTaskAsUnCompleted(id) as any);
    }
  };

  // function make request to delete task
  const DeleteTask = (id: string) => {
    dispatch(deleteTask(id) as any);
  };
  return tasks && tasks.length > 0 ? (
    <ul className="todo-list">
      {tasks.map(
        (task: {
          id: string;
          completed: boolean;
          text: string | null | undefined;
        }) => (
          <li
            key={task.id}
            id={task.id}
            className={`todo-item ${task.completed ? "completed" : ""}`}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompleted(task.id, task.completed)}
            />
            <span className="todo-text">{task.text}</span>
            <div>
              <button
                className="button delete-button"
                onClick={() => DeleteTask(task.id)}
              >
                Delete
              </button>
              <button
                className="button update-button"
                onClick={() => setSelectedTask(task as Task)}
              >
                update
              </button>
            </div>
          </li>
        )
      )}

      {selectedTask && (
        <TaskUpdatePopup
          task={selectedTask}
          onUpdate={handleUpdate}
          onCancel={() => setSelectedTask(null)}
        />
      )}
    </ul>
  ) : (
    <></>
  );
};
export default TodoList;
