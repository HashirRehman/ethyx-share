'use client';
import { Box, SimpleGrid, Text, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ThirdPartyConfig } from '../../types/thirdParty';
import { ApiFactory } from 'app/API/ApiFactory';
import ApiConfigurationPanel from 'app/API/ApiConfigurationPanel';

export default function ThirdPartyIntegrationsPage() {
  const [configs, setConfigs] = useState<ThirdPartyConfig[]>([]);
  const toast = useToast();

  useEffect(() => {
    // Fetch configurations from your backend
    fetchConfigurations();
  }, []);

  const fetchConfigurations = async () => {
    try {
      // Implement your API call to fetch configurations
      // setConfigs(data);
    } catch (error) {
      toast({
        title: 'Error fetching configurations',
        status: 'error',
      });
    }
  };

  const handleSaveConfig = async (config: ThirdPartyConfig) => {
    try {
      // Save configuration to your backend
      // Initialize the API client
      const apiFactory = ApiFactory.getInstance();
      apiFactory.initializeClient(config);

      await fetchConfigurations();
    } catch (error) {
      throw error;
    }
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        Third-Party API Integrations
      </Text>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        {configs.map((config) => (
          <ApiConfigurationPanel
            key={config.provider}
            config={config}
            onSave={handleSaveConfig}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
