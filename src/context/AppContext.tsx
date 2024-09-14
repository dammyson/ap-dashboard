import { User } from '@/types/types';
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    const storedToken = sessionStorage.getItem('admin_token');
    return storedToken ? storedToken : null;
  });

  const [user, setUser] = useState<User | null>(() => {
    const storedUser = sessionStorage.getItem('admin_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    sessionStorage.setItem('admin_user', JSON.stringify(user));
    token
      ? sessionStorage.setItem('admin_token', token)
      : sessionStorage.removeItem('admin_token');
  }, [user, token]);

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};
