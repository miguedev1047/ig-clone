'use client'

import {
  infiniteQueryOptions,
  queryOptions,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query'
import { getAllPosts, getPostById } from '@/services/post-service'

export const postsInfiniteQueryOptions = infiniteQueryOptions({
  queryKey: ['posts'],
  queryFn: getAllPosts,
  initialPageParam: 1,
  getNextPageParam: (lastPage) => lastPage.info.page + 1,
})

export const usePostsQuery = () => useInfiniteQuery(postsInfiniteQueryOptions)

export const postByIdQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: ['post', postId],
    queryFn: async () => await getPostById(postId),
  })

export const usePostByIdQuery = (postId: string) =>
  useQuery(postByIdQueryOptions(postId))
