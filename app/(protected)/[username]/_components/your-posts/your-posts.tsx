'use client'

import Link from 'next/link'

import { PostImage } from '@/components/post-image'
import { MIN_COUNT } from '@/constants/misc'
import { useUserByNameQuery } from '@/use-queries/user'
import { Heart, MessageCircle } from 'lucide-react'
import { useParams } from 'next/navigation'

export function YourPosts() {
  const { username } = useParams<{ username: string }>()
  const { data: user } = useUserByNameQuery(username)

  const yourPosts = user?.posts || []

  if (yourPosts.length === MIN_COUNT)
    return (
      <div>
        <h2 className='font-semibold text-2xl'>There are not posts</h2>
      </div>
    )

  const YOUR_POSTS = yourPosts?.map((post) => (
    <li
      className='aspect-[2/3] group/post overflow-hidden relative'
      key={post.id}
    >
      <PostImage
        src={post.imageUrl || ''}
        alt={post.description}
        className='object-cover rounded-none'
      />

      <Link href={`/p/${post.id}`}>
        <div className='absolute z-20 inset-0 opacity-0 group-hover/post:opacity-100 bg-black/75 grid place-items-center'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              <Heart className='size-8 text-white' />
              <span className='text-white text-sm font-semibold'>
                {post.likes.length}
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <MessageCircle className='size-8 text-white' />
              <span className='text-white text-sm font-semibold'>
                {post.comments.length}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  ))

  return <ul className='grid grid-cols-3 gap-1'>{YOUR_POSTS}</ul>
}
