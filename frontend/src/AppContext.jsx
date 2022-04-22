import { createContext, useEffect } from "react";
import React from "react";

export const AppContext = createContext();
const AppContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <AppContext.Provider
      value={{ user, isAuthenticated, setUser, setIsAuthenticated }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
