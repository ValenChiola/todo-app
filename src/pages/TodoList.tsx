import React from "react";

//Context

//Components
import { TodoListItem } from "./TodoListItem";
import { getAllTodos, iTodoFromApi } from "./../services/api";
import { useQuery } from "react-query";

export const TodoList = () => {
  const { data, isLoading } = useQuery<iTodoFromApi[]>(
    ["getAllTodos"],
    getAllTodos
  );

  if (isLoading) return <p>Cargando datillos...</p>;

  if (!data) return null;

  return (
    <>
      {
        //List
        data.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} />
        ))
      }
    </>
  );
};
