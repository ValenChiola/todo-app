import Axios from "axios";

Axios.defaults.baseURL = "http://localhost:8080/api/v1";

export const getTodoById = async (id: string) => {
  try {
    const endpoint = `/todos/${id}`;
    const { data } = await Axios.get<iGetTodo>(endpoint);
    return data.data.todo;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllTodos = async () => {
  try {
    const { data } = await Axios.get<iGetTodos>("/todos");
    return data.data.todos;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const saveTodo = async (todo: Partial<iTodoFromApi>) => {
  try {
    const response = await Axios.post<iPostTodos>("/todos", todo);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const removeAllTodos = async () => {
  try {
    const { data } = await Axios.delete<iDeleteTodos>("/todos");
    return data.message;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const removeTodo = async (id: string) => {
  try {
    const endpoint = `/todos/${id}`;
    const { data } = await Axios.delete<iDeleteTodos>(endpoint);
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

interface iGetTodo {
  data: {
    todo: iTodoFromApi;
  };
}

interface iGetTodos {
  data: {
    todos: iTodoFromApi[];
  };
}

interface iPostTodos {
  data: {
    todo: iTodoFromApi;
  };
  message: string;
}

interface iDeleteTodos {
  message: string;
}

export interface iTodoFromApi {
  id: string;
  content: string;
  done: boolean;
  createdDate: number;
}
