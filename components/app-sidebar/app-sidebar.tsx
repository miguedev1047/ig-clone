'use client'

import Link from 'next/link'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Home, PlusSquare, Search } from 'lucide-react'
import { usePostDialogContext } from '@/providers/post-dialog-provider'
import { NAME_APP } from '@/constants/misc'
import { UserAvatar } from '@/components/user-avatar'
import { SearchUser } from '@/components/search-user'
import { NavUser } from '@/components/nav-user'

export function AppSidebar() {
  const postDialogManager = usePostDialogContext()
  const usernameUrl = postDialogManager.session?.name || '#'

  return (
    <Sidebar className='py-6 px-4'>
      <SidebarHeader className='mb-8 px-3'>
        <Link href='/'>
          <h2 className='text-2xl font-bold'>{NAME_APP}</h2>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className='p-0'>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className='p-0'>
                <SidebarMenuButton
                  className='px-2 py-6'
                  asChild
                >
                  <Link href={'/feed'}>
                    <Home className='!size-8 mr-2' />
                    <span className='text-base'>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem className='p-0'>
                <SearchUser>
                  <SidebarMenuButton
                    className='px-2 py-6'
                    asChild
                  >
                    <button>
                      <Search className='!size-8 mr-2' />
                      <span className='text-base'>Search</span>
                    </button>
                  </SidebarMenuButton>
                </SearchUser>
              </SidebarMenuItem>

              <SidebarMenuItem className='p-0'>
                <SidebarMenuButton
                  className='px-2 py-6'
                  asChild
                >
                  <button onClick={() => postDialogManager.modalToggle()}>
                    <PlusSquare className='!size-8 mr-2' />
                    <span className='text-base'>Create</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem className='p-0'>
                <SidebarMenuButton
                  className='px-2 py-6'
                  asChild
                >
                  <Link href={`/${usernameUrl}`}>
                    <UserAvatar className='mr-2' />
                    <span className='text-base'>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className='p-0'>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
