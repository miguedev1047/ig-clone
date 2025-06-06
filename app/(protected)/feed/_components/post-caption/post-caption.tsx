'use client'

import { usePostDataContext } from '@/providers/post-data-porvider'

export function PostCaption() {
  const { postData, commentManager } = usePostDataContext()
  const commentCount = postData?.comments.length ?? 0

  const onToggleCommentMenu = () => {
    commentManager.setIsCommentMenuOpen(!commentManager.isCommentMenuOpen)
  }

  return (
    <>
      {!!postData?.description && (
        <p>
          <span className='font-semibold'>{postData?.user.name} </span>
          {postData?.description}
        </p>
      )}

      {commentCount > 0 && (
        <button
          onClick={onToggleCommentMenu}
          className='text-muted-foreground cursor-pointer'
        >
          {`View ${commentCount > 1 ? 'all ' : ''} ${commentCount} comment${
            commentCount > 1 ? 's' : ''
          }`}
        </button>
      )}
    </>
  )
}
