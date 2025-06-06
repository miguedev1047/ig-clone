import { Button } from '@/components/ui/button'
import { usePostDataContext } from '@/providers/post-data-porvider'

export function FollowAuthorButton() {
  const { postMetadata } = usePostDataContext()
  if (postMetadata.isOwnPost) return null

  return (
    <Button
      onClick={postMetadata.toggleFollowAuthor}
      className='text-primary'
      variant='transparent'
    >
      {postMetadata.isFollowingAuthor ? 'Following' : 'Follow'}
    </Button>
  )
}
