'use client';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Badge,
  useDisclosure,
} from '@chakra-ui/react';
import { IoEllipsisVertical } from 'react-icons/io5';
import { User } from '../../types/auth';
import { usePermissions } from '../../hooks/usePermissions';
import Card from 'components/card/Card';

interface UserManagementProps {
  users: User[];
  onEditUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
}

export default function UserManagement({
  users,
  onEditUser,
  onDeleteUser
}: UserManagementProps) {
  const { hasPermission } = usePermissions();
  const toast = useToast();

  const handleDeleteUser = async (userId: string) => {
    try {
      await onDeleteUser(userId);
      toast({
        title: 'User deleted successfully',
        status: 'success',
      });
    } catch (error) {
      toast({
        title: 'Error deleting user',
        status: 'error',
      });
    }
  };

  return (
    <Card>
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Status</Th>
              <Th>Last Login</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>{`${user.firstName} ${user.lastName}`}</Td>
                <Td>{user.email}</Td>
                <Td>
                  <Badge colorScheme={user.role.name === 'SUPER_ADMIN' ? 'purple' : 'blue'}>
                    {user.role.name}
                  </Badge>
                </Td>
                <Td>
                  <Badge colorScheme={user.isActive ? 'green' : 'red'}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </Td>
                <Td>{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}</Td>
                <Td>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<IoEllipsisVertical />}
                      variant="ghost"
                      size="sm"
                    />
                    <MenuList>
                      {hasPermission('UPDATE_USER') && (
                        <MenuItem onClick={() => onEditUser(user)}>
                          Edit User
                        </MenuItem>
                      )}
                      {hasPermission('DELETE_USER') && (
                        <MenuItem
                          color="red.500"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          Delete User
                        </MenuItem>
                      )}
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Card>
  );
}
