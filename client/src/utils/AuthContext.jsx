import { createContext, useContext, useState, useCallback } from "react";
import PropTypes from "prop-types";
import newRequest from "./newRequest";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authError, setAuthError] = useState(null);
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const user = localStorage.getItem("currentUser");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback(async (email, password) => {
    try {
      const res = await newRequest.post("/auth/login", { email, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      setCurrentUser(res.data);
    } catch (error) {
      setAuthError(error.response.data.msg || "Login failed");
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const response = await newRequest.post("/auth/logout");
      if (response.status === 200) {
        localStorage.removeItem("currentUser");
        setCurrentUser(null);
      } else {
        console.error("Logout failed:", response);
      }
    } catch (error) {
      setAuthError("Logout failed");
      console.error("An error occurred while logging out:", error);
    }
  }, []);

  const refreshCurrentUser = useCallback(() => {
    try {
      const user = localStorage.getItem("currentUser");
      setCurrentUser(user ? JSON.parse(user) : null);
    } catch {
      setCurrentUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, refreshCurrentUser, authError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
