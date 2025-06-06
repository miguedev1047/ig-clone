'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Loader, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signOut } from '@/services/auth-service'

export function SignOutButton() {
  const [isPending, startTransition] = useTransition()
  const { push } = useRouter()

  const handleSignOut = () => {
    startTransition(async () => {
      const { success, message } = await signOut()
      push('/')

      if (success) {
        toast.success(message)
        return
      }

      toast.error(message)
    })
  }

  return (
    <Button
      onClick={handleSignOut}
      disabled={isPending}
      size='icon'
    >
      {isPending ? <Loader className='animate-spin' /> : <LogOut />}
    </Button>
  )
}
