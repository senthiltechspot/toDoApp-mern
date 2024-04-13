import React, { createContext, useContext, useEffect, useState } from "react";

// Create a context for managing authentication
const AuthContext = createContext(null);

// Define a provider to wrap the app and manage authentication state
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkLogin, setCheckLogin] = useState(false);
  const login = () => {
    // Perform login logic
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Perform logout logic
    setIsLoggedIn(false);
  };

  const TriggerCheckLogin = () => {
    setCheckLogin(!checkLogin);
  };

  useEffect(() => {
    const logged = sessionStorage.getItem("isLoggedIn") === "true";
    if (logged) {
      setIsLoggedIn(true);
    }
  }, [checkLogin]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, TriggerCheckLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
