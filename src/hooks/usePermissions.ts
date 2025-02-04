import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { PermissionCode } from '../utils/permissions';

export function usePermissions() {
  const { user } = useContext(AuthContext);

  const hasPermission = (permission: PermissionCode): boolean => {
    return user?.role.permissions.some(p => p.code === permission) ?? false;
  };

  const hasAllPermissions = (permissions: PermissionCode[]): boolean => {
    return permissions.every(permission => hasPermission(permission));
  };

  const hasAnyPermission = (permissions: PermissionCode[]): boolean => {
    return permissions.some(permission => hasPermission(permission));
  };

  return {
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,
  };
}
