'use server'

import { getServerSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { profileSchema } from '@/schemas'
import { z } from 'zod'

export const getUserById = async (id: string) => {
  try {
    const session = await getServerSession()

    if (!session) return null

    const user = await db.user.findUnique({
      where: { id },
      include: {
        posts: { include: { likes: true, comments: true } },
        savedPosts: {
          include: { post: { include: { likes: true, comments: true } } },
        },
        followers: true,
        followings: true,
      },
    })
    return user
  } catch {
    return null
  }
}

export const getUserByEmail = async (email: string) => {
  try {
      const session = await getServerSession()

    if (!session) return null

    const user = await db.user.findFirst({
      where: { email },
      include: {
        posts: { include: { likes: true, comments: true } },
        savedPosts: {
          include: { post: { include: { likes: true, comments: true } } },
        },
        followers: true,
        followings: true,
      },
    })
    return user
  } catch {
    return null
  }
}

export const getUserByName = async (name: string) => {
  try {
     const session = await getServerSession()

    if (!session) return null

    const user = await db.user.findFirst({
      where: { name },
      include: {
        posts: { include: { likes: true, comments: true } },
        savedPosts: {
          include: { post: { include: { likes: true, comments: true } } },
        },
        followers: true,
        followings: true,
      },
    })

    return user
  } catch {
    return null
  }
}

export const updateUserAvatar = async (props: {
  imageUrl: string
  userId: string | undefined
}) => {
  const { imageUrl, userId } = props

  try {
    const session = await getServerSession()

    if (!session) {
      return { success: false, message: 'Unauthorized' }
    }

    const findUser = await db.user.findUnique({ where: { id: userId } })

    if (!findUser) {
      return { success: false, message: 'User not found!' }
    }

    await db.user.update({
      where: { id: userId },
      data: { image: imageUrl },
    })

    return { success: true, message: 'Avatar updated!' }
  } catch {
    return { success: false, message: 'Failed to update avatar.' }
  }
}

export const validateFollowThisUser = async (props: {
  followingId: string | undefined
  followerId: string | undefined
}) => {
  const { followerId, followingId } = props
  if (!followingId || !followerId) return false

  const session = await getServerSession()

  if (!session) return false

  const isFollowThisUser = await db.followers.findUnique({
    where: {
      followerId_followingId: {
        followerId: followingId,
        followingId: followerId,
      },
    },
  })

  return !!isFollowThisUser
}

export const updateUserProfile = async (
  data: z.infer<typeof profileSchema>
) => {
  const VALIDATION = profileSchema.safeParse(data)

  if (!VALIDATION.success) {
    return { success: false, message: 'Invalid data' }
  }

  const { caption, name, userId, gender, website } = VALIDATION.data

  if (!userId) {
    return { success: false, message: 'User not found!' }
  }

  try {
    const session = await getServerSession()

    if (!session) {
      return { success: false, message: 'Unauthorized' }
    }

    await db.user.update({
      where: { id: userId },
      data: { name, caption, gender, website },
    })

    return { success: true, message: 'Profile updated!' }
  } catch {
    return { success: false, message: 'Failed to update profile.' }
  }
}

export const searchUsersByName = async (username: string) => {
  try {
    const session = await getServerSession()

    if (!username || !session) return []

    const userId = session.user.id

    const users = await db.user.findMany({
      where: { name: { contains: username }, id: { not: userId } },
      take: 8,
    })

    return users
  } catch {
    return null
  }
}
