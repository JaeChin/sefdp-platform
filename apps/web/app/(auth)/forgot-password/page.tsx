'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@sefdp/ui';
import { Input } from '@sefdp/ui';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(data: ForgotPasswordFormValues) {
    // TODO: integrate with password reset API
    console.log('Password reset requested for:', data.email);
  }

  if (isSubmitSuccessful) {
    return (
      <div className="text-center">
        <h2 className="mb-2 text-xl font-semibold">Check Your Email</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          If an account exists with that email, we&apos;ve sent password reset
          instructions.
        </p>
        <Link href="/login/marketplace" className="text-sm font-medium text-primary hover:underline">
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-2 text-center text-xl font-semibold">
        Reset Password
      </h2>
      <p className="mb-6 text-center text-sm text-muted-foreground">
        Enter your email and we&apos;ll send you a reset link.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Send Reset Link'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link href="/login/marketplace" className="font-medium text-primary hover:underline">
          Back to Sign In
        </Link>
      </p>
    </div>
  );
}
