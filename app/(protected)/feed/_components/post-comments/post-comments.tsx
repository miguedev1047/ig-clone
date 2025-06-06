import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { AuthorAvatar } from '@/components/author-avatar'
import { Ellipsis, Heart, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CountingNumber } from '@/components/ui/counting-number'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { motion } from 'motion/react'
import { SavedIcon } from '@/assets/icons/saved'
import { LastSeen } from '@/components/ui/last-seen'

import { MIN_COUNT } from '@/constants/misc'
import { AuthorHoverCard } from '@/components/author-hover-card'
import { cn } from '@/lib/utils'
import { usePostDataContext } from '@/providers/post-data-porvider'
import { Comments } from '@/app/generated/prisma'
import Image from 'next/image'
import { useClientSession } from '@/lib/auth-client'
import { AuthorProps } from '@/types/user'
import { CommentForm } from '../comment-form'
import { PostActions } from '../post-actions'

export function PostDialogComments() {
  const { postData, postMetadata, commentManager } = usePostDataContext()

  return (
    <Dialog
      open={commentManager.isCommentMenuOpen}
      onOpenChange={commentManager.setIsCommentMenuOpen}
    >
      <DialogTrigger asChild>
        <div className='flex items-center gap-2'>
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            <MessageCircle className='size-8' />
          </motion.button>
          <CountingNumber number={postMetadata.commentCount} />
        </div>
      </DialogTrigger>
      <DialogContent className='sm:min-w-max h-[95vh] p-0 shadow-none flex flex-col gap-0 overflow-hidden border-none'>
        <DialogHeader className='hidden'>
          <DialogTitle></DialogTitle>
        </DialogHeader>

        <div className='w-full h-full flex items-start'>
          <figure className='w-[732px] h-full bg-accent-foreground/10 select-none pointer-events-none'>
            <Image
              width={500}
              height={500}
              src={postData?.imageUrl || ''}
              alt={postData?.user.name || ''}
              className='size-full object-contain rounded-(--radius)'
            />
          </figure>

          <PostCommentList />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function PostDialogCommentActions(props: Comments) {
  const { id, userId } = props
  const { commentManager } = usePostDataContext()
  const session = useClientSession()

  const isOwnComment = session.data?.user.id === userId
  if (!isOwnComment) return null

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant='transparent'
          size='icon'
          className='h-4 w-4 opacity-0 group-hover/comment:opacity-100'
        >
          <Ellipsis className='size-full' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='sm:max-w-[400px] p-0 border-0'>
        <AlertDialogHeader className='hidden'>
          <AlertDialogTitle />
        </AlertDialogHeader>

        <div className='grid gap-1 py-1.5'>
          <AlertDialogAction
            onClick={() => commentManager.deleteComment(id)}
            className='bg-transparent dark:bg-transparent hover:bg-transparent dark:hover:bg-transparent border-0 h-[48px] text-destructive font-semibold cursor-pointer'
          >
            Delete
          </AlertDialogAction>

          <Separator />

          <AlertDialogCancel className='bg-transparent dark:bg-transparent hover:bg-transparent dark:hover:bg-transparent border-0 h-[48px] text-primary font-normal cursor-pointer'>
            Cancel
          </AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function PostSocialBar() {
  const { postData, postMetadata } = usePostDataContext()

  return (
    <div className='w-full h-[85px] flex flex-col justify-between'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={postMetadata.toggleLikePost}
              className='cursor-pointer'
            >
              <Heart
                className={cn(
                  'size-7 transition duration-300 ease-in-out',
                  postMetadata.isLikedByCurrentUser && 'text-red-500'
                )}
              />
            </motion.button>
          </div>

          <div className='flex items-center gap-2'>
            <motion.label
              htmlFor='comment'
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              className='cursor-pointer'
            >
              <MessageCircle className='size-7' />
            </motion.label>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          onClick={postMetadata.toggleSavePost}
          className='cursor-pointer'
        >
          <SavedIcon
            className={cn(
              'size-8 transition duration-300 ease-in-out',
              postMetadata.isPostSaved && 'text-blue-400'
            )}
          />
        </motion.button>
      </div>

      <div>
        <p className='font-semibold text-sm leading-none'>
          <CountingNumber number={postMetadata.likeCount} />{' '}
          {postMetadata.likeCount === 1 ? 'Like' : 'Likes'}
        </p>
        <LastSeen
          date={postData?.createdAt}
          timeStyle='twitter-first-minute'
        />
      </div>
    </div>
  )
}

export function PostCommentList() {
  const { postData } = usePostDataContext()
  const commentsCount = postData?.comments?.length ?? MIN_COUNT

  const isCommentsEnabled = postData?.enabledComments

  const POST_COMMENTS = commentsCount > MIN_COUNT && (
    <div className='grid gap-6 h-full'>
      {postData?.comments.map((comment) => (
        <article
          key={comment.id}
          className='flex items-center gap-4 group/comment'
        >
          <AuthorAvatar
            size='md'
            user={comment.user as AuthorProps}
          />

          <div className='space-y-1'>
            <div className='text-sm flex gap-2'>
              <h3>
                <span className='font-semibold'>{comment.user.name}</span>{' '}
                <span>{comment.content}</span>
              </h3>
            </div>

            <div className='flex items-center gap-2'>
              <LastSeen date={comment.createdAt} />
              <PostDialogCommentActions {...comment} />
            </div>
          </div>
        </article>
      ))}
    </div>
  )

  const NO_COMMENTS = (
    <div className='absolute inset-0 flex items-center justify-center'>
      <div className='text-center space-y-2.5'>
        <h3 className='text-3xl font-bold'>
          {isCommentsEnabled ? 'No comments yet.' : 'Comments are disabled.'}
        </h3>
        {isCommentsEnabled && (
          <p className='text-sm'>Start the conversation.</p>
        )}
      </div>
    </div>
  )

  return (
    <div className='w-[440px] h-full flex flex-col justify-between p-4 gap-2'>
      <div className='flex items-center justify-between'>
        <AuthorHoverCard
          user={postData?.user as AuthorProps}
          showName
        />
        <PostActions />
      </div>

      <Separator />

      <ScrollArea className='w-full h-[575px] relative py-4'>
        {isCommentsEnabled && commentsCount > MIN_COUNT
          ? POST_COMMENTS
          : NO_COMMENTS}
      </ScrollArea>

      <Separator />
      <PostSocialBar />
      <Separator />

      <CommentForm formId='comment' />
    </div>
  )
}
