import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email('Invalid email format').refine((email) => {
    const allowedDomains = process.env.ALLOWED_COLLEGE_DOMAINS?.split(',') || [];
    const domain = email.split('@')[1];
    return allowedDomains.includes(domain);
  }, 'Only allowed college domains can register'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export const profileSchema = z.object({
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  age: z.number().min(18, 'Must be at least 18').max(35, 'Age limit is 35'),
  gender: z.string().min(1, 'Gender is required'),
  instagram_handle: z.string().min(1, 'Instagram handle is required').regex(/^[a-zA-Z0-9._]+$/, 'Invalid Instagram handle'),
});

export const messageSchema = z.object({
  content: z.string().min(1, 'Message cannot be empty').max(2000, 'Message too long'),
});

export const otpSchema = z.object({
  email: z.string().email('Invalid email format').refine((email) => {
    const allowedDomains = process.env.ALLOWED_COLLEGE_DOMAINS?.split(',') || [];
    const domain = email.split('@')[1];
    return allowedDomains.includes(domain);
  }, 'Only allowed college domains can register'),
});

export const verifyOtpSchema = z.object({
  email: z.string().email(),
  token: z.string().length(6, 'OTP must be 6 digits'),
});
