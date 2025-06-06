'use client'

import Link from 'next/link'
import Image from 'next/image'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import {
  AuthorHoverCardProps,
  AuthorHoverCardContentProps,
} from '@/components/author-hover-card/author-hover-card.props'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { CountingNumber } from '@/components/ui/counting-number'
import { AuthorHoverCardSkeleton } from '@/components/skeletons'
import { Button } from '@/components/ui/button'
import { Link2 } from 'lucide-react'
import { useUserByNameQuery } from '@/use-queries/user'
import { cn } from '@/lib/utils'
import { DEFAULT_IMAGE } from '@/constants/misc'

export function AuthorHoverCard(props: AuthorHoverCardProps) {
  const { user, showName = false, className } = props
  const userName = user?.name.charAt(0).toUpperCase()

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link
          href={`/${user?.name}`}
          className='flex items-center gap-2'
        >
          <Avatar className={cn(className)}>
            <AvatarImage src={user?.image || DEFAULT_IMAGE} />
            <AvatarFallback>{userName}</AvatarFallback>
          </Avatar>

          {showName && <p className='font-semibold text-sm'>{user?.name}</p>}
        </Link>
      </HoverCardTrigger>
      <HoverCardContent
        align='start'
        className='w-[400px] px-0 bg-background data-[state=open]:z-[100] dark:shadow-white/10 shadow-lg'
      >
        <AuthorHoverCardContent name={user?.name} />
      </HoverCardContent>
    </HoverCard>
  )
}

export function AuthorHoverCardContent(props: AuthorHoverCardContentProps) {
  const { name } = props
  const { data: user, isLoading } = useUserByNameQuery(name || '')

  const userName = user?.name.charAt(0).toUpperCase()

  if (isLoading || !user) return <AuthorHoverCardSkeleton />

  const LATEST_POSTS = user.posts?.slice(0, 3).map((post) => (
    <li
      key={post.id}
      className='aspect-square group/post overflow-hidden relative'
    >
      <figure className='select-none pointer-events-none size-full overflow-hidden'>
        <Image
          width={500}
          height={500}
          src={post.imageUrl || ''}
          alt={post.description || ''}
          className='size-full object-cover'
        />
      </figure>
    </li>
  ))

  return (
    <div className='w-full space-y-6'>
      <div className='flex items-center gap-4 px-4'>
        <Avatar className='size-12'>
          <AvatarImage src={user.image || ''} />
          <AvatarFallback>{userName}</AvatarFallback>
        </Avatar>

        <div>
          <p>{user.name}</p>
          <Badge>@{user.name}</Badge>
        </div>
      </div>

      <div className='w-full grid grid-cols-3 gap-1'>
        <div className='text-center'>
          <CountingNumber
            className='font-semibold'
            number={user.posts.length || 0}
          />
          <p>Posts</p>
        </div>
        <div className='text-center'>
          <CountingNumber
            className='font-semibold'
            number={user.followings.length || 0}
          />
          <p>Followers</p>
        </div>
        <div className='text-center'>
          <CountingNumber
            className='font-semibold'
            number={user.followers.length || 0}
          />
          <p>Following</p>
        </div>
      </div>

      <ul className='grid grid-cols-3 gap-1'>{LATEST_POSTS}</ul>

      <div className='px-4'>
        <Button
          className='w-full'
          asChild
        >
          <Link href={`/${user.name}`}>
            <Link2 />
            View Profile
          </Link>
        </Button>
      </div>
    </div>
  )
}
