'use client';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  useToast,
  useColorModeValue
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import { useState } from 'react';
import { LedgerEntry } from '../../types/ledger';
import { format } from 'date-fns';

interface ReconciliationViewProps {
  entries: LedgerEntry[];
  onReconcile: (entries: string[]) => Promise<void>;
}

export default function ReconciliationView({
  entries,
  onReconcile
}: ReconciliationViewProps) {
  const [selectedEntries, setSelectedEntries] = useState<Set<string>>(new Set());
  const [isReconciling, setIsReconciling] = useState(false);
  const toast = useToast();

  const textColor = useColorModeValue('navy.700', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const handleToggleEntry = (entryId: string) => {
    const newSelected = new Set(selectedEntries);
    if (newSelected.has(entryId)) {
      newSelected.delete(entryId);
    } else {
      newSelected.add(entryId);
    }
    setSelectedEntries(newSelected);
  };

  const handleReconcile = async () => {
    if (selectedEntries.size === 0) {
      toast({
        title: 'No entries selected',
        status: 'warning',
        duration: 3000,
      });
      return;
    }

    setIsReconciling(true);
    try {
      await onReconcile(Array.from(selectedEntries));
      toast({
        title: 'Entries reconciled successfully',
        status: 'success',
        duration: 3000,
      });
      setSelectedEntries(new Set());
    } catch (error) {
      toast({
        title: 'Error reconciling entries',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        status: 'error',
        duration: 5000,
      });
    } finally {
      setIsReconciling(false);
    }
  };

  return (
    <Card>
      <Flex justify="space-between" align="center" mb={4}>
        <Text color={textColor} fontSize="lg" fontWeight="bold">
          Reconciliation
        </Text>
        <Button
          colorScheme="blue"
          isLoading={isReconciling}
          onClick={handleReconcile}
          isDisabled={selectedEntries.size === 0}
        >
          Reconcile Selected
        </Button>
      </Flex>

      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th width="50px">
                <Checkbox
                  isChecked={selectedEntries.size === entries.length}
                  isIndeterminate={selectedEntries.size > 0 && selectedEntries.size < entries.length}
                  onChange={() => {
                    if (selectedEntries.size === entries.length) {
                      setSelectedEntries(new Set());
                    } else {
                      setSelectedEntries(new Set(entries.map(e => e.id)));
                    }
                  }}
                />
              </Th>
              <Th>Date</Th>
              <Th>Description</Th>
              <Th>Type</Th>
              <Th>Amount</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {entries.map((entry) => (
              <Tr key={entry.id} borderColor={borderColor}>
                <Td>
                  <Checkbox
                    isChecked={selectedEntries.has(entry.id)}
                    onChange={() => handleToggleEntry(entry.id)}
                  />
                </Td>
                <Td>{format(new Date(entry.date), 'MMM dd, yyyy')}</Td>
                <Td>
                  <Text color={textColor} fontSize="sm">
                    {entry.description}
                  </Text>
                </Td>
                <Td>{entry.type}</Td>
                <Td>
                  <Text
                    color={entry.type === 'CREDIT' ? 'green.500' : 'red.500'}
                    fontSize="sm"
                    fontWeight="500"
                  >
                    ${entry.amount.toFixed(2)}
                  </Text>
                </Td>
                <Td>{entry.status}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Card>
  );
}
