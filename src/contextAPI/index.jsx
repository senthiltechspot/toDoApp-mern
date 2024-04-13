import React from "react";
import { AuthProvider } from "./Auth";

export const IndexProvider = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
