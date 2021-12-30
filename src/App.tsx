import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";

//Context
import { useUIContext } from "./context/ui/UIContext";

//Components
import { TodoForm } from "./pages/TodoForm";
import { TodoList } from "./pages/TodoList";

//Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export const App = () => {
  const { showToast } = useUIContext();

  useEffect(() => {
    window.addEventListener("offline", () =>
      showToast("No hay conexión a internet", { type: "error", delay: 5 })
    );
    window.addEventListener("online", () =>
      showToast("Vuelves a tener conexión", { type: "success", delay: 5 })
    );
  }, [showToast]);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <div className="container d-flex flex-column w-50">
            <h1>ToDo App</h1>
            <TodoForm />
            <TodoList />
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
