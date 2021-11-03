import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

//Api
import { saveTodo, removeAllTodos } from "./../services/api";

//Context
import { useUIContext } from "../context/UIContext";
import { useTodoContext } from "./../context/TodoContext";

export const TodoForm = () => {
  const [todoContent, setTodoContent] = useState("");
  const { showToast } = useUIContext();
  const { todos, setTodos } = useTodoContext();
  const ref = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const addTodo = (e: ClickEvent) => {
    e.preventDefault();
    addTodoMutation.mutate();
    setTodoContent("");
  };

  const removeAll = async (e: ClickEvent) => {
    e.preventDefault();
    removeAllMutation.mutate();
  };

  const addTodoMutation = useMutation(
    () => saveTodo({ content: todoContent }),
    {
      onMutate: async () =>
        todos &&
        setTodos([
          {
            id: "",
            content: todoContent,
            done: false,
            createdDate: 1,
          },
          ...todos,
        ]), // Optimistic Update of cache & view

      onSuccess: ({ message }) => showToast(message),

      onSettled: () => queryClient.invalidateQueries(["getAllTodos"]),
    }
  );

  const removeAllMutation = useMutation(removeAllTodos, {
    onMutate: async () => setTodos([]),
    onSuccess: (message) => showToast(message, "error"),
  });

  return (
    <form className="d-flex flex-column w-75">
      <div className="m-1 d-flex flex-column">
        <label>Ingrese la tarea</label>
        <input
          type="text"
          value={todoContent}
          onChange={(e) => setTodoContent(e.target.value)}
          ref={ref}
        />
      </div>
      <div className="d-flex">
        <button
          className="btn btn-success m-1 btn-sm"
          disabled={!todoContent.length}
          onClick={addTodo}
        >
          Añadir
        </button>
        <button
          className="btn btn-danger m-1 btn-sm"
          disabled={!todos.length}
          onClick={removeAll}
        >
          Eliminar todos
        </button>
      </div>
    </form>
  );
};

type ClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;
