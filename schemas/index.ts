import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
})

export const signUpSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
})

export const postSchema = z.object({
  description: z
    .string()
    .min(3, { message: 'Description must be at least 3 characters' }),
  postId: z
    .string()
    .min(3, { message: 'Post ID must be at least 3 characters' }),
  isPrivate: z.boolean(),
  enabledComments: z.boolean(),
  location: z.string().optional(),
})
