import React, { useEffect, useState } from "react";
import TodoList from "./todoList.component";
import AddTodo from "./addToDo.component";
import {
  fetchTodoList,
  fetchTodoListCompleted,
} from "../store/actions/getToDos.action";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./loading.component";
import Filter from "./filter.component";
import HandleError from "./traits/handleError.component";

const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<
    { id: string; text: string; completed: boolean; createdDate: number }[]
  >([]);
  const [checked, setChecked] = useState("All");
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.todos);
  const completedCount =
    tasks && tasks.length > 0
      ? tasks.filter((item) => item.completed === true).length
      : 0;

  //use Effect waiting for checked value change to make request to get tasks
  useEffect(() => {
    if (checked === "All") {
      dispatch(fetchTodoList() as any) as any; // Dispatch the fetchTodoList action
    } else {
      dispatch(fetchTodoListCompleted() as any) as any; // Dispatch the fetchTodoListCompleted action
    }
  }, [dispatch, checked]);

  // add tasks data to state data
  useEffect(() => {
    if (data.loading === false && data.error === null) {
      setTasks(data.data);
    }
  }, [data]);

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>To-Do List</h1>
      </div>
      <div className="todo-form">
        <AddTodo />
        <Filter checked={checked} onSelect={setChecked} />
      </div>
      {/* show completed task **/}
      <div className="completed-task">
        <div>Completed Task: {completedCount}</div>
      </div>
      {/* handle tasks and show error if failed */}
      {data.loading === true ? (
        <Loading text={"Loading..."} />
      ) : data.error === null ? (
        <TodoList tasks={tasks} />
      ) : (
        <HandleError />
      )}
    </div>
  );
};

export default TodoApp;
