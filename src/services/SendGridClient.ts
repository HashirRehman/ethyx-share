import { BaseApiClient } from './BaseApiClient';
import sgMail from '@sendgrid/mail';

export class SendGridClient extends BaseApiClient {
  constructor(apiKey: string) {
    super(apiKey, 'https://api.sendgrid.com/v3');
    sgMail.setApiKey(apiKey);
  }

  async sendEmail(to: string, subject: string, content: string) {
    try {
      await sgMail.send({
        to,
        from: process.env.SENDGRID_FROM_EMAIL!,
        subject,
        html: content,
      });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Email sending failed',
      };
    }
  }
}
