'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { AuthorProps } from '@/types/user'
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
  defaultVariants: {
    size: 'base',
  },
})

export function AuthorAvatar({
  className,
  user,
  size,
  showName,
  ...props
}: React.ComponentProps<typeof Avatar> &
  VariantProps<typeof authorAvatarVariants> & {
    user: AuthorProps
    showName?: boolean
  }) {
  return (
    <div className='flex items-center gap-4 select-none pointer-events-none'>
      <Avatar
        className={cn(authorAvatarVariants({ className, size }))}
        {...props}
      >
        <AvatarImage
          src={user?.image || DEFAULT_IMAGE}
          className='object-cover'
        />
        <AvatarFallback>{user?.name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      {showName && <p className='font-semibold'>{user?.name}</p>}
    </div>
  )
}
