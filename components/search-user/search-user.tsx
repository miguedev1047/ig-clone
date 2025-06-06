'use client'

import Link from 'next/link'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  UserSearchProvider,
  useUserSearch,
} from '@/providers/search-user-provider'
import { ClearInput } from '@/components/ui/clear-input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { AuthorAvatar } from '@/components/author-avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { AuthorProps } from '@/types/user'
import { SearchUserProps } from './search-user.props'

export function SearchUser(props: SearchUserProps) {
  const { children } = props

  return (
    <UserSearchProvider>
      <SearchUserDialog>{children}</SearchUserDialog>
    </UserSearchProvider>
  )
}

export function SearchUserDialog(props: SearchUserProps) {
  const { children } = props
  const { userSearchManager } = useUserSearch()

  return (
    <Dialog
      open={userSearchManager.isOpen}
      onOpenChange={userSearchManager.setIsOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='px-0'>
        <div className='px-4 pt-4 space-y-6'>
          <DialogHeader>
            <DialogTitle>Search</DialogTitle>
          </DialogHeader>

          <SearchUserForm />
        </div>

        <ScrollArea className='w-full h-80'>
          <SearchUserContent />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export function SearchUserForm() {
  const { userSearchManager } = useUserSearch()

  return (
    <Form {...userSearchManager.searchForm}>
      <form
        onSubmit={userSearchManager.handleSearch}
        className='space-y-4'
      >
        <FormField
          control={userSearchManager.searchForm.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ClearInput
                  placeholder='Search'
                  className='w-full pe-9 !bg-accent'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export function SearchUserContent() {
  const { userSearchManager } = useUserSearch()

  if (userSearchManager.isProcessingSearch) {
    return (
      <ul className='w-full h-full'>
        {[...Array(8)].map((_, i) => (
          <li
            key={i}
            className='py-2 px-4 flex items-center gap-4'
          >
            <Skeleton className='size-12 rounded-full' />
            <Skeleton className='w-[30%] h-4' />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className='w-full h-80'>
      <ul className='h-full'>
        {userSearchManager.searchResult === 'no-results' && (
          <div className='py-2 px-4 size-full grid place-items-center'>
            <p className='text-muted-foreground'>User not found</p>
          </div>
        )}

        {userSearchManager.searchResult === 'default' && (
          <div className='p-4 size-full grid place-items-center'>
            <p className='text-muted-foreground'>Search users</p>
          </div>
        )}

        {userSearchManager.foundUsers?.map((user) => (
          <Link
            href={`/${user.name}`}
            key={user.id}
          >
            <li className='p-4 hover:bg-muted'>
              <AuthorAvatar
                user={user as AuthorProps}
                size='md'
                showName
              />
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}
