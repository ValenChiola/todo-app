import React, { useEffect, useRef, useState } from "react";

//Context
import { useTodoContext } from "./../context/TodoContext";

export const TodoForm = () => {
  const [todoContent, setTodoContent] = useState("");
  const { todos, addTodo, removeAll } = useTodoContext();
  const ref = useRef<HTMLInputElement>(null);

  const handleAddTodo = (e: React.MouseEvent) => {
    e.preventDefault();
    addTodo(todoContent);
    setTodoContent("");
  };

  const handleRemoveAll = (e: React.MouseEvent) => {
    e.preventDefault();
    removeAll();
  };

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <form className="d-flex flex-column">
      <div className="d-flex flex-column" style={{ margin: "1 auto" }}>
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
          className="btn btn-success btn-sm"
          disabled={!todoContent.trim().length}
          style={{ margin: "5px 5px 0 0" }}
          onClick={handleAddTodo}
        >
          Añadir
        </button>
        <button
          className="btn btn-danger btn-sm"
          style={{ margin: "5px 0 0 0" }}
          disabled={!todos.length}
          onClick={handleRemoveAll}
        >
          Eliminar todos
        </button>
      </div>
    </form>
  );
};
