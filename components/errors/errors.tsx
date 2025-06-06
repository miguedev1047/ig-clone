import { AlertCircleIcon } from 'lucide-react'

export function PostsError() {
  return (
    <div className='w-full h-[calc(100vh-80px)] grid place-items-center'>
      <div className='text-center space-y-4'>
        <AlertCircleIcon className='text-destructive size-20 mx-auto' />
        <p>I can&apos;t get posts at the moment, please try again later</p>
      </div>
    </div>
  )
}

export function ProfileError() {
  return (
    <div className='w-full h-[calc(100vh-80px)] grid place-items-center'>
      <div className='text-center space-y-4'>
        <AlertCircleIcon className='text-destructive size-20 mx-auto' />
        <p>I can&apos;t get profile at the moment, please try again later</p>
      </div>
    </div>
  )
}

export function LatestPostsError() {
  return (
    <div className='w-full grid place-items-center'>
      <div className='text-center space-y-4'>
        <AlertCircleIcon className='text-destructive size-20 mx-auto' />
        <p>I can&apos;t get latest posts at the moment, please try again later</p>
      </div>
    </div>
  )
}