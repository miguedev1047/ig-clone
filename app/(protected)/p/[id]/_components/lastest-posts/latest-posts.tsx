'use client'

import Link from 'next/link'

import { LatestPostsError } from '@/components/errors'
import { PostImage } from '@/components/post-image'
import { LatestPostsSkeleton } from '@/components/skeletons'
import { MIN_COUNT } from '@/constants/misc'
import { usePostByIdQuery } from '@/use-queries/posts'
import { useUserByNameQuery } from '@/use-queries/user'
import { Heart, MessageCircle } from 'lucide-react'
import { useParams } from 'next/navigation'

export function LatestPosts() {
  const { id } = useParams<{ id: string }>()

  const postQuery = usePostByIdQuery(id)
  const post = postQuery.data?.data

  const postUserName = post?.user.name || ''
  const profileUser = useUserByNameQuery(postUserName)

  const isLoading = postQuery.isLoading || profileUser.isLoading
  const isError = postQuery.isError || profileUser.isError

  if (isLoading) return <LatestPostsSkeleton />
  if (isError) return <LatestPostsError />
  if (!post) return null

  const authorPosts = profileUser.data?.posts || []
  const latestsPosts = authorPosts.filter((post) => post.id !== id)

  const likesCount = post?.likes.length || MIN_COUNT
  const commentsCount = post?.comments.length || MIN_COUNT

  const LATEST_POSTS = latestsPosts.slice(0, 6).map((post) => (
    <li
      className='aspect-[2/3] group/post overflow-hidden relative'
      key={post.id}
    >
      <PostImage
        src={post.imageUrl}
        alt={`Post by ${profileUser?.data?.name}`}
        className='size-full object-cover'
      />

      <Link href={`/p/${post.id}`}>
        <div className='absolute z-20 inset-0 opacity-0 group-hover/post:opacity-100 bg-black/75 grid place-items-center'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              <Heart className='size-8 text-white' />
              <span className='text-white text-sm font-semibold'>
                {likesCount}
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <MessageCircle className='size-8 text-white' />
              <span className='text-white text-sm font-semibold'>
                {commentsCount}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  ))

  return (
    <div className='space-y-4'>
      <h3 className='text-sm'>
        <span>More posts from </span>

        <Link
          href={`/${post?.user.name}`}
          className='font-semibold hover:underline'
        >
          <span className='font-semibold hover:underline'>
            {post?.user.name}
          </span>
        </Link>
      </h3>

      <ul className='grid grid-cols-3 gap-1'>{LATEST_POSTS}</ul>
    </div>
  )
}
