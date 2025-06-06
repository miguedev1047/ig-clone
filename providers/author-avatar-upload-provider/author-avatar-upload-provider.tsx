'use client'

import {
  createContext,
  use,
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react'
import { MAX_UPLOAD_SIZE } from '@/constants/misc'
import { useFileUpload } from '@/hooks/use-file-upload'
import { useRefreshQueries } from '@/hooks/use-refresh-queries'
import { toast } from 'sonner'
import { useClientSession } from '@/lib/auth-client'
import { uploadCloudinary } from '@/services/upload-service/upload-clodinary'
import { updateUserAvatar } from '@/services/user-service'

type AuthorAvatarContextProps = ReturnType<typeof useAuthorAvatarUpload>

interface AuthorProviderProps {
  children: React.ReactNode
}

const AuthorAvatarContext = createContext<AuthorAvatarContextProps | null>(null)

export function useAuthorAvatarUploadContext() {
  const context = use(AuthorAvatarContext)
  if (!context) {
    throw new Error(
      'useAuthorAvatarUpload must be used within a AuthorProvider'
    )
  }
  return context
}

export function useAuthorAvatarUpload() {
  const { data: session } = useClientSession()
  const user = session?.user

  const { handleRefresh } = useRefreshQueries()
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)
  const hasUploadedRef = useRef(false)

  const [{ files, errors }, { getInputProps, removeFile }] = useFileUpload({
    maxSize: MAX_UPLOAD_SIZE,
    accept: 'image/*',
  })

  const resetUploadState = () => {
    hasUploadedRef.current = false
  }

  const onUploadFile = useCallback(() => {
    if (files.length === 0 || hasUploadedRef.current) return
    hasUploadedRef.current = true

    setOpen(false)

    startTransition(async () => {
      const uploadRes = await uploadCloudinary({
        folder: 'profile',
        path: 'profile',
        itemId: user?.id,
        files,
      })

      const { success, message } = await updateUserAvatar({
        imageUrl: uploadRes.url,
        userId: user?.id,
      })

      if (!success) {
        toast.error(message)
        return
      }

      handleRefresh()
      removeFile(files[0].id)
      toast.success(message)
      resetUploadState()
    })
  }, [files, handleRefresh, removeFile, user?.id])

  useEffect(() => onUploadFile(), [onUploadFile])

  return {
    open,
    user,
    isPending,
    errors,
    setOpen,
    getInputProps,
  }
}

export function AuthorAvatarProvider(props: AuthorProviderProps) {
  const { children } = props
  const contextValues = useAuthorAvatarUpload()

  return (
    <AuthorAvatarContext.Provider value={contextValues}>
      {children}
    </AuthorAvatarContext.Provider>
  )
}
