import React from "react";

//Context
import { ITodo, useTodoContext } from "./../context/TodoProvider";

//Components
import { Button } from "../components/Button";

export const TodoListItem = ({ todo }: IProps) => {
  const { todos, setTodos } = useTodoContext();

  const toggleDone = () => {
    const newTodos = [...todos];
    const i = newTodos.indexOf(todo);
    newTodos.splice(i, 1, {
      content: todo.content,
      done: !todo.done,
      id: todo.id
    });
    setTodos(newTodos);
  };

  const removeTodo = () => {
    const newTodos = [...todos];
    const i = newTodos.indexOf(todo);
    newTodos.splice(i, 1);
    setTodos(newTodos);
  };

  return (
    <div
      className={`w-75 h-15 card mt-4 p-1 ${
        todo.done ? "done" : ""
      }`}
      style={{minWidth: '25%'}}
    >
      <div className="d-flex justify-content-between">
        <h4 className="m-1">{todo.content}</h4>
        <div>
          <Button
            className="btn btn-success btn-sm m-1"
            onClick={toggleDone}
            label="✓"
          />
          <Button
            className="btn btn-danger btn-sm m-1"
            onClick={removeTodo}
            label="✖"
          />
        </div>
      </div>
    </div>
  );
};

interface IProps {
  todo: ITodo;
}
