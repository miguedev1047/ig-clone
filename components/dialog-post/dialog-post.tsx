'use client'

import Image from 'next/image'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { AlertCircleIcon, ArrowLeft, ImageIcon, Loader2, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Separator } from '@/components/ui/separator'
import { usePostDialogContext } from '@/providers/post-dialog-provider'
import { cn } from '@/lib/utils'
import { PostForm } from '@/components/post-form'

export function DialogWrapper(props: { children: React.ReactNode }) {
  const { children } = props
  const postDialogManager = usePostDialogContext()

  return (
    <Dialog
      open={postDialogManager.isModalOpen}
      onOpenChange={postDialogManager.modalToggle}
    >
      <DialogContent
        className={cn(
          'sm:min-w-max h-auto p-0 bg-background shadow-none flex flex-col gap-0 overflow-hidden border-none'
        )}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}

export function DialogPost() {
  const postDialogManager = usePostDialogContext()

  if (postDialogManager.modalManager.modalState === 'default')
    return (
      <DialogWrapper>
        <ViewDefault />
      </DialogWrapper>
    )

  if (postDialogManager.modalManager.modalState === 'pick-image')
    return (
      <DialogWrapper>
        <ViewPickImage />
      </DialogWrapper>
    )

  if (postDialogManager.modalManager.modalState === 'share')
    return (
      <DialogWrapper>
        <ViewShare />
      </DialogWrapper>
    )

  if (postDialogManager.modalManager.modalState === 'editing')
    return (
      <DialogWrapper>
        <ViewShare />
      </DialogWrapper>
    )

  return null
}

export function ViewDefault() {
  const postDialogManager = usePostDialogContext()

  return (
    <div className='w-[732px] h-[732px]'>
      <DialogHeader className='w-full h-[44px] border-b border-border/70 px-5 py-1 flex justify-center'>
        <DialogTitle className='text-sm text-center font-medium'>
          Create Post
        </DialogTitle>
      </DialogHeader>

      <div
        onDragEnter={postDialogManager.handleDragEnter}
        onDragLeave={postDialogManager.handleDragLeave}
        onDragOver={postDialogManager.handleDragOver}
        onDrop={postDialogManager.handleDrop}
        className={cn(
          'size-full flex items-center justify-center bg-accent relative',
          !postDialogManager.imagePreviewUrl && 'cursor-pointer'
        )}
      >
        <input
          {...postDialogManager.getInputProps()}
          className='absolute opacity-0 size-full cursor-pointer'
          aria-label='Upload file'
        />

        {!postDialogManager.imagePreviewUrl && (
          <div className='flex flex-col items-center space-y-5'>
            {postDialogManager.uploadErrors.length > 0 ? (
              <>
                <AlertCircleIcon
                  strokeWidth={1}
                  className={cn('size-20 text-destructive')}
                />
                <p className='text-destructive'>
                  {postDialogManager.uploadErrors[0]}
                </p>
                <Button disabled={postDialogManager.isSubmitting}>
                  Select other image
                </Button>
              </>
            ) : (
              <>
                <ImageIcon
                  strokeWidth={1}
                  className={cn(
                    'size-20',
                    postDialogManager.isSubmitting && 'text-blue-400'
                  )}
                />
                <p>Drop your image here, or click to select files</p>
                <Button disabled={postDialogManager.isSubmitting}>
                  Select on my devicee
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export function ViewPickImage() {
  const postDialogManager = usePostDialogContext()

  return (
    <div className='w-[732px] h-[732px]'>
      <DialogHeader className='w-full h-[44px] border-b border-border/70 px-5 py-1 flex items-center flex-row'>
        <div className='flex grow basis-0'>
          <Button
            variant='transparent'
            size='icon'
            className='text-sm h-5 p-0 font-medium'
            onClick={postDialogManager.modalToggle}
          >
            <X className='size-6' />
          </Button>
        </div>

        <DialogTitle className='text-sm font-semibold'>Pick image</DialogTitle>

        <div className='flex grow basis-0 justify-end'>
          <Button
            variant='transparent'
            className='text-sm h-5 p-0 font-medium text-primary'
            onClick={() => {
              if (postDialogManager.files.length < 1)
                return toast.error('No image selected')
              postDialogManager.setModalState('share')
            }}
          >
            Next
          </Button>
        </div>
      </DialogHeader>

      <div
        onDragEnter={postDialogManager.handleDragEnter}
        onDragLeave={postDialogManager.handleDragLeave}
        onDragOver={postDialogManager.handleDragOver}
        onDrop={postDialogManager.handleDrop}
        className='w-full h-[calc(100%_-_44px)] flex items-center justify-center cursor-pointer bg-accent relative'
      >
        <input
          {...postDialogManager.getInputProps()}
          className='absolute opacity-0 size-full cursor-pointer'
          aria-label='Upload file'
        />

        {postDialogManager.imagePreviewUrl && (
          <figure className='size-full select-none pointer-events-none'>
            <Image
              width={500}
              height={500}
              src={postDialogManager.imagePreviewUrl}
              alt='Preview Image'
              className='size-full object-contain rounded-(--radius)'
            />
          </figure>
        )}

        {!postDialogManager.imagePreviewUrl && (
          <div className='flex flex-col items-center space-y-5'>
            {postDialogManager.uploadErrors.length > 0 ? (
              <>
                <AlertCircleIcon
                  strokeWidth={1}
                  className={cn('size-20 text-destructive')}
                />
                <p className='text-destructive'>
                  {postDialogManager.uploadErrors[0]}
                </p>
                <Button disabled={postDialogManager.isSubmitting}>
                  Select other image
                </Button>
              </>
            ) : (
              <>
                <ImageIcon
                  strokeWidth={1}
                  className={cn(
                    'size-20',
                    postDialogManager.isDragging && 'text-blue-400'
                  )}
                />
                <p>Drop your image here, or click to select files</p>
                <Button disabled={postDialogManager.isSubmitting}>
                  Select on my devicee
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export function ViewShare() {
  const postDialogManager = usePostDialogContext()

  return (
    <div className='w-[1080px] h-[732px]'>
      <DialogHeader className='w-full h-[44px] border-b border-border/70 px-5 py-1 flex items-center flex-row'>
        <div className='flex grow basis-0'>
          {postDialogManager.isEditMode ? (
            <Button
              size='icon'
              variant='transparent'
              className='text-sm h-5 p-0 font-medium'
              onClick={postDialogManager.resetModalState}
            >
              <X className='size-6' />
            </Button>
          ) : (
            <Button
              size='icon'
              variant='transparent'
              className='text-sm h-5 p-0 font-medium'
              onClick={() => postDialogManager.setModalState('pick-image')}
            >
              <ArrowLeft className='size-6' />
            </Button>
          )}
        </div>

        <DialogTitle className='text-sm font-semibold'>
          {postDialogManager.isEditMode ? 'Edit info' : 'Create a new post'}
        </DialogTitle>

        <div className='flex grow basis-0 justify-end '>
          <Button
            variant='transparent'
            form='form-submit-post'
            disabled={postDialogManager.isSubmitting}
            className='text-sm h-5 p-0 font-medium text-primary'
          >
            {postDialogManager.isSubmitting && (
              <Loader2 className='size-4 animate-spin' />
            )}
            {postDialogManager.isEditMode ? 'Save' : 'Share'}
          </Button>
        </div>
      </DialogHeader>

      <div className='flex w-full h-[calc(100%_-_44px)] bg-accent'>
        <figure className='w-[720px] h-auto select-none pointer-events-none relative !bg-accent-foreground/20'>
          {postDialogManager.imagePreviewUrl && (
            <Image
              src={postDialogManager.imagePreviewUrl}
              width={500}
              height={500}
              alt='Preview Image'
              className='size-full object-contain rounded-(--radius)'
            />
          )}
        </figure>

        <Separator
          orientation='vertical'
          className='border-border/70'
        />

        <div className='w-[360px] h-full p-4 space-y-4'>
          <div className='flex items-center gap-2'>
            <Avatar>
              <AvatarImage src={postDialogManager.session?.image || ''} />
              <AvatarFallback>
                {postDialogManager.session?.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <p className='font-medium text-sm'>
              {postDialogManager.session?.name}
            </p>
          </div>

          <PostForm />
        </div>
      </div>
    </div>
  )
}
