import { getServerSession } from '@/lib/auth'

export const isValidServerSession = async () => {
  const session = await getServerSession()

  if (!session) {
    return { success: false, message: 'Unauthorized' }
  }

  return !!session
}
