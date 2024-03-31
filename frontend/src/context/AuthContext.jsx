import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

// The useAuthContext custom hook is created to provide a convenient way for consuming components to access the
// authentication context values (authUser and setAuthUser) without needing to directly import and use useContext(AuthContext) every time.

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
