import {
  getUserById,
  getUserByName,
  validateFollowThisUser,
} from '@/services/user-service'
import { queryOptions, useQuery } from '@tanstack/react-query'

export type validateFollowThisUserProps = {
  userId: string | undefined
  followingId: string | undefined
  followerId: string | undefined
}

export const userByNameQueryOptions = (name: string) =>
  queryOptions({
    queryKey: ['user', name],
    enabled: !!name,
    queryFn: async () => await getUserByName(name),
  })

export const useUserByNameQuery = (name: string) =>
  useQuery(userByNameQueryOptions(name))

export const userByIdQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['user', id],
    enabled: !!id,
    queryFn: async () => await getUserById(id),
  })

export const useUserByIdQuery = (id: string) =>
  useQuery(userByIdQueryOptions(id))

export const validateFollowUserOptions = ({
  followerId,
  followingId,
  userId,
}: validateFollowThisUserProps) =>
  queryOptions({
    queryKey: ['user', userId],
    queryFn: async () =>
      await validateFollowThisUser({ followerId, followingId }),
  })

export const useValidateFollowUser = (props: validateFollowThisUserProps) =>
  useQuery(validateFollowUserOptions(props))
