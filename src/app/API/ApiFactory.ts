import { BaseApiClient } from 'services/BaseApiClient';
import { ApiProvider, ThirdPartyConfig } from '../../types/thirdParty';
import { StripeClient } from 'services/StripeClient';
import { SendGridClient } from 'services/SendGridClient';

export class ApiFactory {
  private static instance: ApiFactory;
  private clients: Map<ApiProvider, BaseApiClient>;

  private constructor() {
    this.clients = new Map();
  }

  static getInstance(): ApiFactory {
    if (!ApiFactory.instance) {
      ApiFactory.instance = new ApiFactory();
    }
    return ApiFactory.instance;
  }

  initializeClient(config: ThirdPartyConfig): BaseApiClient {
    if (!config.isActive) {
      throw new Error(`${config.provider} is not active`);
    }

    let client: BaseApiClient;

    switch (config.provider) {
      case 'STRIPE':
        client = new StripeClient(config.apiKey);
        break;
      case 'SENDGRID':
        client = new SendGridClient(config.apiKey);
        break;
      // Add other providers here
      default:
        throw new Error(`Unsupported provider: ${config.provider}`);
    }

    this.clients.set(config.provider, client);
    return client;
  }

  getClient(provider: ApiProvider): BaseApiClient {
    const client = this.clients.get(provider);
    if (!client) {
      throw new Error(`Client not initialized for provider: ${provider}`);
    }
    return client;
  }
}
