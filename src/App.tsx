import React from "react";
import "./App.css";
import { TodoForm } from './pages/TodoForm';
import { TodoList } from "./pages/TodoList";
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <div className="container d-flex flex-column">
      <h1>Todo App</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default App;
