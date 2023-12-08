import React, {
  createContext, useState, useContext, ReactNode, useMemo,
} from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: Function
}

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const authContextValue = useMemo(() => ({ isLoggedIn, setIsLoggedIn }), [
    isLoggedIn,
    setIsLoggedIn,
  ]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
