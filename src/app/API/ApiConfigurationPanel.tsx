'use client';
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ThirdPartyConfig, ApiProvider } from '../../types/thirdParty';
import Card from 'components/card/Card';

interface ApiConfigurationPanelProps {
  config: ThirdPartyConfig;
  onSave: (config: ThirdPartyConfig) => Promise<void>;
}

export default function ApiConfigurationPanel({
  config,
  onSave,
}: ApiConfigurationPanelProps) {
  const [formData, setFormData] = useState<ThirdPartyConfig>(config);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onSave(formData);
      toast({
        title: 'Configuration saved successfully',
        status: 'success',
      });
    } catch (error) {
      toast({
        title: 'Error saving configuration',
        status: 'error',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card p={6}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Provider</FormLabel>
            <Select
              value={formData.provider}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  provider: e.target.value as ApiProvider,
                }))
              }
            >
              <option value="STRIPE">Stripe</option>
              <option value="PAYPAL">PayPal</option>
              <option value="SENDGRID">SendGrid</option>
              <option value="TWILIO">Twilio</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>API Key</FormLabel>
            <Input
              type="password"
              value={formData.apiKey}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, apiKey: e.target.value }))
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>Secret Key</FormLabel>
            <Input
              type="password"
              value={formData.secretKey || ''}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, secretKey: e.target.value }))
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>Environment</FormLabel>
            <Select
              value={formData.environment}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  environment: e.target.value as 'sandbox' | 'production',
                }))
              }
            >
              <option value="sandbox">Sandbox</option>
              <option value="production">Production</option>
            </Select>
          </FormControl>

          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0">Active</FormLabel>
            <Switch
              isChecked={formData.isActive}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isActive: e.target.checked,
                }))
              }
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            isLoading={isLoading}
            width="full"
          >
            Save Configuration
          </Button>
        </VStack>
      </form>
    </Card>
  );
}
