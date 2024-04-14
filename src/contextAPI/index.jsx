import React from "react";
import { AuthProvider } from "./Auth";
import { TaskProvider } from "./TaskProvider";

export const IndexProvider = ({ children }) => {
  return (
    <AuthProvider>
      <TaskProvider>{children}</TaskProvider>
    </AuthProvider>
  );
};
