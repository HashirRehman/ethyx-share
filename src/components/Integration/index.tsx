'use client';
import { Box, SimpleGrid, useDisclosure, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { APIIntegration, IntegrationConfig } from '../../types/integration';
import { IntegrationService } from '../../services/integrationService';
import IntegrationCard from './IntegrationCard';
import IntegrationConfigModal from './IntegrationConfigModal';

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<APIIntegration[]>([]);
  const [selectedIntegration, setSelectedIntegration] = useState<APIIntegration | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const integrationService = IntegrationService.getInstance();

  useEffect(() => {
    fetchIntegrations();
  }, []);

  const fetchIntegrations = async () => {
    try {
      const data = await integrationService.getIntegrations();
      setIntegrations(data);
    } catch (error) {
      toast({
        title: 'Error fetching integrations',
        status: 'error',
      });
    }
  };

  const handleToggle = async (id: string, status: 'ENABLED' | 'DISABLED') => {
    try {
      await integrationService.toggleIntegration(id, status);
      fetchIntegrations();
    } catch (error) {
      throw error;
    }
  };

  const handleConfigure = async (id: string, config: IntegrationConfig) => {
    try {
      await integrationService.configureIntegration(id, config);
      fetchIntegrations();
    } catch (error) {
      throw error;
    }
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {integrations.map((integration) => (
          <IntegrationCard
            key={integration.id}
            integration={integration}
            onToggle={handleToggle}
            onConfigure={(integration) => {
              setSelectedIntegration(integration);
              onOpen();
            }}
          />
        ))}
      </SimpleGrid>

      {selectedIntegration && (
        <IntegrationConfigModal
          integration={selectedIntegration}
          isOpen={isOpen}
          onClose={onClose}
          onSave={handleConfigure}
        />
      )}
    </Box>
  );
}
