import * as z from 'zod'

export const signUpSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
})

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
})

export const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
})

export const postSchema = z.object({
  description: z.string().optional(),
  isPrivate: z.boolean(),
  enabledComments: z.boolean(),
  location: z.string().optional(),
  postId: z.string().optional(),
  imageUrl: z.string().optional(),
})

export const commentSchema = z.object({
  content: z.string().min(1, { message: 'Comment is required!' }),
  userId: z.string(),
  postId: z.string(),
})

export const followingSchema = z.object({
  followerId: z.string().optional(),
  followingId: z.string().optional(),
})

export const savedPostSchema = z.object({
  userId: z.string().optional(),
  postId: z.string().optional(),
})

export const profileSchema = z.object({
  name: z.string().min(1, { message: 'Name is required!' }),
  gender: z.string().min(1, {
    message: 'Gender is required!',
  }),
  userId: z.string().min(1, {
    message: 'User ID is required!',
  }),
  caption: z.string().min(10, {
    message: 'Caption is required!',
  }),
  website: z.string().optional(),
})

export const searchUserSchema = z.object({
  username: z.string().min(1, { message: 'Username is required!' }),
})
