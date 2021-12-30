import { useMutation, useQueryClient } from "react-query";
import { useUIContext } from "../context/ui/UIContext";
import {
  TodoFromApi,
  removeAllTodos,
  removeTodo,
  saveTodo,
  toggleDoneTodo,
} from "../services/api";

export const useTodoMutation = () => {
  const { showToast } = useUIContext();
  const queryClient = useQueryClient();

  const setTodos = (todos: TodoFromApi[]) =>
    queryClient.setQueryData(["getAllTodos"], todos);

  const getTodos = () =>
    queryClient.getQueryData<TodoFromApi[]>(["getAllTodos"]) || [];

  const { mutate: addTodoMutation } = useMutation(
    ({ content }: { content: string }) => saveTodo({ content }),
    {
      onMutate: ({ content }) => {
        const todos = getTodos();
        setTodos([
          {
            id: Date.now().toString(),
            content,
            done: false,
            createdDate: 1,
          },
          ...todos,
        ]);
      },
      onSuccess: ({ message }) => showToast(message),
      onError: ({ response }) =>
        showToast(response.data.message, { type: "error" }),

      onSettled: () => queryClient.invalidateQueries(["getAllTodos"]),
    }
  );

  const { mutate: removeAllMutation } = useMutation(removeAllTodos, {
    onMutate: () => setTodos([]),
    onSuccess: (message) => showToast(message, { type: "error" }),
    onError: ({ response }) =>
      showToast(response.data.message, { type: "error" }),
  });

  const { mutate: toggleTodoMutation } = useMutation(
    ({ id }: { id: string }) => toggleDoneTodo(id),
    {
      onMutate: ({ id }) => {
        const todos = getTodos();
        setTodos(
          todos.map((item) => {
            if (item.id === id) {
              item.done = !item.done;
            }
            return item;
          })
        );
      },
      onSettled: () => queryClient.invalidateQueries(["getAllTodos"]),
      onError: ({ response }) =>
        showToast(response.data.message, { type: "error" }),
    }
  );

  const { mutate: removeTodoMutation } = useMutation(
    ({ id }: { id: string }) => removeTodo(id),
    {
      onMutate: ({ id }) => {
        const todos = getTodos();
        setTodos(todos.filter((item) => item.id !== id));
      },
      onSuccess: (message) => showToast(message, { type: "error" }),
      onSettled: () => queryClient.invalidateQueries(["getAllTodos"]),
      onError: ({ response }) =>
        showToast(response.data.message, { type: "error" }),
    }
  );

  const { mutate: updateTodoMutation } = useMutation(
    ({ todo }: { todo: TodoFromApi }) => saveTodo(todo),
    {
      onMutate: ({ todo }) => {
        const todos = getTodos();
        setTodos(
          todos.map((item) => {
            if (item.id === todo.id) {
              item.content = todo.content;
            }
            return item;
          })
        );
      },
      onSuccess: ({ message }) => showToast(message),
      onSettled: () => queryClient.invalidateQueries(["getAllTodos"]),
      onError: ({ response }) =>
        showToast(response.data.message, { type: "error" }),
    }
  );

  return {
    addTodoMutation,
    removeAllMutation,
    removeTodoMutation,
    toggleTodoMutation,
    updateTodoMutation,
  };
};
