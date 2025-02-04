import { Box, Button, useDisclosure } from '@chakra-ui/react';
import { SetStateAction, useEffect, useState } from 'react';
import { User } from '../../types/auth';
import { AdminService } from '../../services/adminService';
import { usePermissions } from '../../hooks/usePermissions';
import UserForm from './Userform';
import UserManagement from './UserManagement';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { hasPermission } = usePermissions();
  const adminService = AdminService.getInstance();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await adminService.getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreateUser = async (userData: Partial<User>) => {
    await adminService.createUser(userData);
    fetchUsers();
  };

  const handleUpdateUser = async (userData: Partial<User>) => {
    if (selectedUser) {
      await adminService.updateUser(selectedUser.id, userData);
      fetchUsers();
    }
  };

  const handleDeleteUser = async (userId: string) => {
    await adminService.deleteUser(userId);
    fetchUsers();
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      {hasPermission('CREATE_USER') && (
        <Button
          colorScheme="blue"
          mb={4}
          onClick={() => {
            setSelectedUser(undefined);
            onOpen();
          }}
        >
          Create User
        </Button>
      )}

      <UserManagement
        users={users}
        onEditUser={(user: SetStateAction<User>) => {
          setSelectedUser(user);
          onOpen();
        }}
        onDeleteUser={handleDeleteUser}
      />

      <UserForm
        user={selectedUser}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={selectedUser ? handleUpdateUser : handleCreateUser}
      />
    </Box>
  );
}
