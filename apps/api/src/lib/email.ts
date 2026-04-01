import { Resend } from 'resend';
import { env } from '../env.js';
import { logger } from './logger.js';

const resend = new Resend(env.RESEND_API_KEY);

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
}

export async function sendEmail(options: SendEmailOptions): Promise<boolean> {
  try {
    const { error } = await resend.emails.send({
      from: env.RESEND_FROM_EMAIL,
      to: Array.isArray(options.to) ? options.to : [options.to],
      subject: options.subject,
      html: options.html,
    });

    if (error) {
      logger.error({ error }, 'Failed to send email');
      return false;
    }

    return true;
  } catch (err) {
    logger.error({ err }, 'Email service error');
    return false;
  }
}

export function passwordResetTemplate(resetUrl: string, firstName: string): string {
  return `
    <div style="font-family: 'IBM Plex Sans', sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0A2540;">Reset Your Password</h2>
      <p>Hi ${firstName},</p>
      <p>You requested a password reset for your SEF-DP account. Click the button below to set a new password:</p>
      <a href="${resetUrl}" style="display: inline-block; background: #00A86B; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin: 16px 0;">Reset Password</a>
      <p style="color: #64748b; font-size: 14px;">This link expires in 1 hour. If you didn't request this, you can safely ignore this email.</p>
    </div>
  `;
}

export function welcomeTemplate(firstName: string, loginUrl: string): string {
  return `
    <div style="font-family: 'IBM Plex Sans', sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0A2540;">Welcome to SEF-DP</h2>
      <p>Hi ${firstName},</p>
      <p>Your account has been created on the Sustainable Energy Finance Developer Platform.</p>
      <a href="${loginUrl}" style="display: inline-block; background: #00A86B; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin: 16px 0;">Log In</a>
    </div>
  `;
}
