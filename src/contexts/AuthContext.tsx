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
import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  onboardingComplete: boolean;
  setOnboardingComplete: (value: boolean) => void;
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
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);

      const checkOnboarding = async () => {
        if (u) {
          const docRef = doc(db, "users", u.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setOnboardingComplete(data?.onboardingComplete ?? false);
          } else {
            setOnboardingComplete(false);
          }
        } else {
          setOnboardingComplete(false);
        }
        setLoading(false);
      };
      checkOnboarding();
    });
    return unsub;
  }, []);

  const signup = (email: string, pw: string) =>
    createUserWithEmailAndPassword(auth, email, pw);

  const login = (email: string, pw: string) =>
    signInWithEmailAndPassword(auth, email, pw);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        onboardingComplete,
        setOnboardingComplete,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
