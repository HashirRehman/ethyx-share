export interface APIIntegration {
  id: string;
  name: string;
  description: string;
  status: 'ENABLED' | 'DISABLED';
  type: 'PAYMENT' | 'ACCOUNTING' | 'CRM' | 'ANALYTICS' | 'OTHER';
  apiKey?: string;
  baseUrl: string;
  isConfigured: boolean;
  lastSync?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IntegrationConfig {
  apiKey?: string;
  secretKey?: string;
  baseUrl?: string;
  additionalConfig?: Record<string, any>;
}
