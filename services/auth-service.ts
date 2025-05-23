import { authClient } from '@/lib/auth-client'
import { signInSchema, signUpSchema } from '@/schemas'
import { z } from 'zod'

export class AuthService {
  async signIn(data: z.infer<typeof signInSchema>) {
    const VALIDATION = signInSchema.safeParse(data)

    if (!VALIDATION.success) {
      return { success: false, message: 'Invalid data' }
    }

    const { email, password } = VALIDATION.data

    const { error } = await authClient.signIn.email({
      email,
      password,
    })

    if (error) {
      return { success: false, message: 'Failed to sign in' }
    }

    return { success: true, message: 'Signed in successfully' }
  }

  async signUp(data: z.infer<typeof signUpSchema>) {
    const VALIDATION = signUpSchema.safeParse(data)

    if (!VALIDATION.success) {
      return { success: false, message: 'Inavalid data' }
    }

    const { email, name, password } = VALIDATION.data

    const { error } = await authClient.signUp.email({
      email,
      name,
      password,
    })

    if (error) {
      return { success: false, message: 'Failed to sign up' }
    }

    return { success: true, message: 'Signed up successfully' }
  }

  async signInWithDiscord() {
    const { error } = await authClient.signIn.social({
      provider: 'discord',
    })

    if (error) {
      return { success: false, message: 'Failed sign in with Discord' }
    }

    return { success: true, message: 'Sign in successfully' }
  }

  async signOut() {
    const { error } = await authClient.signOut()

    if (error) {
      return { success: false, message: 'Failed to sign out' }
    }

    return { success: true, message: 'Signed out successfully' }
  }
}

export const authService = new AuthService()
