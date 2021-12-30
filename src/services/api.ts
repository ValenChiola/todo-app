import Axios from "axios";

Axios.defaults.baseURL = "http://localhost:8080/api/v1";

export const getTodoById = async (id: string) => {
  try {
    const endpoint = `/todos/${id}`;
    const { data } = await Axios.get<GetTodo>(endpoint);
    return data.data.todo;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllTodos = async () => {
  try {
    const { data } = await Axios.get<GetTodos>("/todos");
    return data.data.todos;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const saveTodo = async (todo: Partial<TodoFromApi>) => {
  try {
    const { data } = await Axios.post<PostTodos>("/todos", todo);
    console.log("data -> ", data);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const removeAllTodos = async () => {
  try {
    const { data } = await Axios.delete<DeleteTodos>("/todos");
    return data.message;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const removeTodo = async (id: string) => {
  try {
    const endpoint = `/todos/${id}`;
    const { data } = await Axios.delete<DeleteTodos>(endpoint);
    return data.message;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const toggleDoneTodo = async (id: string) => {
  try {
    const endpoint = `/todos/toggle-done/${id}`;
    await Axios.patch(endpoint);
  } catch (error) {
    return Promise.reject(error);
  }
};

interface GetTodo {
  data: {
    todo: TodoFromApi;
  };
}

interface GetTodos {
  data: {
    todos: TodoFromApi[];
  };
}

interface PostTodos {
  data: {
    todo: TodoFromApi;
  };
  message: string;
}

interface DeleteTodos {
  message: string;
}

export interface TodoFromApi {
  id: string;
  content: string;
  done: boolean;
  createdDate: number;
}
