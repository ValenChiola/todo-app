import React from "react";

//Context
import { useTodoContext } from "./../context/TodoContext";

//Components
import { TodoListItem } from "./TodoListItem";

export const TodoList = () => {
  const { todos, status } = useTodoContext();

  if (status === "error") return <p>Hubo un error :/</p>;

  if (status === "loading") return <p>Cargando datos...</p>;

  if (!todos.length) return <p>No hay Todos todavía</p>;

  return (
    <>
      {
        //List
        todos.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} />
        ))
      }
    </>
  );
};
