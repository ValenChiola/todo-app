import React, { createContext, ReactNode, useContext } from "react";
import { useTodoMutation } from "../hooks/useTodoMutation";
import { iTodoFromApi } from "../services/api";

const Context = createContext({} as iContextValues);
Context.displayName = "TodoContext";

// Hook
export const useTodoContext = () => useContext(Context);

// HOC
export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const {
    addTodoMutation,
    removeAllMutation,
    removeTodoMutation,
    toggleTodoMutation,
    updateTodoMutation,
    appData: { todos, status },
  } = useTodoMutation();

  const addTodo = (content: string) => addTodoMutation({ content });

  const removeAll = () => removeAllMutation();

  const removeTodo = (id: string) => removeTodoMutation({ id });

  const toggleTodo = (todo: iTodoFromApi) => toggleTodoMutation({ todo });

  const updateTodo = (todo: iTodoFromApi, content: string) =>
    updateTodoMutation({ todo, content });

  return (
    <Context.Provider
      value={{
        addTodo,
        removeAll,
        removeTodo,
        toggleTodo,
        updateTodo,
        todos,
        status,
      }}
    >
      {children}
    </Context.Provider>
  );
};

// Interfaces
interface iContextValues {
  addTodo: (content: string) => void;
  removeAll: () => void;
  removeTodo: (id: string) => void;
  toggleTodo: (todo: iTodoFromApi) => void;
  updateTodo: (todo: iTodoFromApi, content: string) => void;
  todos: iTodoFromApi[];
  status: "idle" | "error" | "loading" | "success";
}
