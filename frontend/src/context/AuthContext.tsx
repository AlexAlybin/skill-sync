'use client';

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import api from '@/lib/axios';

type User = { id: string; email: string; name: string, role?: string };
type AuthContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, setUser: () => {} });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/auth/me');
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
