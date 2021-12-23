import React from "react";
import Styles from "./Icon.module.css";
import { icons } from "./Icon.types";

export const Icon = (props: Props) => {
  const { type, size = "medium", onClick } = props;

  return (
    <i
      {...props}
      style={{ cursor: onClick && "pointer", ...props.style }}
      className={Styles[size]}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
    >
      {icons[type]}
    </i>
  );
};

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  type: keyof typeof icons;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
}
