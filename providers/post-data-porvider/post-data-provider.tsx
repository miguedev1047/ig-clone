'use client'

import {
  addLikePost,
  followUser,
  savedPost,
  addPostComment,
  deletePostComment,
  deletePost,
} from '@/services/post-service'
import { z } from 'zod'
import { MIN_COUNT } from '@/constants/misc'
import { useClientSession } from '@/lib/auth-client'
import { commentSchema } from '@/schemas'
import { PostsProps } from '@/types/posts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { createContext, use, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useRefreshQueries } from '@/hooks/use-refresh-queries'
import { usePostDialogContext } from '@/providers/post-dialog-provider'

type PostActionType = 'delete' | 'edit' | 'copy-link' | 'go-post' | 'cancel'

interface PostDataContextProps {
  postData: PostsProps
  postMetadata: ReturnType<typeof usePostMetadata>
  commentManager: ReturnType<typeof useCommentManager>
  actionHandler: ReturnType<typeof usePostActionHandler>
}

interface PostMetadataProps {
  postData: PostsProps
}

interface CommentManagerProps {
  postData: PostsProps
  postId: string
  currentUserId: string | undefined
  handleRefresh: () => void
}

interface PostActionHandlerProps {
  postData: PostsProps
  postId: string
  handleRefresh: () => void
}

interface PostDataProviderProps {
  postData: PostsProps
  children: React.ReactNode
}

const PostDataContext = createContext<PostDataContextProps | null>(null)

export function usePostDataContext() {
  const context = use(PostDataContext)
  if (!context) {
    throw new Error('usePostDataContext must be used within a PostDataProvider')
  }
  return context
}

export function usePostMetadata(props: PostMetadataProps) {
  const { postData } = props
  const { handleRefresh } = useRefreshQueries()
  const { data: session } = useClientSession()
  const { push } = useRouter()

  const postId = postData?.id || ''
  const currentUserId = session?.user.id
  const postOwnerId = postData?.user.id
  const isOwnPost = session?.user.id === postData?.user.id

  const likeCount = postData?.likes.length || MIN_COUNT
  const isLikedByCurrentUser = postData?.likes.some(
    (like) => like.userId === currentUserId
  )

  const commentCount = postData?.comments.length || MIN_COUNT
  const comments = postData?.comments ?? []

  const isPostSaved = postData?.savedPosts?.some(
    (post) => post.userId === currentUserId
  )

  const isFollowingAuthor = postData?.user.followings?.some(
    (follow) => follow.followerId === currentUserId
  )

  const toggleFollowAuthor = async () => {
    const data = { followerId: currentUserId, followingId: postData?.user.id }
    const { success, message } = await followUser(data)

    if (!success) {
      toast.error(message)
      return
    }

    toast.success(message)
    handleRefresh()
  }

  const toggleLikePost = async () => {
    const { success, message } = await addLikePost({ postId })

    if (!success) {
      toast.error(message)
      return
    }

    toast.success(message)
    handleRefresh()
  }

  const toggleSavePost = async () => {
    const data = { postId, userId: currentUserId }
    const { success, message } = await savedPost(data)

    if (!success) {
      toast.error(message)
      return
    }

    toast.success(message)
    handleRefresh()
  }

  const goToPost = () => push(`/p/${postId}`)

  return {
    postData,
    postId,
    currentUserId,
    postOwnerId,
    isOwnPost,

    likeCount,
    isLikedByCurrentUser,
    commentCount,
    comments,

    isPostSaved,
    isFollowingAuthor,

    handleRefresh,
    toggleFollowAuthor,
    toggleLikePost,
    toggleSavePost,
    goToPost,
  }
}

export function useCommentManager({
  postData,
  postId,
  currentUserId,
  handleRefresh,
}: CommentManagerProps) {
  const [isCommentMenuOpen, setIsCommentMenuOpen] = useState(false)

  const commentForm = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: '',
      userId: currentUserId,
      postId,
    },
  })

  const isSubmittingComment = commentForm.formState.isSubmitting
  const isCommentsEnabled = postData?.enabledComments

  const submitComment = commentForm.handleSubmit(async (values) => {
    const { success, message } = await addPostComment(values)

    if (!isCommentsEnabled) {
      toast.error('Comments are disabled for this post')
      return
    }

    if (!success) {
      toast.error(message)
      return
    }

    toast.success(message)
    commentForm.setValue('content', '')
    handleRefresh()
  })

  const deleteComment = async (commentId: string) => {
    const { success, message } = await deletePostComment(commentId)

    if (!success) {
      toast.error(message)
      return
    }

    toast.success(message)
    handleRefresh()
  }

  return {
    commentForm,
    isSubmittingComment,
    isCommentMenuOpen,
    submitComment,
    deleteComment,
    setIsCommentMenuOpen,
  }
}

export function usePostActionHandler({
  postId,
  handleRefresh,
}: PostActionHandlerProps) {
  const postDialogManager = usePostDialogContext()
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false)
  const { push } = useRouter()

  const handlePostAction = async (action: PostActionType) => {
    setIsActionMenuOpen(false)

    switch (action) {
      case 'delete':
        const { success, message } = await deletePost(postId)
        if (!success) return toast.error(message)
        handleRefresh()
        toast.success(message)
        return
      case 'edit':
        postDialogManager.setModalState('editing')
        postDialogManager.modalToggle()
        postDialogManager.modalManager.setEditingPostId(postId)
        return
      case 'copy-link':
        const postUrl = `${window.location.origin}/p/${postId}`
        navigator.clipboard.writeText(postUrl)
        toast.success('Link copied to clipboard!')
        return
      case 'go-post':
        push(`/p/${postId}`)
        return
      case 'cancel':
      default:
        return
    }
  }

  return { isActionMenuOpen, setIsActionMenuOpen, handlePostAction }
}

export function PostDataProvider(props: PostDataProviderProps) {
  const { postData, children } = props

  const postMetadata = usePostMetadata({ postData })
  const { postId, currentUserId, handleRefresh } = postMetadata

  const commentManager = useCommentManager({
    postData,
    postId,
    currentUserId,
    handleRefresh,
  })

  const actionHandler = usePostActionHandler({
    postData,
    postId,
    handleRefresh,
  })

  const contextValue = {
    postData,
    postMetadata,
    commentManager,
    actionHandler,
  }

  return (
    <PostDataContext.Provider value={contextValue}>
      {children}
    </PostDataContext.Provider>
  )
}
