import { createContext, useContext, useState, useCallback } from "react";
import PropTypes from "prop-types";
import newRequest from "./newRequest";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authError, setAuthError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const clearAuthError = useCallback(() => {
    setAuthError(null);
  }, []);

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const user = localStorage.getItem("currentUser");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback(
    async (email, password) => {
      clearAuthError();
      setIsLoading(true);
      try {
        const res = await newRequest.post("/auth/login", { email, password });
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        setCurrentUser(res.data);
        setAuthError(null);
        setIsLoading(false);
      } catch (error) {
        setAuthError(error.response.data.msg || "Login failed");
        setIsLoading(false);
        throw error;
      }
    },
    [clearAuthError]
  );

  const register = useCallback(
    async (name, email, password) => {
      clearAuthError();
      setIsLoading(true);
      try {
        const res = await newRequest.post("/auth/register", {
          name,
          email,
          password,
        });
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        setCurrentUser(res.data);
        setAuthError(null);
        setIsLoading(false);
      } catch (error) {
        setAuthError(error.response.data.msg || "Register failed");
        setIsLoading(false);
        throw error;
      }
    },
    [clearAuthError]
  );

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
      value={{
        currentUser,
        clearAuthError,
        login,
        register,
        logout,
        refreshCurrentUser,
        authError,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
