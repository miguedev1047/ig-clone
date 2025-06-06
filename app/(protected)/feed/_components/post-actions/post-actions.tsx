import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Ellipsis } from 'lucide-react'
import { usePostDataContext } from '@/providers/post-data-porvider'

export function PostActions() {
  const { actionHandler, postMetadata } = usePostDataContext()

  return (
    <Dialog
      open={actionHandler.isActionMenuOpen}
      onOpenChange={actionHandler.setIsActionMenuOpen}
    >
      <DialogTrigger asChild>
        <Button
          size='icon'
          variant='transparent'
        >
          <Ellipsis />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[400px] p-0 border-0 bg-accent'>
        <DialogHeader className='hidden'>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className='grid gap-1 py-1.5'>
          {postMetadata.isOwnPost && (
            <>
              <Button
                onClick={() => actionHandler.handlePostAction('delete')}
                variant='transparent'
                className='h-[48px] text-destructive'
              >
                Delete
              </Button>
              <Separator />
            </>
          )}

          {postMetadata.isOwnPost && (
            <>
              <Button
                onClick={() => actionHandler.handlePostAction('edit')}
                variant='transparent'
                className='h-[48px]'
              >
                Edit
              </Button>
              <Separator />
            </>
          )}

          <Button
            onClick={() => actionHandler.handlePostAction('copy-link')}
            variant='transparent'
            className='h-[48px]'
          >
            Copy link
          </Button>

          <Separator />
          
          <Button
            onClick={() => actionHandler.handlePostAction('go-post')}
            variant='transparent'
            className='h-[48px]'
          >
            Go to post
          </Button>

          <Separator />
          
          <Button
            onClick={() => actionHandler.handlePostAction('cancel')}
            variant='transparent'
            className='h-[48px]'
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
