import React, { createContext, ReactNode, useContext } from "react";
import { useQuery, useQueryClient } from "react-query";
import { getAllTodos, iTodoFromApi } from "../services/api";

const Context = createContext({} as iContextValues);
Context.displayName = "TodoContext";

// Hook
export const useTodoContext = () => useContext(Context);

// HOC
export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  const { data, status } = useQuery<iTodoFromApi[]>(
    ["getAllTodos"],
    getAllTodos,
    {
      retry: 3,
    }
  );

  const setTodos = (todos: iTodoFromApi[]) => {
    queryClient.setQueryData<typeof data>(["getAllTodos"], todos);
  };

  const invalidateQuery = () => {
    queryClient.invalidateQueries(["getAllTodos"]);
  };

  return (
    <Context.Provider
      value={{ todos: data, setTodos, invalidateQuery, status }}
    >
      {children}
    </Context.Provider>
  );
};

// Interfaces
interface iContextValues {
  // eslint-disable-next-line no-unused-vars
  setTodos: (todos: iTodoFromApi[]) => void;
  invalidateQuery: () => void;
  todos: iTodoFromApi[] | undefined;
  status: "idle" | "error" | "loading" | "success";
}
