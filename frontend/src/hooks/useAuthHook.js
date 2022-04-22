import { useContext } from "react";
import { AppContext } from "../AppContext";

export const useAuthHook = () => {
  const { user, isAuthenticated, setUser, setIsAuthenticated } =
    useContext(AppContext);

  const login = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", user.token);
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    user,
    login,
    logout,
  };
};
