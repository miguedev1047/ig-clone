'use client'

import Link from 'next/link'

import {
  AuthorAvatarUpload,
  AuthorAvatarUploadContent,
  AuthorAvatarUploadTrigger,
} from '@/components/author-avatar-upload'
import { Button } from '@/components/ui/button'
import { CountingNumber } from '@/components/ui/counting-number'
import { Badge } from '@/components/ui/badge'
import { LinkIcon } from 'lucide-react'
import { SignOutButton } from '@/components/sign-out-button'
import { useUserByNameQuery } from '@/use-queries/user'
import { useParams } from 'next/navigation'
import { ProfileMedia } from '@/app/(protected)/[username]/_components/profile-media'
import { AuthorAvatarProvider } from '@/providers/author-avatar-upload-provider'
import { ProfileNotFound } from '@/components/profile-not-found'
import { UserAvatar } from '@/components/user-avatar'

export function PrivateProfile() {
  const { username } = useParams<{ username: string }>()
  const { data: user } = useUserByNameQuery(username)

  if (!user) return <ProfileNotFound />

  return (
    <div className='w-full'>
      <header className='w-full h-[14rem]'>
        <div className='w-full flex items-center gap-32'>
          <AuthorAvatarProvider>
            <AuthorAvatarUpload>
              <AuthorAvatarUploadTrigger>
                <UserAvatar size='profile' />
              </AuthorAvatarUploadTrigger>

              <AuthorAvatarUploadContent />
            </AuthorAvatarUpload>
          </AuthorAvatarProvider>

          <div className='space-y-4'>
            <div className='flex items-center gap-5'>
              <h2 className='font-normal text-lg'>{user?.name}</h2>

              <div className='flex items-center gap-2'>
                <Button asChild>
                  <Link href='/edit/account'>Edit Profile</Link>
                </Button>
                
                <SignOutButton />
              </div>
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
              <Badge className='text-xs mb-0.5'>@{user?.name}</Badge>
              {user?.caption && (
                <p className='text-pretty text-sm'>{user.caption}</p>
              )}
              {user?.website && (
                <div className='flex items-center gap-2 text-sky-600 dark:text-sky-100'>
                  <LinkIcon className='size-3' />
                  <a
                    href={user.website}
                    target='_blank'
                    className='text-pretty text-sm font-semibold'
                  >
                    {user?.website}
                  </a>
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
