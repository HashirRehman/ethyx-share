export type ApiProvider =
  | 'STRIPE'
  | 'PAYPAL'
  | 'SENDGRID'
  | 'TWILIO'
  | 'GOOGLE_ANALYTICS'
  | 'SLACK';

export interface ThirdPartyConfig {
  provider: ApiProvider;
  apiKey: string;
  secretKey?: string;
  webhookSecret?: string;
  environment: 'sandbox' | 'production';
  isActive: boolean;
  additionalConfig?: Record<string, any>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
