import React from "react";
import { ITodo, useTodoContext } from "./../context/TodoProvider";
import { TodoListItem } from "./TodoListItem";

export const TodoList = () => {
  const { todos } = useTodoContext();

  return (
    <div>
      {
        //List
        todos.map((todo: ITodo) => (
          <TodoListItem key={todo.id} todo={todo} />
        ))
      }
    </div>
  );
};
