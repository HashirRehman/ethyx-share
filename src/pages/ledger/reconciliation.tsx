import { Box, Container } from '@chakra-ui/react';
import ReconciliationView from '../../components/ledger/ReconciliationView';
import { useState, useEffect } from 'react';
import { LedgerEntry } from '../../types/ledger';
import { LedgerService } from '../../services/ledgerService';

export default function ReconciliationPage() {
  const [entries, setEntries] = useState<LedgerEntry[]>([]);

  useEffect(() => {
    // Fetch unreconciled entries
    // Implement your data fetching logic here
  }, []);

  const handleReconcile = async (entryIds: string[]) => {
    const ledgerService = LedgerService.getInstance();
    // Implement reconciliation logic
  };

  return (
    <Container maxW="container.xl" py={8}>
      <ReconciliationView
        entries={entries}
        onReconcile={handleReconcile}
      />
    </Container>
  );
}
