import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import { iTodoFromApi, saveTodo, removeAllTodos } from "./../services/api";
import { useUIContext } from "../context/UIContext";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

/*
  !FIX: Clean this component :/ 
*/
export const TodoForm = () => {
  const { id } = useParams<{ id: string }>();
  const { showToast } = useUIContext();
  const [newTodo, setNewTodo] = useState("");
  const ref = useRef<HTMLInputElement | null>(null);
  const history = useHistory();
  const queryClient = useQueryClient();

  useEffect(() => {
    ref.current?.focus();
  }, []);

  useEffect(() => {
    if (!id) return;
    const todos = queryClient.getQueryData<iTodoFromApi[]>(["getAllTodos"]);
    if (!todos) return;
    const todo = todos.filter((item) => item.id === id)[0];
    if (!todo) return;
    setNewTodo(todo.content);
  }, [id, queryClient]);

  const handleInputChange = (e: ChangeEvent) => {
    setNewTodo(e.target.value);
  };

  const addTodo = (e: ClickEvent) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;
    todoMutation.mutate();
    setNewTodo("");
    history.push("/");
  };

  let todo: Partial<iTodoFromApi> = {
    content: newTodo,
  };

  if (id) {
    todo = {
      ...todo,
      id,
    };
  }

  const updateTodos = (todos: iTodoFromApi[]) => {
    if (todo.id) {
      const newTodos = [...todos];
      const newTodo = newTodos.filter((item) => item.id === todo.id)[0];
      const i = todos.indexOf(newTodo);
      newTodos.splice(i, 1, newTodo);
      return newTodos;
    }
    return [
      {
        id: "",
        content: newTodo,
        done: false,
        createdDate: 1,
      },
      ...todos,
    ];
  };

  const removeAll = async (e: ClickEvent) => {
    e.preventDefault();
    removeMutation.mutate();
  };

  const todoMutation = useMutation(() => saveTodo(todo), {
    onMutate: async () => {
      const snapshot = queryClient.getQueryData<iTodoFromApi[]>([
        "getAllTodos",
      ]); // Make snapshot for rollback
      snapshot &&
        queryClient.setQueryData<iTodoFromApi[]>(
          ["getAllTodos"],
          updateTodos(snapshot)
        ); // Optimistic Update of cache & view
    },

    onSuccess: ({ message }) => showToast(message),

    onSettled: () => queryClient.invalidateQueries(["getAllTodos"]),
  });

  const removeMutation = useMutation(removeAllTodos, {
    onMutate: async () => {
      queryClient.setQueryData<iTodoFromApi[]>(["getAllTodos"], []);
    },

    onSuccess: (message) => showToast(message, "error"),
  });

  return (
    <form className="d-flex flex-column w-75">
      <div className="m-1 d-flex flex-column">
        <label>Ingrese la tarea</label>
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          ref={ref}
        />
      </div>
      <div className="d-flex">
        <button className="btn btn-success m-1 btn-sm" onClick={addTodo}>
          {id ? "Modificar" : "Añadir"}
        </button>
        <button className="btn btn-danger m-1 btn-sm" onClick={removeAll}>
          Eliminar todos
        </button>
      </div>
    </form>
  );
};

export type ClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;
type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
