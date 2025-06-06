import { Prisma } from '../app/generated/prisma'

export type UserWithFollowings = Prisma.UserGetPayload<{
  include: { followings: true }
}>

export type UserWithFollowers = Prisma.UserGetPayload<{
  include: { followers: true }
}>

export type UserWithPosts = Prisma.UserGetPayload<{
  include: { posts: true }
}>

export type AuthorProps =
  | UserWithFollowings
  | UserWithFollowers
  | UserWithPosts
  | undefined
