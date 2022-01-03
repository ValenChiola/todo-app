import React from "react";

//Api
import { TodoFromApi } from "./../services/api";

//Components
import { Editable } from "../components/Editable";
import { Icon } from "../components/icon/Icon";

//Context
import { useTodoContext } from "./../context/TodoContext";

//Styles
import Styles from "./TodoListItem.module.css";

export const TodoListItem = ({ todo }: Props) => {
  const { removeTodo, toggleTodo, updateTodo } = useTodoContext();

  return (
    <div className={`card ${Styles.todo} ${todo.done ? Styles.done : ""}`}>
      <div className="d-flex justify-content-between">
        {!todo.done ? (
          <Editable onEdit={(text) => updateTodo({ ...todo, content: text })}>
            <h4 className="m-1">{todo.content}</h4>
          </Editable>
        ) : (
          <h4 className="m-1">{todo.content}</h4>
        )}
        <div style={{ display: "flex" }}>
          <Icon
            type="check"
            onClick={() => toggleTodo(todo.id)}
            style={{ marginRight: 8, color: "green" }}
            title={todo.done ? "Marcar como No Hecho" : "Marcar como Hecho"}
          />
          <Icon
            type="cross"
            onClick={() => removeTodo(todo.id)}
            style={{ color: "red" }}
          />
        </div>
      </div>
    </div>
  );
};

interface Props {
  todo: TodoFromApi;
}
