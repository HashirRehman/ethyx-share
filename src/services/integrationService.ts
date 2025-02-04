import { APIIntegration, IntegrationConfig } from '../types/integration';

export class IntegrationService {
  private static instance: IntegrationService;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  }

  static getInstance(): IntegrationService {
    if (!IntegrationService.instance) {
      IntegrationService.instance = new IntegrationService();
    }
    return IntegrationService.instance;
  }

  async getIntegrations(): Promise<APIIntegration[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/integrations`);
      if (!response.ok) throw new Error('Failed to fetch integrations');
      return response.json();
    } catch (error) {
      throw error;
    }
  }

  async toggleIntegration(id: string, status: 'ENABLED' | 'DISABLED'): Promise<APIIntegration> {
    try {
      const response = await fetch(`${this.baseUrl}/api/integrations/${id}/toggle`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Failed to toggle integration');
      return response.json();
    } catch (error) {
      throw error;
    }
  }

  async configureIntegration(id: string, config: IntegrationConfig): Promise<APIIntegration> {
    try {
      const response = await fetch(`${this.baseUrl}/api/integrations/${id}/configure`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      if (!response.ok) throw new Error('Failed to configure integration');
      return response.json();
    } catch (error) {
      throw error;
    }
  }
}
