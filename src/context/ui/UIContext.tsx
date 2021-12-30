import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Styles
import Styles from "./UIContext.module.css";

const defaultToast: Toast = {
  message: null,
  delay: 3,
  type: "success",
};

const Context = createContext({} as ContextValues);
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

  const showToast = (message: Toast["message"], data: DataProps = {}) => {
    if (typeof message !== "string") message = String(message);
    const { type = "success", delay = 3 } = data;
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
interface ContextValues {
  showToast: (message: Toast["message"], data?: DataProps) => void;
}

interface DataProps {
  type?: Toast["type"];
  delay?: Toast["delay"];
}

interface Toast {
  message: string | null;
  type: "success" | "error" | "info";
  delay: number;
}
