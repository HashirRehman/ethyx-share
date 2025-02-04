import { BaseApiClient } from './BaseApiClient';
import Stripe from 'stripe';

export class StripeClient extends BaseApiClient {
  private stripe: Stripe;

  constructor(apiKey: string) {
    super(apiKey, 'https://api.stripe.com/v1');
    this.stripe = new Stripe(apiKey, {
      apiVersion: '2025-01-27.acacia',
    });
  }

  async createPaymentIntent(amount: number, currency: string = 'usd') {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
      });
      return { success: true, data: paymentIntent };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment intent creation failed',
      };
    }
  }

  async createCustomer(email: string, name: string) {
    try {
      const customer = await this.stripe.customers.create({
        email,
        name,
      });
      return { success: true, data: customer };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Customer creation failed',
      };
    }
  }
}
