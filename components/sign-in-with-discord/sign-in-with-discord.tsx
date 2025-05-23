import { DiscordSignInButton } from '@/components/discord-sign-in'
import { SignInWithDiscordProps } from '@/components/sign-in-with-discord/sign-in-with-discord.props'
import { AuthSeparator } from '@/components/auth-separator'

export function SignInWithdiscord(props: SignInWithDiscordProps) {
  const {
    isSeparator = false,
    isColoredButton = false,
    separatorPosition,
  } = props

  const isTop = separatorPosition === 'top'
  const isBottom = separatorPosition === 'bottom'

  return (
    <div className='relative w-full flex flex-col space-y-6'>
      <AuthSeparator isVisible={isSeparator && isTop} />
      <DiscordSignInButton isColoredButton={isColoredButton} />
      <AuthSeparator isVisible={isSeparator && isBottom} />
    </div>
  )
}
