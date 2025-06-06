import { useClientSession } from '@/lib/auth-client'
import { followUser } from '@/services/post-service'
import { useUserByNameQuery, useValidateFollowUser } from '@/use-queries/user'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'

export function useFollowButton() {
  const { username } = useParams<{ username: string }>()

  const { data: sessionUser } = useClientSession()
  const { data: profileUser, refetch: profileUserRefetch } = useUserByNameQuery(username)

  const profileData = {
    userId: profileUser?.id,
    followingId: sessionUser?.user.id,
    followerId: profileUser?.id,
  }

  const followingUser = useValidateFollowUser(profileData)

  const handleFollowUser = async () => {
    const followerId = sessionUser?.user.id
    const followingId = profileUser?.id

    const { success, message } = await followUser({ followerId, followingId })

    if (success) {
      profileUserRefetch()
      followingUser.refetch()
      toast.success(message)
      return
    }

    toast.success(message)
  }

  return { sessionUser, profileUser, followingUser, handleFollowUser }
}
