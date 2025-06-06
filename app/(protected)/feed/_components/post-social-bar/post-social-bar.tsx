import { SavedIcon } from '@/assets/icons/saved'
import { CountingNumber } from '@/components/ui/counting-number'
import { Heart } from 'lucide-react'
import { motion } from 'motion/react'
import { usePostDataContext } from '@/providers/post-data-porvider'
import { PostDialogComments } from '@/app/(protected)/feed/_components/post-comments'
import { cn } from '@/lib/utils'

export function PostSocialBar() {
  const { postMetadata } = usePostDataContext()

  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-6'>
        <div className='flex items-center gap-2'>
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            onClick={postMetadata.toggleLikePost}
          >
            <Heart
              className={cn(
                'size-8 transition duration-300 ease-in-out',
                postMetadata.isLikedByCurrentUser && 'text-red-500'
              )}
            />
          </motion.button>
          <CountingNumber number={postMetadata.likeCount} />
        </div>

        <PostDialogComments />
      </div>

      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        onClick={postMetadata.toggleSavePost}
        className='cursor-pointer'
      >
        <SavedIcon
          className={cn(
            'size-8 transition duration-300 ease-in-out',
            postMetadata.isPostSaved && 'text-blue-400'
          )}
        />
      </motion.button>
    </div>
  )
}
