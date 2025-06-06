import { User } from '@/app/generated/prisma'
import { MIN_COUNT } from '@/constants/misc'
import { searchUserSchema } from '@/schemas'
import { searchUsersByName } from '@/services/user-service'
import { zodResolver } from '@hookform/resolvers/zod'
import { createContext, use, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type UserSearchContextValue = {
  userSearchManager: ReturnType<typeof useUserSearchManager>
}

type UserSearchProviderProps = {
  children: React.ReactNode
}

type SearchResultType = 'no-results' | 'default' | 'idle'

export const UserSearchContext = createContext<UserSearchContextValue | null>(
  null
)

export function useUserSearch() {
  const context = use(UserSearchContext)
  if (!context) {
    throw new Error('useUserSearch debe usarse dentro de un UserSearchProvider')
  }
  return context
}

export function useUserSearchManager() {
  const [foundUsers, setFoundUsers] = useState<User[] | null>([])
  const [isOpen, setIsOpen] = useState(false)
  const [searchResult, setSearchResult] = useState<SearchResultType>('default')

  const searchForm = useForm<z.infer<typeof searchUserSchema>>({
    resolver: zodResolver(searchUserSchema),
    defaultValues: { username: '' },
  })

  const isProcessingSearch = searchForm.formState.isSubmitting

  const handleSearch = searchForm.handleSubmit(async (formData) => {
    const { username } = formData

    const retrievedUsers = await searchUsersByName(username)
    setFoundUsers(retrievedUsers)

    if (retrievedUsers?.length === MIN_COUNT) {
      setSearchResult('no-results')
    } else {
      setSearchResult('idle')
    }
  })

  return {
    handleSearch,
    setSearchResult,
    setIsOpen,
    isOpen,
    searchResult,
    searchForm,
    isProcessingSearch,
    foundUsers,
  }
}

export function UserSearchProvider({ children }: UserSearchProviderProps) {
  const userSearchManager = useUserSearchManager()

  return (
    <UserSearchContext.Provider value={{ userSearchManager }}>
      {children}
    </UserSearchContext.Provider>
  )
}
