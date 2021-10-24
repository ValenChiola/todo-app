import React from "react";

//Context

//Components
import { TodoListItem } from "./TodoListItem";
import { getAllTodos, iTodoFromApi } from "./../services/api";
import { useQuery } from "react-query";

export const TodoList = () => {
  const { data } = useQuery<iTodoFromApi[]>(["getAllTodos"], getAllTodos);

  if (!data) return null;

  return (
    <div>
      {
        //List
        data.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} />
        ))
      }
    </div>
  );
};
