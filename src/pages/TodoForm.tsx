import React, { useState } from "react";
import { useTodoContext, ITodo } from "../context/TodoProvider";
import { Button } from "../components/Button";

export const TodoForm = () => {
  const [newTodo, setNewTodo] = useState("");
  const { todos, setTodos } = useTodoContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const addTodo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (newTodo.trim() === '') return
    const todo: ITodo = {
      content: newTodo,
      done: false,
    };
    setTodos([todo, ...todos]);
    setNewTodo("");
  };

  const removeAll = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setTodos([]);
  };

  return (
    <form className="d-flex flex-column w-75">
      <div className="m-1 d-flex flex-column">
        <label>Ingrese la tarea</label>
        <input type="text" value={newTodo} onChange={handleInputChange} />
      </div>
      <div className="d-flex">
        <Button
          className="btn btn-success m-1 btn-sm"
          onClick={addTodo}
          label="Añadir"
        />
        <Button
          className="btn btn-danger m-1 btn-sm"
          onClick={removeAll}
          label="Eliminar todos"
        />
      </div>
    </form>
  );
};
