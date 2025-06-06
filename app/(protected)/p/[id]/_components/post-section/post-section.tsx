'use client'

import { PostCommentList } from '@/app/(protected)/feed/_components/post-comments'
import { PostImage } from '@/components/post-image'
import { PostNotFound } from '@/components/post-not-found'
import { PostSectionSkeleton } from '@/components/skeletons'
import { Separator } from '@/components/ui/separator'
import { PostDataProvider } from '@/providers/post-data-porvider'
import { PostsProps } from '@/types/posts'
import { usePostByIdQuery } from '@/use-queries/posts'
import { useParams } from 'next/navigation'

export function PostSection() {
  const { id } = useParams<{ id: string }>()

  const postQuery = usePostByIdQuery(id)
  const post = postQuery.data?.data

  if (postQuery.isLoading || postQuery.isError) return <PostSectionSkeleton />
  if (!post) return <PostNotFound />

  return (
    <>
      <PostDataProvider postData={post as PostsProps}>
        <div className='w-full h-[820px] flex items-start border rounded-(--radius)'>
          <figure className='w-[700px] h-full bg-accent-foreground/10 select-none pointer-events-none'>
            <PostImage
              src={post?.imageUrl}
              alt={`Post by ${post?.user?.name}`}
              className='object-contain size-full'
            />
          </figure>

          <PostCommentList />
        </div>
      </PostDataProvider>

      <Separator />
    </>
  )
}
