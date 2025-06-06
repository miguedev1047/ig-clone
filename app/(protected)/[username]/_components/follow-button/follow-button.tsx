'use client'

import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useFollowButton } from '@/app/(protected)/[username]/_components/follow-button/follow-button.hooks'

export function FollowButton() {
  const { followingUser, handleFollowUser } = useFollowButton()

  const isLoading = followingUser.isLoading
  const isFollowing = followingUser.data

  const buttonText = isLoading ? null : isFollowing ? 'Following' : 'Follow'

  return (
    <Button
      className='w-28'
      onClick={handleFollowUser}
    >
      {isLoading && <Loader2 className='animate-spin size-4' />}
      {buttonText}
    </Button>
  )
}
