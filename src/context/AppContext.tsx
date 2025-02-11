import { Modal, SizeType } from '@/components/modal';
import { AccessLock, Cancel } from '@/components/svg/modal/Modal';
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
  accessDenied: boolean;
  setAccessDenied: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [accessDenied, setAccessDenied] = useState(false);
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
    <UserContext.Provider
      value={{ user, setUser, token, setToken, accessDenied, setAccessDenied }}
    >
      <>
        {children}
        {accessDenied && (
          <Modal
            isBackground
            isCentered
            size={SizeType.MEDIUM}
            cancelIcon={<Cancel />}
            onClick={() => setAccessDenied(false)}
            className='640:!max-w-[610px] 1240:!max-w-[717px]'
          >
            <div className='mb-4 mt-3'>
              <AccessLock />
            </div>
            <h3 className='font-medium text-[22px] 768:text-2xl 1240:text-[30px] text-light-primary-deep_black pb-4'>
              Access Denied
            </h3>
            <p className='text-lg 880:text-xl text-light-primary-deep_black font-medium'>
              You do not have permission to complete this action. Please contact
              your system administrator if you believe this is an error.
            </p>
          </Modal>
        )}
      </>
    </UserContext.Provider>
  );
};
