'use client';
import {
  Box,
  Switch,
  Text,
  Badge,
  Button,
  useToast,
  Flex,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import { APIIntegration } from '../../types/integration';
import { useState } from 'react';
import { FiSettings } from 'react-icons/fi';

interface IntegrationCardProps {
  integration: APIIntegration;
  onToggle: (id: string, status: 'ENABLED' | 'DISABLED') => Promise<void>;
  onConfigure: (integration: APIIntegration) => void;
}

export default function IntegrationCard({
  integration,
  onToggle,
  onConfigure,
}: IntegrationCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const textColor = useColorModeValue('navy.700', 'white');

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      const newStatus = integration.status === 'ENABLED' ? 'DISABLED' : 'ENABLED';
      await onToggle(integration.id, newStatus);
      toast({
        title: `Integration ${newStatus.toLowerCase()}`,
        status: 'success',
      });
    } catch (error) {
      toast({
        title: 'Error toggling integration',
        status: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card p={4}>
      <Flex justify="space-between" align="center" mb={4}>
        <Box>
          <Text color={textColor} fontSize="lg" fontWeight="bold">
            {integration.name}
          </Text>
          <Text color="gray.500" fontSize="sm">
            {integration.description}
          </Text>
        </Box>
        <Badge
          colorScheme={integration.isConfigured ? 'green' : 'yellow'}
          variant="subtle"
        >
          {integration.isConfigured ? 'Configured' : 'Not Configured'}
        </Badge>
      </Flex>

      <Flex justify="space-between" align="center">
        <Button
          leftIcon={<Icon as={FiSettings} />}
          size="sm"
          variant="outline"
          onClick={() => onConfigure(integration)}
        >
          Configure
        </Button>
        <Switch
          isChecked={integration.status === 'ENABLED'}
          onChange={handleToggle}
          isDisabled={!integration.isConfigured || isLoading}
        />
      </Flex>
    </Card>
  );
}
