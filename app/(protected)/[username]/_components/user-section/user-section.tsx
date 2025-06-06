'use client' 

import { ProfileError } from '@/components/errors'
import { UserProfileSkeleton } from '@/components/skeletons'
import { useUserByNameQuery } from '@/use-queries/user'
import { useParams } from 'next/navigation'
import { PrivateProfile } from '@/app/(protected)/[username]/_components/private-profile'
import { PublicProfile } from '@/app/(protected)/[username]/_components/public-profile'
import { useClientSession } from '@/lib/auth-client'

export function UserSection() {
  const currentSession = useClientSession()

  const { username } = useParams<{ username: string }>()
  const profileUser = useUserByNameQuery(username)

  const isLoading = profileUser.isLoading || currentSession.isPending
  const isError = profileUser.isError || currentSession.error

  if (isLoading) return <UserProfileSkeleton />
  if (isError) return <ProfileError />

  const isOwnProfile = profileUser.data?.id === currentSession.data?.user.id
  return isOwnProfile ? <PrivateProfile /> : <PublicProfile />
}
