import { Prisma } from '@/app/generated/prisma'

export type PostProps = Prisma.PostsGetPayload<{
  include: {
    likes: true
    savedPosts: true
    user: { include: { followings: true } }
    comments: { include: { user: true } }
  }
}>
