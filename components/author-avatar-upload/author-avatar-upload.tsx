import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  AuthorAvatarUploadProps,
  AuthorAvatarUploadTriggerProps,
} from '@/components/author-avatar-upload/author-avatar-upload.props'
import { useAuthorAvatarUploadContext } from '@/providers/author-avatar-upload-provider'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function AuthorAvatarUpload(props: AuthorAvatarUploadProps) {
  const { children } = props
  const { setOpen, open } = useAuthorAvatarUploadContext()

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      {children}
    </Dialog>
  )
}

export function AuthorAvatarUploadTrigger(
  props: AuthorAvatarUploadTriggerProps
) {
  const { children } = props

  return (
    <DialogTrigger asChild>
      <div className='cursor-pointer'>{children}</div>
    </DialogTrigger>
  )
}

export function AuthorAvatarUploadContent() {
  const { getInputProps, isPending, errors } = useAuthorAvatarUploadContext()

  return (
    <DialogContent className='sm:max-w-[400px] p-0 border-0 bg-accent'>
      <div className='w-full'>
        <DialogHeader className='grid place-items-center h-[80px]'>
          <DialogTitle className='text-xl font-normal'>
            Change Profile Photo
          </DialogTitle>
        </DialogHeader>

        <Separator />

        <div className='relative'>
          <input
            {...getInputProps()}
            className='opacity-0 absolute inset-0 cursor-pointer'
          />

          <Button
            className={cn(
              'h-[48px] w-full py-1',
              errors.length > 0 && 'text-destructive'
            )}
            variant='transparent'
            disabled={isPending}
          >
            {isPending && <Loader2 className='animate-spin size-4' />}
            {errors.length > 0 && 'I cannot upload this file.'}
            {isPending ? 'Uploading...' : 'Upload Photo'}
          </Button>
        </div>

        <Separator />

        <DialogClose asChild>
          <Button
            className='h-[48px] w-full py-1'
            variant='transparent'
          >
            Cancel
          </Button>
        </DialogClose>
      </div>
    </DialogContent>
  )
}
