import React, { useState } from "react";
import { useMutation } from "react-query";

//Api
import {
  iTodoFromApi,
  removeTodo,
  saveTodo,
  toggleDoneTodo,
} from "./../services/api";

//Context
import { useUIContext } from "./../context/UIContext";
import { useTodoContext } from "./../context/TodoContext";

export const TodoListItem = ({ todo }: IProps) => {
  const [inputIsVisible, setInputIsVisible] = useState(false);
  const [content, setContent] = useState(todo.content);
  const { showToast } = useUIContext();
  const { todos, setTodos, invalidateQuery } = useTodoContext();

  const toggleMutation = useMutation(() => toggleDoneTodo(todo.id), {
    onMutate: async () => {
      todo.done = !todo.done;
    },

    onSettled: invalidateQuery,
  });

  const removeTodoMutation = useMutation(() => removeTodo(todo.id), {
    onMutate: async () => {
      if (todos) {
        const newTodos = todos.slice();
        const index = newTodos.indexOf(todo);
        newTodos.splice(index, 1);
        setTodos(newTodos);
      }
    },

    onSuccess: (message) => showToast(message, "error"),
    onSettled: invalidateQuery,
  });

  const updateMutation = useMutation(
    () =>
      saveTodo({
        ...todo,
        content,
      }),
    {
      onMutate: async () => (todo.content = content),
      onSuccess: ({ message }) => showToast(message),
      onSettled: invalidateQuery,
    }
  );

  return (
    <div
      className={`w-75 h-15 card mt-4 p-1 ${todo.done ? "done" : ""}`}
      style={{ minWidth: "25%" }}
    >
      <div className="d-flex justify-content-between">
        {
          //Modify the content of the todo
          inputIsVisible ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateMutation.mutate();
                setInputIsVisible(false);
              }}
            >
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <button type="submit" className="btn btn-success m-1 btn-sm">
                Confirmar
              </button>
            </form>
          ) : (
            <h4 className="m-1">{todo.content}</h4>
          )
        }
        <div>
          <button
            className="btn btn-success btn-sm m-1"
            onClick={() => toggleMutation.mutate()}
          >
            ✓
          </button>
          <button
            className="btn btn-danger btn-sm m-1"
            onClick={() => removeTodoMutation.mutate()}
          >
            ✖
          </button>
          <button
            className="btn btn-warning btn-sm m-1"
            onClick={() => setInputIsVisible(!inputIsVisible)}
          >
            Modificar
          </button>
        </div>
      </div>
    </div>
  );
};

interface IProps {
  todo: iTodoFromApi;
}
