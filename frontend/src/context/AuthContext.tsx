'use client';

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import api from '@/lib/axios';

export type User = { id: string; email: string; name: string, role?: string };

type AuthContextType = {
  user: User | null;
  handleLogout: () => void;
};

const AuthContext = createContext<AuthContextType>({ user: null, handleLogout: () => { } });

export const AuthProvider = ({ children, user: initialUser }: { children: React.ReactNode, user: User | null }) => {
  const [user, setUser] = useState<User | null>(initialUser);

  useEffect(() => {
      setUser(initialUser);
  }, [initialUser]);

  return (
    <AuthContext.Provider value={{ user, handleLogout: () => setUser(null) }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
