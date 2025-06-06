import { Skeleton } from '@/components/ui/skeleton'
import { Avatar } from '@/components/ui/avatar'
import { SKELETON_ARRAY } from '@/constants/general'
import { Separator } from '../ui/separator'
import { Loader } from 'lucide-react'

export function PostCommentSkeleton() {
  return (
    <div className='flex items-start gap-4'>
      <Avatar>
        <Skeleton className='h-10 w-10 rounded-full' />
      </Avatar>
      <div className='text-sm w-full space-y-2'>
        <div className='flex gap-2 items-center'>
          <Skeleton className='h-4 w-24 rounded' />
          <Skeleton className='h-3 w-16 rounded' />
        </div>
        <Skeleton className='h-4 w-full rounded' />
        <Skeleton className='h-4 w-[80%] rounded' />
      </div>
    </div>
  )
}

export function AuthorHoverCardSkeleton() {
  return (
    <div className='w-full space-y-6'>
      <div className='flex items-center gap-4 px-4'>
        <Skeleton className='size-12 rounded-full' />
        <div className='space-y-2'>
          <Skeleton className='h-4 w-32' />
          <Skeleton className='h-3 w-24' />
        </div>
      </div>

      <div className='w-full grid grid-cols-3 gap-1'>
        <div className='text-center space-y-2'>
          <Skeleton className='h-4 w-10 mx-auto' />
          <Skeleton className='h-3 w-14 mx-auto' />
        </div>
        <div className='text-center space-y-2'>
          <Skeleton className='h-4 w-10 mx-auto' />
          <Skeleton className='h-3 w-14 mx-auto' />
        </div>
        <div className='text-center space-y-2'>
          <Skeleton className='h-4 w-10 mx-auto' />
          <Skeleton className='h-3 w-14 mx-auto' />
        </div>
      </div>

      <ul className='grid grid-cols-3 gap-1'>
        {SKELETON_ARRAY.slice(0, 3).map((i) => (
          <li key={i}>
            <Skeleton className='aspect-square w-full rounded-none' />
          </li>
        ))}
      </ul>

      <div className='px-4'>
        <Skeleton className='w-full h-8' />
      </div>
    </div>
  )
}

export function PostsSkeleton() {
  return (
    <div className='space-y-16'>
      {SKELETON_ARRAY.slice(0, 3).map((i) => (
        <article
          key={i}
          className='space-y-2'
        >
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Skeleton className='h-9 w-9 rounded-full' />
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-3 w-12 ml-2' />
              </div>
              <Skeleton className='h-5 w-5' />
            </div>

            <Skeleton className='w-full aspect-square rounded-(--radius)' />

            <div className='flex gap-4'>
              <Skeleton className='h-6 w-6 rounded-full' />
              <Skeleton className='h-6 w-6 rounded-full' />
            </div>

            <div className='space-y-1 text-sm'>
              <Skeleton className='h-4 w-40' />
              <Skeleton className='h-4 w-24' />
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

export function PostLoader() {
  return (
    <div className='flex items-center justify-center py-8'>
      <Loader className='animate-spin size-12' />
    </div>
  )
}

export function PostSkeleton() {
  return (
    <div className='flex h-[95vh] bg-background rounded-md overflow-hidden'>
      <figure className='w-[700px] h-full'>
        <Skeleton className='size-full' />
      </figure>

      <div className='w-[500px] h-full p-3 space-y-6'>
        <div className='flex items-center justify-between'>
          <div className='flex gap-2 items-center'>
            <Skeleton className='size-8 rounded-full' />
            <Skeleton className='h-4 w-32' />
          </div>

          <Skeleton className='size-4' />
        </div>

        <Separator />

        <ul className='w-full h-[575px] relative py-4 grid gap-6' />

        <Separator />

        <div className='space-y-4'>
          <Skeleton className='w-40 h-4 rounded-full' />
          <Skeleton className='w-64 h-4 rounded-full' />
          <Skeleton className='w-32 h-4 rounded-full' />
        </div>
      </div>
    </div>
  )
}

export function PostSectionSkeleton() {
  return (
    <div className='w-full h-[820px] flex items-start border rounded-(--radius)'>
      <Skeleton className='w-[700px] h-full bg-accent-foreground/20 flex items-center justify-center rounded-(--radius)' />

      <div className='w-[440px] h-full flex flex-col p-4 gap-4'>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-8 w-8 rounded-full bg-accent-foreground/20' />
          <Skeleton className='h-6 w-32 bg-accent-foreground/20' />
        </div>

        {SKELETON_ARRAY.slice(0, 3).map((_, i) => (
          <div
            key={i}
            className='flex flex-col gap-4 mt-4'
          >
            <Skeleton className='h-4 w-full bg-accent-foreground/20' />
            <Skeleton className='h-4 w-[80%] bg-accent-foreground/20' />
            <Skeleton className='h-4 w-[60%] bg-accent-foreground/20' />
          </div>
        ))}

        <div className='flex items-center gap-4 mt-auto'>
          <Skeleton className='h-6 w-6 bg-accent-foreground/20' />
          <Skeleton className='h-6 w-6 bg-accent-foreground/20' />
        </div>

        <Skeleton className='h-10 w-full mt-4 bg-accent-foreground/20' />
      </div>
    </div>
  )
}

export function LatestPostsSkeleton() {
  return (
    <ul className='grid grid-cols-3 gap-1'>
      {SKELETON_ARRAY.slice(0, 6).map((_, i) => (
        <li key={i}>
          <Skeleton
            key={i}
            className='aspect-[2/3] w-full bg-accent-foreground/20'
          />
        </li>
      ))}
    </ul>
  )
}

export function UserProfileSkeleton() {
  return (
    <div className='w-full'>
      <div className='h-[14rem] grid grid-cols-3 gap-52'>
        <Skeleton className='size-[150px] rounded-full' />

        <div className='col-span-2 space-y-5'>
          <div className='flex items-center gap-5'>
            <Skeleton className='h-6 w-[140px] rounded-full' />

            <div className='flex items-center gap-2'>
              <Skeleton className='h-8 w-[140px] rounded-md' />
              <Skeleton className='size-8 rounded-md' />
            </div>
          </div>

          <div className='w-full grid grid-cols-3 gap-1'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
          </div>

          <div className='space-y-2'>
            <Skeleton className='h-4 w-[125px]' />

            <div className='flex items-center gap-2'>
              <Skeleton className='h-4 w-[70px]' />
              <Skeleton className='h-4 w-[70px]' />
            </div>
          </div>
        </div>
      </div>

      <div className='w-full mt-6 border-t border-border pt-4'>
        <div className='flex justify-center gap-8'>
          <Skeleton className='h-4 w-12' />
          <Skeleton className='h-4 w-12' />
        </div>
      </div>

      <div className='grid grid-cols-3 gap-1 w-full mt-4'>
        {SKELETON_ARRAY.slice(0, 6).map((_, i) => (
          <Skeleton
            key={i}
            className='aspect-[2/3] w-full bg-accent-foreground/20'
          />
        ))}
      </div>
    </div>
  )
}
