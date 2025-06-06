'use client'

import { cn } from '@/lib/utils'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { DiscordSignInButtonProps } from '@/components/discord-sign-in/discord-sign-in.props'
import { signInWithDiscord } from '@/services/auth-service'

export function DiscordSignInButton(props: DiscordSignInButtonProps) {
  const { isColoredButton = false } = props
  const [isPending, startTransition] = useTransition()

  const handleSignIn = async () => {
    startTransition(async () => {
      const { success, message } = await signInWithDiscord()

      if (success) {
        toast.success(message)
        return
      }

      toast.error(message)
    })
  }

  return (
    <Button
      onClick={handleSignIn}
      variant='transparent'
      className={cn(
        isColoredButton ? 'bg-[#5865F2] text-white' : 'text-[#5865F2]',
        'w-full'
      )}
      disabled={isPending}
    >
      Sign in with Discord
    </Button>
  )
}
