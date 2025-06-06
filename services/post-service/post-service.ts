'use server'

import { z } from 'zod'
import { db } from '@/lib/db'
import { commentSchema, postSchema } from '@/schemas'
import { getServerSession } from '@/lib/auth'
import { isValidServerSession } from '@/helpers/is-valid-server-session'
import { removeCloudinary } from '../upload-service/remove-cloudinary'

export async function createPost(data: z.infer<typeof postSchema>) {
  const VALIDATION = postSchema.safeParse(data)
  const session = await getServerSession()
  const userId = session?.user.id || ''

  if (!session) {
    return { success: false, message: 'Unauthorized' }
  }

  if (!VALIDATION.success) {
    return { success: false, message: 'Invalid data' }
  }

  const {
    description,
    enabledComments,
    isPrivate,
    imageUrl,
    postId,
    location,
  } = VALIDATION.data

  try {
    await db.posts.create({
      data: {
        id: postId,
        userId,
        description,
        isPrivate,
        enabledComments,
        location,
        imageUrl,
      },
    })

    return { success: true, message: 'Post created successfully' }
  } catch {
    return { success: false, message: 'Failed to create post' }
  }
}

export async function getAllPosts({ pageParam = 1 }: { pageParam: number }) {
  await isValidServerSession()

  const itemsPerPage = 5
  const currentPage = pageParam

  try {
    const posts = await db.posts.findMany({
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage,
      orderBy: { createdAt: 'desc' },
      where: { isPrivate: false },
      include: {
        likes: true,
        savedPosts: true,
        user: { include: { followings: true } },
        comments: { orderBy: { createdAt: 'desc' }, include: { user: true } },
      },
    })

    const totalPosts = await db.posts.count()
    const lastPage = Math.ceil(totalPosts / itemsPerPage)
    const isLastPage = currentPage === lastPage

    return {
      data: posts,
      info: { page: currentPage, lastPage: isLastPage },
    }
  } catch {
    return {
      data: [],
      info: { page: currentPage, lastPage: false },
    }
  }
}

export async function getPostById(postId: string) {
  await isValidServerSession()

  try {
    const post = await db.posts.findUnique({
      where: { id: postId },
      include: {
        likes: true,
        savedPosts: true,
        user: { include: { followings: true } },
        comments: { orderBy: { createdAt: 'desc' }, include: { user: true } },
      },
    })

    return { data: post, status: 201 }
  } catch {
    return { data: null, status: 404 }
  }
}

export async function updatePost(
  data: z.infer<typeof postSchema>,
  postId: string
) {
  await isValidServerSession()

  const VALIDATION = postSchema.safeParse(data)

  if (!postId) {
    return { success: false, message: 'Post id is required' }
  }

  if (!VALIDATION.success) {
    return { success: false, message: 'Invalid data' }
  }

  const { description, enabledComments, isPrivate, location } = VALIDATION.data

  try {
    await db.posts.update({
      where: { id: postId },
      data: {
        description,
        isPrivate,
        enabledComments,
        location,
      },
    })

    return { success: true, message: 'Post updated successfully' }
  } catch {
    return { success: false, message: 'Failed to update the post' }
  }
}

export async function deletePost(postId: string) {
  await isValidServerSession()

  if (!postId) {
    return { success: false, message: 'Post id is required' }
  }

  try {
    await db.posts.delete({ where: { id: postId } })
    await removeCloudinary({ folder: 'posts', path: 'post', itemId: postId })

    return { success: true, message: 'Post deleted successfully' }
  } catch {
    return { success: false, message: 'Failed to delete the post' }
  }
}

export async function addLikePost(props: { postId: string }) {
  const { postId } = props

  const session = await getServerSession()
  const userId = session?.user.id || ''

  try {
    const findPost = await db.posts.findUnique({ where: { id: postId } })

    if (!findPost || !postId) {
      return { success: false, message: 'Post not found!' }
    }

    const findLike = await db.likes.findFirst({ where: { postId, userId } })

    if (!findLike) {
      await db.likes.create({ data: { postId, userId } })
      return { success: true, message: 'Post liked successfully!' }
    }

    await db.likes.delete({ where: { id: findLike.id } })
    return { success: true, message: 'Post unliked successfully!' }
  } catch {
    return { success: false, message: 'Failed to like post.' }
  }
}

export async function followUser(props: {
  followerId: string | undefined
  followingId: string | undefined
}) {
  const { followerId, followingId } = props

  if (!followerId || !followingId) {
    return { success: false, message: 'Failed to follow user.' }
  }

  try {
    const findHasFollowing = await db.followers.findUnique({
      where: { followerId_followingId: { followerId, followingId } },
    })

    if (findHasFollowing) {
      await db.followers.delete({
        where: { followerId_followingId: { followerId, followingId } },
      })

      return { success: true, message: 'You unfollowed the user!' }
    }

    await db.followers.create({ data: { followerId, followingId } })

    return { success: true, message: 'Now you follow the user!' }
  } catch {
    return { success: false, message: 'Failed to follow user.' }
  }
}

export async function savedPost(props: {
  postId: string
  userId: string | undefined
}) {
  const { postId, userId } = props

  if (!postId || !userId) {
    return { success: false, message: 'Failed to save post.' }
  }

  try {
    const findSavedPost = await db.savedPosts.findUnique({
      where: { userId_postId: { postId, userId } },
    })

    if (findSavedPost) {
      await db.savedPosts.delete({
        where: { userId_postId: { postId, userId } },
      })

      return { success: true, message: 'Post unsaved successfully!' }
    }

    await db.savedPosts.create({ data: { postId, userId } })
    return { success: true, message: 'Post saved successfully!' }
  } catch {
    return { success: false, message: 'Failed to save post.' }
  }
}

export async function addPostComment(data: z.infer<typeof commentSchema>) {
  const VALIDATION = commentSchema.safeParse(data)

  if (!VALIDATION.success) {
    return { success: false, message: 'Invalid data' }
  }

  const { content, userId, postId } = VALIDATION.data

  try {
    await db.comments.create({
      data: { content, postId, userId },
    })

    return { success: true, message: 'Comment added!' }
  } catch {
    return { success: false, message: 'Failed to add comment.' }
  }
}

export async function deletePostComment(commentId: string) {
  try {
    await db.comments.delete({ where: { id: commentId } })
    return { success: true, message: 'Comment deleted!' }
  } catch {
    return { success: false, message: 'Failed to delete comment.' }
  }
}
