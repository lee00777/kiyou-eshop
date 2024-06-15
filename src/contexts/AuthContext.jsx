import { createContext, useContext, useEffect, useState } from 'react';
import { login, logout, onUserStateChange } from '../api/firebase';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [ user, setUser ] = useState(null);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    onUserStateChange((user) => {
      console.log(user);
      setUser(user);
      setLoading(false); 
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, uid: user && user.uid, loading, login, logout }} >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
