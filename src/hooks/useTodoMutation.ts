import { useMutation, useQuery, useQueryClient } from "react-query";
import { useUIContext } from "../context/UIContext";
import {
  getAllTodos,
  iTodoFromApi,
  removeAllTodos,
  removeTodo,
  saveTodo,
  toggleDoneTodo,
} from "../services/api";

export const useTodoMutation = () => {
  const { showToast } = useUIContext();
  const queryClient = useQueryClient();

  const { data = [], status } = useQuery<iTodoFromApi[]>(
    ["getAllTodos"],
    getAllTodos,
    {
      retry: 3,
    }
  );

  const setTodos = (todos: iTodoFromApi[]) =>
    queryClient.setQueryData(["getAllTodos"], todos);

  const getTodos = () =>
    queryClient.getQueryData<iTodoFromApi[]>(["getAllTodos"]);

  const { mutate: addTodoMutation } = useMutation(
    ({ content }: { content: string }) => saveTodo({ content }),
    {
      onMutate: async ({ content }) => {
        const snapshot = getTodos();
        snapshot &&
          setTodos([
            {
              id: "",
              content,
              done: false,
              createdDate: 1,
            },
            ...snapshot,
          ]);
      },
      onSuccess: ({ message }) => showToast(message),
      onSettled: () => queryClient.invalidateQueries(["getAllTodos"]),
    }
  );

  const { mutate: removeAllMutation } = useMutation(removeAllTodos, {
    onMutate: async () => setTodos([]),
    onSuccess: (message) => showToast(message, "error"),
  });

  const { mutate: toggleTodoMutation } = useMutation(
    ({ todo }: { todo: iTodoFromApi }) => toggleDoneTodo(todo.id),
    {
      onMutate: async ({ todo }) => {
        todo.done = !todo.done;
      },
      onSettled: () => queryClient.invalidateQueries(["getAllTodos"]),
    }
  );

  const { mutate: removeTodoMutation } = useMutation(
    ({ id }: { id: string }) => removeTodo(id),
    {
      onMutate: async ({ id }) => {
        const todos = getTodos();
        todos && setTodos(todos.filter((item) => item.id !== id));
      },
      onSuccess: (message) => showToast(message, "error"),
      onSettled: () => queryClient.invalidateQueries(["getAllTodos"]),
    }
  );

  const { mutate: updateTodoMutation } = useMutation(
    ({ todo, content }: { todo: iTodoFromApi; content: string }) =>
      saveTodo({
        ...todo,
        content,
      }),
    {
      onMutate: async ({ todo, content }) => (todo.content = content),
      onSuccess: ({ message }) => showToast(message),
      onSettled: () => queryClient.invalidateQueries(["getAllTodos"]),
    }
  );

  return {
    addTodoMutation,
    removeAllMutation,
    removeTodoMutation,
    toggleTodoMutation,
    updateTodoMutation,
    appData: {
      todos: data,
      status,
    },
  };
};
