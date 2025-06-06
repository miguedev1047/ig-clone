import Image from 'next/image'

import { PostImageProps } from '@/components/post-image/post-image.props'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export function PostImage(props: PostImageProps) {
  const { src, alt, className } = props

  if (!src || !alt) return <Skeleton className='w-full h-[500px]' />

  return (
    <Image
      width={500}
      height={500}
      src={src}
      alt={alt}
      className={cn('size-full rounded-(--radius)', className)}
    />
  )
}
