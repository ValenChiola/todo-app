import React from "react";

export const Button = (props: IProps) => {
  const { label } = props;

  return <button {...props}>{label}</button>;
};

interface IProps {
  label: string
  className?: string
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
