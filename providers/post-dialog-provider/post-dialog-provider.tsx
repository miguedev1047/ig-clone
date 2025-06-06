'use client'

import { FileWithPreview, useFileUpload } from '@/hooks/use-file-upload'
import { usePostsQuery } from '@/use-queries/posts'
import { createContext, use, useEffect, useCallback } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { createId } from '@paralleldrive/cuid2'
import { useManagmentPost } from '@/store/use-managment-post'
import { MAX_UPLOAD_SIZE } from '@/constants/misc'
import { useClientSession } from '@/lib/auth-client'
import { createPost, updatePost } from '@/services/post-service'
import { uploadCloudinary } from '@/services/upload-service/upload-clodinary'
import { postSchema } from '@/schemas'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type PostFormData = z.infer<typeof postSchema>

type PostDialogContextValue = ReturnType<typeof usePostDialog>

const PostDialogContext = createContext<PostDialogContextValue | null>(null)

export const usePostDialogContext = () => {
  const context = use(PostDialogContext)

  if (!context) {
    throw new Error(
      'usePostDialogContext must be used within a PostDialogProvider'
    )
  }

  return context
}

function usePostForm() {
  return useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      description: '',
      isPrivate: false,
      enabledComments: true,
      postId: '',
      location: '',
      imageUrl: '',
    },
  })
}

function usePostFileUpload() {
  const [fileUploadState, fileUploadActions] = useFileUpload({
    maxSize: MAX_UPLOAD_SIZE,
    accept: 'image/*',
  })

  return {
    files: fileUploadState.files,
    isDragging: fileUploadState.isDragging,
    uploadErrors: fileUploadState.errors,
    ...fileUploadActions,
  }
}

function usePostModalState() {
  const {
    open: isModalOpen,
    state: modalState,
    openedId: editingPostId,
    setOpen: setModalOpen,
    setOpenedId: setEditingPostId,
    setState: setModalState,
  } = useManagmentPost()

  const isEditMode = !!editingPostId

  return {
    isModalOpen,
    modalState,
    editingPostId,
    isEditMode,
    setModalOpen,
    setEditingPostId,
    setModalState,
  }
}

function usePostData(editingPostId: string | null) {
  const postsQuery = usePostsQuery()
  const postsList = postsQuery.data?.pages.flatMap((page) => page.data)

  const postQuery = postsList?.find((post) => post.id === editingPostId)

  return { posts: postsQuery, currentPost: postQuery }
}

function usePostSubmission() {
  const { posts } = usePostData(null)

  const handleCreatePost = useCallback(
    async (
      formData: PostFormData,
      files: FileWithPreview[],
      onSuccess: () => void
    ) => {
      const postId = createId()

      const uploadResponse = await uploadCloudinary({
        files,
        folder: 'posts',
        path: 'post',
        itemId: postId,
      })

      const postData = {
        ...formData,
        postId,
        imageUrl: uploadResponse.url,
      }

      const { success, message } = await createPost(postData)

      if (success) {
        toast.success(message)
        posts.refetch()
        onSuccess()
        return
      }

      toast.error(message)
    },
    [posts]
  )

  const handleUpdatePost = useCallback(
    async (formData: PostFormData, postId: string, onSuccess: () => void) => {
      const { success, message } = await updatePost(formData, postId)

      if (success) {
        toast.error(message)
        return
      }

      toast.success(message)
      posts.refetch()
      onSuccess()
    },
    [posts]
  )

  return { handleCreatePost, handleUpdatePost }
}

function usePostDialog() {
  const session = useClientSession()
  const form = usePostForm()
  const fileUpload = usePostFileUpload()
  const modalManager = usePostModalState()
  const postData = usePostData(modalManager.editingPostId)
  const submission = usePostSubmission()
  const userSession = session.data?.user

  const { files, removeFile } = fileUpload
  const { isModalOpen, isEditMode, editingPostId, setModalState } = modalManager
  const { currentPost } = postData

  useEffect(() => {
    if (files.length > 0) setModalState('pick-image')
  }, [files, setModalState])

  useEffect(() => {
    if (!isEditMode || !isModalOpen || !currentPost) return

    form.setValue('description', currentPost.description || '')
    form.setValue('isPrivate', currentPost.isPrivate)
    form.setValue('enabledComments', currentPost.enabledComments)
    form.setValue('location', currentPost.location || '')
    form.setValue('imageUrl', currentPost.imageUrl || '')
    form.setValue('postId', currentPost.id)
  }, [currentPost, isEditMode, isModalOpen, form])

  const imagePreviewUrl = isEditMode
    ? currentPost?.imageUrl || null
    : files[0]?.preview || null

  const resetModalState = useCallback(() => {
    if (!modalManager.isEditMode) return
    modalManager.setModalOpen(false)
    modalManager.setEditingPostId('')
    modalManager.setModalState('default')
    form.reset()
    if (files.length > 0) removeFile(files[0].id)
  }, [modalManager, form, files, removeFile])

  const modalToggle = useCallback(() => {
    resetModalState()
    modalManager.setModalOpen(!isModalOpen)
  }, [resetModalState, isModalOpen, modalManager])

  const onSuccess = () => {
    modalManager.setModalOpen(false)
    modalManager.setEditingPostId('')
    modalManager.setModalState('default')
    form.reset()
    if (files.length > 0) removeFile(files[0].id)
    modalManager.setModalOpen(false)
  }

  const handleFormSubmit = form.handleSubmit(async (formData) => {
    if (isEditMode && editingPostId) {
      await submission.handleUpdatePost(formData, editingPostId, onSuccess)
    } else {
      await submission.handleCreatePost(formData, files, onSuccess)
    }
  })

  return {
    isModalOpen,
    modalManager,
    isEditMode,

    form,
    isSubmitting: form.formState.isSubmitting,
    handleFormSubmit,

    files,
    isDragging: fileUpload.isDragging,
    uploadErrors: fileUpload.uploadErrors,
    imagePreviewUrl,

    handleDragEnter: fileUpload.handleDragEnter,
    handleDragLeave: fileUpload.handleDragLeave,
    handleDragOver: fileUpload.handleDragOver,
    handleDrop: fileUpload.handleDrop,
    openFileDialog: fileUpload.openFileDialog,
    removeFile: fileUpload.removeFile,
    getInputProps: fileUpload.getInputProps,

    modalToggle,
    resetModalState,
    setModalState: modalManager.setModalState,
    setEditingPostId: modalManager.setEditingPostId,

    session: userSession,
  }
}

export function PostDialogProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const contextValue = usePostDialog()

  return (
    <PostDialogContext.Provider value={contextValue}>
      {children}
    </PostDialogContext.Provider>
  )
}
