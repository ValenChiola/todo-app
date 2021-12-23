import React from "react";

//Styles
import Styles from "./TodoListItem.module.css";

//Api
import { iTodoFromApi } from "./../services/api";

//Context
import { useTodoContext } from "./../context/TodoContext";
import { Editable } from "../components/Editable";
import { Icon } from "../components/icon/Icon";

export const TodoListItem = ({ todo }: IProps) => {
  const { removeTodo, toggleTodo, updateTodo } = useTodoContext();

  return (
    <div className={`card ${Styles.todo} ${todo.done ? Styles.done : ""}`}>
      <div className="d-flex justify-content-between">
        <Editable onEdit={(text) => updateTodo(todo, text)}>
          <h4 className="m-1">{todo.content}</h4>
        </Editable>
        <div style={{ display: "flex" }}>
          <Icon
            type="check"
            onClick={() => toggleTodo(todo)}
            style={{ marginRight: 8, color: "green" }}
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

interface IProps {
  todo: iTodoFromApi;
}
