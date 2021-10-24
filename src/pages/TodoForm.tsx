import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

//Components
import { Button } from "../components/Button";
import { iTodoFromApi, saveTodo, removeAllTodos } from "./../services/api";
import { useUIContext } from "../context/UIContext";

export const TodoForm = () => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [newTodo, setNewTodo] = useState("");
  const { showToast } = useUIContext();
  const queryClient = useQueryClient();

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const handleInputChange = (e: ChangeEvent) => {
    setNewTodo(e.target.value);
  };

  const addTodo = (e: ClickEvent) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;
    todoMutation.mutate();
    setNewTodo("");
  };

  const todoMutation = useMutation(() => saveTodo({ content: newTodo }), {
    onMutate: async () => {
      const snapshot = queryClient.getQueryData<iTodoFromApi[]>([
        "getAllTodos",
      ]); // Make snapshot for rollback
      snapshot &&
        queryClient.setQueryData<iTodoFromApi[]>(
          ["getAllTodos"],
          [
            {
              id: "",
              content: newTodo,
              done: false,
              createdDate: 1,
            },
            ...snapshot,
          ]
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

  const removeAll = async (e: ClickEvent) => {
    e.preventDefault();
    removeMutation.mutate();
  };

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
        <Button
          className="btn btn-success m-1 btn-sm"
          onClick={addTodo}
          label="Añadir"
        />
        <Button
          className="btn btn-danger m-1 btn-sm"
          onClick={removeAll}
          label="Eliminar todos"
        />
      </div>
    </form>
  );
};

export type ClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;
type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
