import React, { createContext, useContext, useEffect } from "react";
import { Toaster, toast } from "sonner";

const ToastContext = createContext(null);

export const ToastProvider = (props) => {
  const handletoast = (item) => {
    if (item.type === "error") {
      toast.error(item.message);
    } else if (item.type === "success") {
      toast.success(item.message);
    } else if (item.type === "promise") {
      toast.promise(item.message, {
        loading: "Loading",
        success: (data) => `${data.message}`,
        error: "Error",
      });
    } else {
      toast.info(item.message);
    }
  };

  return (
    <ToastContext.Provider value={{ handletoast }}>
      <Toaster richColors />
      {props.children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
