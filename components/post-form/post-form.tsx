'use client'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import {
  Accordion,
  AccordionTrigger,
  AccordionItem,
  AccordionContent,
} from '@/components/ui/accordion'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Locate } from 'lucide-react'
import { usePostDialogContext } from '@/providers/post-dialog-provider'

export function PostForm() {
  const { form, isSubmitting, handleFormSubmit } =
    usePostDialogContext()

  return (
    <Form {...form}>
      <form
        onSubmit={handleFormSubmit}
        id='form-submit-post'
      >
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className='resize-none h-[150px] !bg-transparent outline-0 focus-visible:ring-0 shadow-none border-0 p-0 rounded-none'
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='location'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='relative'>
                  <Input
                    placeholder='Location'
                    disabled={isSubmitting}
                    className='peer shadow-none px-0 w-full bg-transparent dark:bg-transparent border-none focus-visible:ring-[0px]'
                    {...field}
                  />

                  <div className='text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center peer-disabled:opacity-50'>
                    <Locate
                      size={16}
                      aria-hidden='true'
                    />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <Accordion
          type='single'
          collapsible
        >
          <AccordionItem value='item-1'>
            <AccordionTrigger className='data-[state=open]:font-medium'>
              Advanced settings
            </AccordionTrigger>
            <AccordionContent>
              <div className='space-y-2'>
                <FormField
                  control={form.control}
                  name='enabledComments'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start justify-between py-3'>
                      <div className='space-y-0.5'>
                        <FormLabel>Turn off commenting</FormLabel>
                        <FormDescription>
                          You can turn off comments.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='isPrivate'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start justify-between py-3'>
                      <div className='space-y-0.5'>
                        <FormLabel>Private post</FormLabel>
                        <FormDescription>
                          Only you can see the post.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </form>
    </Form>
  )
}
