import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

//Styles
import Styles from "./TodoListItem.module.css";

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
  const { todos, setTodos } = useTodoContext();
  const queryClient = useQueryClient();

  const toggleMutation = useMutation(() => toggleDoneTodo(todo.id), {
    onMutate: async () => {
      todo.done = !todo.done;
    },

    onSettled: () => queryClient.invalidateQueries(["getAllTodos"]),
  });

  const removeTodoMutation = useMutation(() => removeTodo(todo.id), {
    onMutate: async () => setTodos(todos.filter((item) => item.id !== todo.id)),
    onSuccess: (message) => showToast(message, "error"),
    onSettled: () => queryClient.invalidateQueries(["getAllTodos"]),
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
      onSettled: () => queryClient.invalidateQueries(["getAllTodos"]),
    }
  );

  return (
    <div className={`card ${Styles.todo} ${todo.done ? Styles.done : ""}`}>
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
