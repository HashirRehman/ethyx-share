'use client';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  useToast,
  VStack
} from '@chakra-ui/react';
import { useState } from 'react';
import { LedgerService } from '../../services/ledgerService';

interface TransactionFormData {
  fromAccount: string;
  toAccount: string;
  amount: string;
  description: string;
}

export default function TransactionForm() {
  const [formData, setFormData] = useState<TransactionFormData>({
    fromAccount: '',
    toAccount: '',
    amount: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const ledgerService = LedgerService.getInstance();
      await ledgerService.createTransaction(
        formData.fromAccount,
        formData.toAccount,
        parseFloat(formData.amount),
        formData.description
      );

      toast({
        title: 'Transaction created successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Reset form
      setFormData({
        fromAccount: '',
        toAccount: '',
        amount: '',
        description: ''
      });
    } catch (error) {
      toast({
        title: 'Error creating transaction',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>From Account</FormLabel>
          <Select
            placeholder="Select account"
            value={formData.fromAccount}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              fromAccount: e.target.value
            }))}
          >
            {/* Add account options */}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>To Account</FormLabel>
          <Select
            placeholder="Select account"
            value={formData.toAccount}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              toAccount: e.target.value
            }))}
          >
            {/* Add account options */}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Amount</FormLabel>
          <Input
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              amount: e.target.value
            }))}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Input
            value={formData.description}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              description: e.target.value
            }))}
          />
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          isLoading={isLoading}
          width="full"
        >
          Create Transaction
        </Button>
      </VStack>
    </Box>
  );
}
