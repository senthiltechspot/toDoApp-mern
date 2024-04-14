import React from "react";
import { AuthProvider } from "./Auth";
import { TaskProvider } from "./TaskProvider";
import { ToastProvider } from "./ToastProvider";

export const IndexProvider = ({ children }) => {
  return (
    <ToastProvider>
      <AuthProvider>
        <TaskProvider>{children}</TaskProvider>
      </AuthProvider>
    </ToastProvider>
  );
};
