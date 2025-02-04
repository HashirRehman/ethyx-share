'use client';
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Stack,
  useColorModeValue
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import MiniStatistics from 'components/card/MiniStatistics';
import LineChart from 'components/charts/LineChart';
import { useEffect, useState } from 'react';
import { LedgerAccount, Transaction } from '../../types/ledger';
import TransactionList from './TransactionList';
import AccountsList from './AccountsList';

export default function LedgerDashboard() {
  const [accounts, setAccounts] = useState<LedgerAccount[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [balanceHistory, setBalanceHistory] = useState<number[]>([]);

  const bgColor = useColorModeValue('white', 'navy.700');

  useEffect(() => {
    // Fetch data
    const fetchData = async () => {
      try {
        // Implement data fetching
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <Grid
        templateColumns={{ base: '1fr', md: '1fr 1fr', lg: '2fr 1fr' }}
        gap='20px'
        mb='20px'
      >
        <GridItem colSpan={{ base: 1, lg: 2 }}>
          <Card>
            <Heading size="md" mb={4}>Balance History</Heading>
            <LineChart
              chartData={[
                {
                  name: 'Balance',
                  data: balanceHistory
                }
              ]}
              chartOptions={{
                chart: {
                  toolbar: {
                    show: false
                  }
                },
                xaxis: {
                  type: 'datetime'
                }
              }}
            />
          </Card>
        </GridItem>

        <GridItem>
          <AccountsList accounts={accounts} />
        </GridItem>
        <GridItem>
          <TransactionList data={recentTransactions} />
        </GridItem>
      </Grid>
    </Box>
  );
}
