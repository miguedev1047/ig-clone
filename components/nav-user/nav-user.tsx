'use client'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { EllipsisVerticalIcon, LogOutIcon, UserIcon } from 'lucide-react'
import { UserAvatar } from '@/components/user-avatar'
import { useClientSession } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { signOut } from '@/services/auth-service'
import { toast } from 'sonner'

export function NavUser() {
  const { isMobile } = useSidebar()
  const { push } = useRouter()

  const { data: session } = useClientSession()
  const user = session?.user

  const onNavigateToAccount = () => {
    push(`/${user?.name}`)
  }

  const onSignOut = async () => {
    const { success, message } = await signOut()
    push('/')

    if (success) {
      toast.success(message)
      return
    }

    toast.error(message)
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <UserAvatar />

              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-medium'>{user?.name}</span>
                <span className='text-muted-foreground truncate text-xs'>
                  {user?.email}
                </span>
              </div>
              <EllipsisVerticalIcon className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <UserAvatar />
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-medium'>{user?.name}</span>
                  <span className='text-muted-foreground truncate text-xs'>
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onNavigateToAccount}>
              <UserIcon />
              Account
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onSignOut}>
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
