import React, { createContext, ReactNode, useContext } from "react";
import { useQuery } from "react-query";
import { useTodoMutation } from "../hooks/useTodoMutation";
import { getAllTodos, TodoFromApi } from "../services/api";

const Context = createContext({} as ContextValues);
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
  } = useTodoMutation();

  const { data = [], status } = useQuery<TodoFromApi[]>(
    ["getAllTodos"],
    getAllTodos,
    {
      retry: 3,
    }
  );

  const addTodo = (content: string) => addTodoMutation({ content });

  const removeAll = () => removeAllMutation();

  const removeTodo = (id: string) => removeTodoMutation({ id });

  const toggleTodo = (id: string) => toggleTodoMutation({ id });

  const updateTodo = (todo: TodoFromApi) => updateTodoMutation({ todo });

  return (
    <Context.Provider
      value={{
        addTodo,
        removeAll,
        removeTodo,
        toggleTodo,
        updateTodo,
        todos: data,
        status,
      }}
    >
      {children}
    </Context.Provider>
  );
};

// Interfaces
interface ContextValues {
  addTodo: (content: string) => void;
  removeAll: () => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  updateTodo: (todo: TodoFromApi) => void;
  todos: TodoFromApi[];
  status: "idle" | "error" | "loading" | "success";
}
