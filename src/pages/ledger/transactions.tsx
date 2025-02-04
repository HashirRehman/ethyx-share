import { Box, Container, VStack } from '@chakra-ui/react';
import TransactionForm from '../../components/ledger/TransactionForm';
import TransactionList from '../../components/ledger/TransactionList';
import { useState, useEffect } from 'react';
import { Transaction } from '../../types/ledger';
import { LedgerService } from '../../services/ledgerService';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Fetch transactions
    // Implement your data fetching logic here
  }, []);

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8}>
        <TransactionForm />
        <TransactionList transactions={transactions} />
      </VStack>
    </Container>
  );
}
