'use client'

import { authClient } from '@/lib/auth-client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { DEFAULT_IMAGE } from '@/constants/misc'

const authorAvatarVariants = cva('', {
  variants: {
    size: {
      sm: 'size-6',
      base: 'size-8',
      md: 'size-10',
      lg: 'size-12',
      xl: 'size-16',
      '2xl': 'size-20',
      profile: 'size-[150px]',
    },
  },
  defaultVariants: { size: 'base' },
})

export function UserAvatar({
  className,
  size,
  showName,
  ...props
}: React.ComponentProps<typeof Avatar> &
  VariantProps<typeof authorAvatarVariants> & {
    showName?: boolean
  }) {
  const { data: session, isPending, error } = authClient.useSession()

  if (isPending || error) {
    return (
      <Skeleton
        className={cn(
          'rounded-full',
          authorAvatarVariants({ className, size })
        )}
      />
    )
  }

  const userImage = session?.user.image || DEFAULT_IMAGE
  const userName = session?.user.name || ''

  return (
    <div className='flex items-center gap-2 select-none pointer-events-none'>
      <Avatar
        className={cn(authorAvatarVariants({ className, size }))}
        {...props}
      >
        <AvatarImage src={userImage} />
        <AvatarFallback>{userName.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>

      {showName && <p className='font-semibold text-sm'>{userName}</p>}
    </div>
  )
}
