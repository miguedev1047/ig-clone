import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Loader } from 'lucide-react'
import { usePostDataContext } from '@/providers/post-data-porvider'
import { CommentFormProps } from '@/app/(protected)/feed/_components/comment-form/comment-form.props'

export function CommentForm(props: CommentFormProps) {
  const { formId = 'none' } = props
  const { postData, commentManager } = usePostDataContext()

  const isCommentsEnabled = postData?.enabledComments

  return (
    <Form {...commentManager.commentForm}>
      <form
        onSubmit={commentManager.submitComment}
        className='flex items-center gap-1'
      >
        <FormField
          control={commentManager.commentForm.control}
          name='content'
          render={({ field }) => (
            <FormItem className='flex flex-1'>
              <FormControl>
                <Input
                  id={formId}
                  autoComplete='off'
                  className='border-none bg-transparent p-0 dark:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none'
                  placeholder={
                    isCommentsEnabled
                      ? 'Add a comment...'
                      : 'Comments are disabled'
                  }
                  disabled={
                    commentManager.isSubmittingComment || !isCommentsEnabled
                  }
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type='submit'
          variant='transparent'
          disabled={commentManager.isSubmittingComment || !isCommentsEnabled}
        >
          {commentManager.isSubmittingComment && (
            <Loader className='animate-spin' />
          )}
          Post
        </Button>
      </form>
    </Form>
  )
}
