import { Modal, SizeType } from '@/components/modal';
import { AccessLock, Cancel } from '@/components/svg/modal/Modal';
import { createContext, ReactNode, useContext, useState } from 'react';

export enum UserRole {
  ADMIN = 'admin',
  SUB_ADMIN = 'sub-admin',
}

export enum Permission {
  ADD_ADMIN = 'add_admin',
  REMOVE_ADMIN = 'remove_admin',
  SHARE_POINTS = 'share_points',
  VIEW_TEAM_MEMBERS = 'view_team_members',
}

interface RolePermissions {
  role: UserRole;
  permissions: Permission[];
  setAccessDenied: React.Dispatch<React.SetStateAction<boolean>>;
  hasPermission: (receivedPermission: Permission) => boolean;
  isRole: (requiredRole: UserRole) => boolean;
}

const PermissionContext = createContext<RolePermissions | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
  role: UserRole;
  permissions: Permission[];
}

export const PermissionProvider = ({
  children,
  role,
  permissions,
}: ProviderProps) => {
  const [accessDenied, setAccessDenied] = useState(false);

  const hasPermission = (receivedPermission: Permission) =>
    permissions.includes(receivedPermission);

  const isRole = (requiredRole: UserRole) => role === requiredRole;
  return (
    <PermissionContext.Provider
      value={{ role, permissions, setAccessDenied, hasPermission, isRole }}
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
    </PermissionContext.Provider>
  );
};

export const usePermission = () => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error('usePermission must be used within a PermissionProvider');
  }

  return context;
};
