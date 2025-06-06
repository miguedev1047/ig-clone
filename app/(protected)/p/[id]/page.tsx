import { PostSection } from '@/app/(protected)/p/[id]/_components/post-section'
import { LatestPosts } from '@/app/(protected)/p/[id]/_components/lastest-posts'

export default function Post() {
  return (
    <section className='max-w-[975px] mx-auto space-y-16 p-8'>
      <PostSection />
      <LatestPosts />
    </section>
  )
}
