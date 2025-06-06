import { Dot } from 'lucide-react'
import { PostItemProps } from '@/app/(protected)/feed/_components/post-item/post-item.props'
import { LastSeen } from '@/components/ui/last-seen'
import { AuthorHoverCard } from '@/components/author-hover-card'
import { FollowAuthorButton } from '@/components/follow-author-button'
import { PostCaption } from '@/app/(protected)/feed/_components/post-caption'
import { CommentForm } from '@/app/(protected)/feed/_components/comment-form'
import { PostActions } from '@/app/(protected)/feed/_components/post-actions'
import { PostSocialBar } from '@/app/(protected)/feed/_components/post-social-bar'
import { PostImage } from '@/components/post-image'

export function PostItem(props: PostItemProps) {
  const { post } = props

  const user = post?.user
  const isCommentsEnabled = post?.enabledComments

  return (
    <article className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <AuthorHoverCard
            user={user}
            showName
          />
          <Dot />
          <LastSeen date={post?.createdAt} />
          <FollowAuthorButton />
        </div>

        <PostActions />
      </div>

      <figure className='w-full h-auto select-none pointer-events-none'>
        <PostImage
          src={post?.imageUrl}
          alt={post?.description}
        />
      </figure>

      <PostSocialBar />

      <div className='space-y-1 text-sm'>
        <PostCaption />
        {isCommentsEnabled && <CommentForm />}
      </div>
    </article>
  )
}
