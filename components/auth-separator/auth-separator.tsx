import { AuthSeparatorProps } from '@/components/auth-separator/auth-separator.props'

export function AuthSeparator(props: AuthSeparatorProps) {
  const { isVisible = false } = props
  if (!isVisible) return null

  return (
    <div className='w-full text-center h-[14px] relative'>
      <div className='w-full h-[1px] bg-accent absolute -translate-y-1/2 bottom-0 z-0' />
      <span className='bg-background px-4 z-10 relative text-muted-foreground text-sm'>
        OR
      </span>
    </div>
  )
}
