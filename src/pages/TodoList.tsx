import React from "react";

//Context
import { ITodo, useTodoContext } from "./../context/TodoProvider";

//Components
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
