import React from "react";
import { useMutation, useQueryClient } from "react-query";

//Components
import { iTodoFromApi, removeTodo, toggleDoneTodo } from "./../services/api";
import { useUIContext } from "./../context/UIContext";

export const TodoListItem = ({ todo }: IProps) => {
  const { showToast } = useUIContext();
  const queryClient = useQueryClient();

  const toggleMutation = useMutation(() => toggleDoneTodo(todo.id), {
    onMutate: async () => {
      todo.done = !todo.done;
    },

    onSettled: () => queryClient.invalidateQueries(["getAllTodos"]),
  });

  const removeMutation = useMutation(() => removeTodo(todo.id), {
    onMutate: async () => {
      const todos = queryClient.getQueryData<iTodoFromApi[]>(["getAllTodos"]);
      if (todos) {
        const newTodos = todos.slice();
        const index = newTodos.indexOf(todo);
        newTodos.splice(index, 1);
        queryClient.setQueryData<iTodoFromApi[]>(["getAllTodos"], newTodos);
      }
    },

    onSuccess: (message) => showToast(message, "error"),

    onSettled: () => queryClient.invalidateQueries(["getAllTodos"]),
  });

  return (
    <div
      className={`w-75 h-15 card mt-4 p-1 ${todo.done ? "done" : ""}`}
      style={{ minWidth: "25%" }}
    >
      <div className="d-flex justify-content-between">
        <h4 className="m-1">{todo.content}</h4>
        <div>
          <button
            className="btn btn-success btn-sm m-1"
            onClick={() => toggleMutation.mutate()}
          >
            ✓
          </button>
          <button
            className="btn btn-danger btn-sm m-1"
            onClick={() => removeMutation.mutate()}
          >
            ✖
          </button>
        </div>
      </div>
    </div>
  );
};

interface IProps {
  todo: iTodoFromApi;
}
