import { db } from '@/lib/db'
import { betterAuth } from 'better-auth'
import { nextCookies } from 'better-auth/next-js'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { headers } from 'next/headers'

export const auth = betterAuth({
  database: prismaAdapter(db, { provider: 'sqlite' }),
  emailAndPassword: { enabled: true },
  socialProviders: {
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    },
  },
  user: {
    additionalFields: {
      website: { type: 'string', required: false },
      caption: { type: 'string', required: false },
      gender: { type: 'string', required: false },
    },
  },
  plugins: [nextCookies()],
})

export const getServerSession = async () =>
  await auth.api.getSession({
    headers: await headers(),
  })

export type SessionProps = typeof auth.$Infer.Session
