export const PERMISSIONS = {
  // User Management
  CREATE_USER: 'create_user',
  UPDATE_USER: 'update_user',
  DELETE_USER: 'delete_user',
  VIEW_USERS: 'view_users',

  // Role Management
  MANAGE_ROLES: 'manage_roles',

  // System Settings
  MANAGE_SETTINGS: 'manage_settings',

  // Audit Logs
  VIEW_AUDIT_LOGS: 'view_audit_logs',

  // Ledger Management
  MANAGE_LEDGER: 'manage_ledger',
  VIEW_LEDGER: 'view_ledger',

  // Reports
  GENERATE_REPORTS: 'generate_reports',
  VIEW_REPORTS: 'view_reports',
} as const;

export type PermissionCode = keyof typeof PERMISSIONS;

export const DEFAULT_PERMISSIONS: Record<UserRole, PermissionCode[]> = {
  SUPER_ADMIN: Object.keys(PERMISSIONS) as PermissionCode[],
  ADMIN: [
    'VIEW_USERS',
    'CREATE_USER',
    'UPDATE_USER',
    'VIEW_LEDGER',
    'MANAGE_LEDGER',
    'GENERATE_REPORTS',
    'VIEW_REPORTS',
  ],
  USER: [
    'VIEW_LEDGER',
    'VIEW_REPORTS',
  ],
};
