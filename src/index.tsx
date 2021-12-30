import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

//Context
import { TodoProvider } from "./context/TodoContext";
import { UIProvider } from "./context/ui/UIContext";

//Components
import { App } from "./App";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UIProvider>
        <TodoProvider>
          <App />
        </TodoProvider>
      </UIProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
