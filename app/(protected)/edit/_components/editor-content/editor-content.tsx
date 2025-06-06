import {
  AuthorAvatarUpload,
  AuthorAvatarUploadContent,
  AuthorAvatarUploadTrigger,
} from '@/components/author-avatar-upload'
import { useAuthorAvatarUploadContext } from '@/providers/author-avatar-upload-provider'
import { Card, CardContent } from '@/components/ui/card'
import { AuthorAvatar } from '@/components/author-avatar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Loader } from 'lucide-react'
import { AuthorProps } from '@/types/user'
import { EditorForm } from '@/app/(protected)/edit/_components/editor-form'

export function EditorContent() {
  const { isPending, user } = useAuthorAvatarUploadContext()

  return (
    <div className='space-y-8'>
      <Card className='bg-accent py-4 border-none'>
        <CardContent className='flex flex-row items-center justify-between gap-4 px-4 relative'>
          {isPending ? (
            <Skeleton className='size-16 rounded-full grid place-items-center border'>
              <Loader className='animate-spin size-4' />
            </Skeleton>
          ) : (
            <AuthorAvatar
              user={user as AuthorProps}
              size='lg'
              showName
            />
          )}

          <AuthorAvatarUpload>
            <AuthorAvatarUploadTrigger>
              <Button disabled={isPending}>Change photo</Button>
            </AuthorAvatarUploadTrigger>

            <AuthorAvatarUploadContent />
          </AuthorAvatarUpload>
        </CardContent>
      </Card>

      <EditorForm />
    </div>
  )
}
