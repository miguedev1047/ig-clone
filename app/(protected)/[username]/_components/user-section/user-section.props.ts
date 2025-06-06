import { SessionProps } from '@/lib/auth'

export type UserSectionProps = { session: Promise<SessionProps | null> }
