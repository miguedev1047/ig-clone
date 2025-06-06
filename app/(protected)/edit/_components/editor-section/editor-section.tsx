'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { AuthorAvatarProvider } from '@/providers/author-avatar-upload-provider'
import { ChevronLeft } from 'lucide-react'
import { useClientSession } from '@/lib/auth-client'
import { EditorContent } from '@/app/(protected)/edit/_components/editor-content'

export function EditorSection() {
  const { data: session } = useClientSession()

  return (
    <>
      <header className='flex items-center gap-3'>
        <Button
          asChild
          variant='transparent'
          size='icon'
        >
          <Link href={`/${session?.user?.name}`}>
            <ChevronLeft className='size-full' />
          </Link>
        </Button>

        <h2 className='font-semibold text-2xl'>Edit Profile</h2>
      </header>

      <AuthorAvatarProvider>
        <EditorContent />
      </AuthorAvatarProvider>
    </>
  )
}
