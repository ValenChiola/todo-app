import React, { useEffect, useRef, useState } from "react";

//Context
import { useTodoContext } from "./../context/TodoContext";

export const TodoForm = () => {
  const [todoContent, setTodoContent] = useState("");
  const { todos, addTodo, removeAll } = useTodoContext();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <form className="d-flex flex-column w-75">
      <div className="m-1 d-flex flex-column">
        <label>Ingrese la tarea</label>
        <input
          type="text"
          value={todoContent}
          onChange={(e) => setTodoContent(e.target.value)}
          ref={ref}
        />
      </div>
      <div className="d-flex">
        <button
          className="btn btn-success m-1 btn-sm"
          disabled={!todoContent.length}
          onClick={(e) => {
            e.preventDefault();
            addTodo(todoContent);
            setTodoContent("");
          }}
        >
          Añadir
        </button>
        <button
          className="btn btn-danger m-1 btn-sm"
          disabled={!todos.length}
          onClick={() => removeAll()}
        >
          Eliminar todos
        </button>
      </div>
    </form>
  );
};
