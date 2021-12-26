import React, { ReactNode, useRef } from "react";

//Components
import { Icon } from "./icon/Icon";

export const Editable = (props: EditableProps) => {
  const {
    onEdit,
    children,
    styles = { fontSize: 12, marginLeft: 5, opacity: ".6" },
  } = props;

  const ref = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    if (!ref.current.textContent) return;
    if (e.key === "Escape") ref.current.blur();
    if (e.key === "Enter") {
      onEdit(ref.current.textContent);
      ref.current.blur();
    }
  };

  return (
    <div contentEditable={false} className="d-flex">
      <div
        ref={ref}
        contentEditable={true}
        suppressContentEditableWarning={true}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
      <Icon type="edit" style={styles} onClick={() => ref.current?.focus()} />
    </div>
  );
};

interface EditableProps {
  onEdit: (text: string) => unknown;
  children: ReactNode;
  styles?: React.CSSProperties;
}
