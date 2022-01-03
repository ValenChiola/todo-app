import React, { ReactNode, useEffect, useRef, useState } from "react";

//Components
import { Icon } from "./icon/Icon";

export const Editable = (props: EditableProps) => {
  const {
    onEdit,
    children,
    styles = { fontSize: 12, marginLeft: 5, opacity: ".6" },
  } = props;

  const ref = useRef<HTMLDivElementWithFirstChild>(null);
  const [initialState, setInitialState] = useState<ReactNodeWithChildren>(
    children as ReactNodeWithChildren
  );

  useEffect(
    () => setInitialState(children as ReactNodeWithChildren),
    [children]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    if (e.key === "Escape") {
      ref.current.blur();
      ref.current.firstChild.innerText = initialState.props.children;
    }
    if (e.key === "Enter") {
      onEdit(ref.current.innerText);
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

type ReactNodeWithChildren = ReactNode & {
  props: { children: ReactNode };
};

type HTMLDivElementWithFirstChild = HTMLDivElement & {
  firstChild: HTMLDivElement;
};
