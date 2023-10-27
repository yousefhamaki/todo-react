import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTaskAction } from "../store/actions/addTask.action";

const AddTodo: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const dispatch = useDispatch();

  // send request to add task to db
  const handleAddTask = () => {
    if (task) {
      dispatch(addTaskAction(task) as any);
      setTask("");
    }
  };

  return (
    <div className={"add-task-container"}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={handleAddTask}>Add</button>
    </div>
  );
};

export default AddTodo;
