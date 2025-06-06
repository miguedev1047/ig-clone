'use client'

import { CountingNumber } from '@/components/ui/counting-number'
import { Badge } from '@/components/ui/badge'
import { AuthorAvatar } from '@/components/author-avatar'
import { ProfileNotFound } from '@/components/profile-not-found'
import { useParams } from 'next/navigation'
import { useUserByNameQuery } from '@/use-queries/user'
import { FollowButton } from '@/app/(protected)/[username]/_components/follow-button'
import { ProfileMedia } from '@/app/(protected)/[username]/_components/profile-media'

export function PublicProfile() {
  const { username } = useParams<{ username: string }>()
    const { data: user } = useUserByNameQuery(username)

  if (!user) return <ProfileNotFound />

  return (
    <div className='w-full'>
      <header className='w-full h-[14rem]'>
        <div className='w-full grid grid-cols-3 gap-52'>
          <AuthorAvatar
            user={user}
            size='profile'
            showName={false}
          />

          <div className='col-span-2 space-y-4'>
            <div className='flex items-center gap-5'>
              <h2 className='font-normal text-lg'>{user?.name}</h2>
              <FollowButton />
            </div>

            <div className='w-full grid grid-cols-3 gap-1'>
              <div className='flex items-center gap-1'>
                <CountingNumber
                  className='font-semibold'
                  number={user?.posts.length || 0}
                />
                <p className='text-sm text-muted-foreground'>Posts</p>
              </div>
              <div className='flex items-center gap-1'>
                <CountingNumber
                  className='font-semibold'
                  number={user?.followings.length || 0}
                />
                <p className='text-sm text-muted-foreground'>Followers</p>
              </div>
              <div className='flex items-center gap-1'>
                <CountingNumber
                  className='font-semibold'
                  number={user?.followers.length || 0}
                />
                <p className='text-sm text-muted-foreground'>Following</p>
              </div>
            </div>

            <div>
              {user?.caption && (
                <div className='space-y-2'>
                  <Badge className='text-xs'>@{user.name}</Badge>
                  <p className='text-pretty text-sm'>{user.caption}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <ProfileMedia />
    </div>
  )
}
