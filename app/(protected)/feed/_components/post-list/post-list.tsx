'use client'

import { PostDataProvider } from '@/providers/post-data-porvider'
import { usePostsQuery } from '@/use-queries/posts'
import { PostItem } from '@/app/(protected)/feed/_components/post-item'
import { PostLoader, PostsSkeleton } from '@/components/skeletons'
import { PostsError } from '@/components/errors'
import { Separator } from '@/components/ui/separator'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export function PostList() {
  const { ref, inView } = useInView()

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    isLoading,
    isError,
  } = usePostsQuery()

  useEffect(() => {
    if (!hasNextPage) return
    if (inView) fetchNextPage()
  }, [fetchNextPage, inView, hasNextPage])

  const postLists = data?.pages.flatMap((page) => page.data) || []

  if (isLoading) return <PostsSkeleton />

  if (isError) return <PostsError />

  const MAPPED_POSTS = postLists.map((post) => (
    <PostDataProvider
      key={post.id}
      postData={post}
    >
      <PostItem post={post} />
      <Separator />
    </PostDataProvider>
  ))

  return (
    <div className='space-y-8'>
      <div className='grid gap-8'>{MAPPED_POSTS}</div>
      <div ref={ref}>{isFetchingNextPage && <PostLoader />}</div>
    </div>
  )
}
