import { createContext, useReducer, ReactNode } from "react";
import { State, authReducer, initState } from "../reducers/auth-reducers";

interface AuthContextType {
  state: State;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: React.Dispatch<any>;
}

const defaultValueType: AuthContextType = {
  state: initState,
  dispatch: () => null
};

export const AuthContext = createContext<AuthContextType>(defaultValueType);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const user = localStorage.getItem('@user')
  const [state, dispatch] = useReducer(authReducer, {
    isLogged: user ? true : false,
    isLoading: false,
    userInfos: user ? JSON.parse(user) : null,
  });

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
