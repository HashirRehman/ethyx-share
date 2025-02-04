export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'USER';

export interface Permission {
  id: string;
  name: string;
  description: string;
  code: string;
}

export interface Role {
  id: string;
  name: UserRole;
  permissions: Permission[];
  description: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}
