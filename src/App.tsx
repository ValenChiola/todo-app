import React, { useEffect, useState } from "react";
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
  const [shown, setShown] = useState(
    JSON.parse(localStorage.getItem("shown") || "false")
  );

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
            {!shown && (
              <div>
                <p>
                  Presiona "Esc" al editar el contenido del ToDo para cancelar
                </p>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    setShown(true);
                    localStorage.setItem("shown", "true");
                  }}
                >
                  Entendido
                </button>
              </div>
            )}
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
