import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { usePermissions } from '../../hooks/usePermissions';
import Card from 'components/card/Card';

export default function AdminDashboard() {
  const { hasPermission } = usePermissions();

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {hasPermission('VIEW_USERS') && (
          <GridItem>
            <Card>
              <Text fontSize="lg" fontWeight="bold">
                User Management
              </Text>
              {/* Add user statistics */}
            </Card>
          </GridItem>
        )}

        {hasPermission('VIEW_AUDIT_LOGS') && (
          <GridItem>
            <Card>
              <Text fontSize="lg" fontWeight="bold">
                Audit Logs
              </Text>
              {/* Add audit log summary */}
            </Card>
          </GridItem>
        )}

        {hasPermission('MANAGE_SETTINGS') && (
          <GridItem>
            <Card>
              <Text fontSize="lg" fontWeight="bold">
                System Settings
              </Text>
              {/* Add settings summary */}
            </Card>
          </GridItem>
        )}
      </Grid>
    </Box>
  );
}
