'use client';
import {
  Box,
  Flex,
  Text,
  Stack,
  useColorModeValue,
  Button,
  IconButton
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import { LedgerAccount, AccountType } from '../../types/ledger';
import { MdAdd } from 'react-icons/md';

interface AccountsListProps {
  accounts: LedgerAccount[];
  onAddAccount?: () => void;
  onSelectAccount?: (account: LedgerAccount) => void;
}

const getAccountTypeColor = (type: AccountType) => {
  switch (type) {
    case 'ASSET':
      return 'green.500';
    case 'LIABILITY':
      return 'red.500';
    case 'EQUITY':
      return 'blue.500';
    case 'REVENUE':
      return 'purple.500';
    case 'EXPENSE':
      return 'orange.500';
    default:
      return 'gray.500';
  }
};

export default function AccountsList({
  accounts,
  onAddAccount,
  onSelectAccount
}: AccountsListProps) {
  const textColor = useColorModeValue('navy.700', 'white');
  const bgHover = useColorModeValue('gray.100', 'navy.600');

  return (
    <Card>
      <Flex justify="space-between" align="center" mb={4}>
        <Text color={textColor} fontSize="lg" fontWeight="bold">
          Accounts
        </Text>
        <IconButton
          aria-label="Add account"
          icon={<MdAdd />}
          size="sm"
          onClick={onAddAccount}
        />
      </Flex>
      <Stack spacing={3}>
        {accounts.map((account) => (
          <Box
            key={account.id}
            p={3}
            borderRadius="md"
            cursor="pointer"
            _hover={{ bg: bgHover }}
            onClick={() => onSelectAccount?.(account)}
          >
            <Flex justify="space-between" align="center">
              <Box>
                <Text color={textColor} fontWeight="500">
                  {account.name}
                </Text>
                <Text fontSize="sm" color={getAccountTypeColor(account.type)}>
                  {account.type}
                </Text>
              </Box>
              <Text
                color={account.balance >= 0 ? 'green.500' : 'red.500'}
                fontWeight="bold"
              >
                ${Math.abs(account.balance).toFixed(2)}
              </Text>
            </Flex>
          </Box>
        ))}
      </Stack>
    </Card>
  );
}
