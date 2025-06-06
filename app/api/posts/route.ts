import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const searchParams = url.searchParams

  const itemsPerPage = 5
  const currentPage = parseInt(String(searchParams.get('page'))) || 1

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

    const data = {
      data: posts,
      info: { page: currentPage, lastPage: isLastPage },
    }

    return NextResponse.json(data, { status: 201 })
  } catch {
    const data = { data: [], info: { page: currentPage, lastPage: false } }
    return NextResponse.json(data, { status: 201 })
  }
}
