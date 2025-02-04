'use client';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { APIIntegration, IntegrationConfig } from '../../types/integration';

interface IntegrationConfigModalProps {
  integration: APIIntegration;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, config: IntegrationConfig) => Promise<void>;
}

export default function IntegrationConfigModal({
  integration,
  isOpen,
  onClose,
  onSave,
}: IntegrationConfigModalProps) {
  const [config, setConfig] = useState<IntegrationConfig>({
    apiKey: integration.apiKey || '',
    baseUrl: integration.baseUrl || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave(integration.id, config);
      toast({
        title: 'Configuration saved',
        status: 'success',
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error saving configuration',
        status: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Configure {integration.name}</ModalHeader>
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>API Key</FormLabel>
              <Input
                type="password"
                value={config.apiKey}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, apiKey: e.target.value }))
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Base URL</FormLabel>
              <Input
                value={config.baseUrl}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, baseUrl: e.target.value }))
                }
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSave}
            isLoading={isLoading}
          >
            Save Configuration
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
