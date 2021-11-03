import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Styles
import Styles from "./UIContext.module.css";

const defaultToast: iToast = {
  message: null,
  delay: 3,
  type: "success",
};

const Context = createContext({} as iContextValues);
Context.displayName = "UIContext";

// Hook
export const useUIContext = () => useContext(Context);

// HOC
export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState(defaultToast);

  useEffect(() => {
    let timeOut = setTimeout(() => setToast(defaultToast), toast.delay * 1000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [toast]);

  const showToast = (
    message: iToast["message"],
    type: iToast["type"] = "success",
    delay: iToast["delay"] = 3
  ) => {
    if (typeof message !== "string") message = String(message);
    setToast({
      message,
      delay,
      type,
    });
  };

  return (
    <Context.Provider value={{ showToast }}>
      {children}
      {
        <div
          className={`${Styles.toastNotification} ${Styles[toast.type]}`}
          onClick={() => setToast(defaultToast)}
          aria-hidden="true"
        >
          {toast.message}
        </div>
      }
    </Context.Provider>
  );
};

// Interfaces
interface iContextValues {
  showToast: (
    message: iToast["message"],
    type?: iToast["type"],
    delay?: iToast["delay"]
  ) => void;
}

interface iToast {
  message: string | null;
  type: "success" | "error" | "info";
  delay: number;
}
