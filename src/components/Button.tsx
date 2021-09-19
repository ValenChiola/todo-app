import React from "react";

import { ClickEvent } from "../pages/TodoForm";

export const Button = (props: IProps) => {
  const { label } = props;

  return <button {...props}>{label}</button>;
};

interface IProps {
  label: string
  className?: string
  onClick: (e: ClickEvent) => void
}
