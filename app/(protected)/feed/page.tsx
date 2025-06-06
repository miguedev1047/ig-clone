import { PostList } from '@/app/(protected)/feed/_components/post-list'

export default function FeedPage() {
  return (
    <section className='w-full max-w-[640px] mx-auto space-y-4 p-8'>
      <PostList />
    </section>
  )
}
