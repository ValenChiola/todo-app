import React from "react";

//Components
import { TodoForm } from "./pages/TodoForm";
import { TodoList } from "./pages/TodoList";

//Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={["/:id", "/"]}>
          <Main />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

const Main = () => {
  return (
    <div className="container d-flex flex-column w-50">
      <h1>Todo App</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default App;
