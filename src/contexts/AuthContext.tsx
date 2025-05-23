// src/contexts/AuthContext.tsx
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "../services/firebase";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  signup: (email: string, pw: string) => Promise<any>;
  login: (email: string, pw: string) => Promise<any>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({} as any);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const signup = (email: string, pw: string) =>
    createUserWithEmailAndPassword(auth, email, pw);

  const login = (email: string, pw: string) =>
    signInWithEmailAndPassword(auth, email, pw);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
