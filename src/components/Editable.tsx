import React, { ReactNode, useEffect, useRef } from "react";
import { useState } from "react";
import { Icon } from "./icon/Icon";

export const Editable = ({
  onEdit,
  children,
  styles,
}: {
  onEdit: (text: string) => unknown;
  children: ReactNode;
  styles?: React.CSSProperties;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!clicked) return;
      if (ref.current && !ref.current.contains(event.target)) {
        ref.current.textContent && onEdit(ref.current.textContent);
      }
      setClicked(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onEdit, clicked]);

  return (
    <span
      ref={ref}
      contentEditable={!!onEdit}
      suppressContentEditableWarning={true}
      onClick={() => setClicked(true)}
    >
      <div className="d-flex">
        {children}
        <Icon
          type="edit"
          style={
            !styles ? { fontSize: 12, marginLeft: 5, opacity: ".6" } : styles
          }
        />
      </div>
    </span>
  );
};
