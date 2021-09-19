import React from "react";

//Components
import { TodoForm } from './pages/TodoForm';
import { TodoList } from "./pages/TodoList";

//Styles
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css";

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
