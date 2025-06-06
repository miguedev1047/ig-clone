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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { GENDERS } from '@/constants/general'
import { profileSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useClientSession } from '@/lib/auth-client'
import { updateUserProfile } from '@/services/user-service'
import { z } from 'zod'

export function EditorForm() {
  const { data: session } = useClientSession()

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: session?.user.name,
      userId: session?.user.id,
      caption: session?.user.caption || '',
      gender: session?.user.gender || '',
      website: session?.user.website || '',
    },
  })

  const isSubmitting = form.formState.isSubmitting

  const onSubmit = form.handleSubmit(async (data) => {
    const { success, message } = await updateUserProfile(data)

    if (success) {
      toast.success(message)
      return
    }

    toast.error(message)
  })

  return (
    <Form {...form}>
      <form
        className='gap-8 flex flex-col'
        onSubmit={onSubmit}
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='space-y-2'>
              <FormLabel className='font-extrabold'>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Name'
                  disabled={isSubmitting}
                  className='!bg-accent w-full p-5'
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='caption'
          render={({ field }) => (
            <FormItem className='space-y-2'>
              <FormLabel className='font-extrabold'>Bio</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder='Bio'
                  disabled={isSubmitting}
                  className='border-accent resize-none min-h-[80px]'
                />
              </FormControl>
              <FormDescription>
                Write a few words about yourself.
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='gender'
          render={({ field }) => (
            <FormItem className='space-y-2'>
              <FormLabel className='font-extrabold'>Gender</FormLabel>

              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger className='border-accent p-5 w-full'>
                    <SelectValue placeholder='Select gender' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {GENDERS.map((gender) => (
                    <SelectItem
                      key={gender.value}
                      value={gender.value}
                    >
                      {gender.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select your gender for other users to see.
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='website'
          render={({ field }) => (
            <FormItem className='space-y-2'>
              <FormLabel className='font-extrabold'>Website</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Your website'
                  disabled={isSubmitting}
                  className='border-accent p-5'
                />
              </FormControl>
              <FormDescription>
                This is your personal website or blog.
              </FormDescription>
            </FormItem>
          )}
        />

        <div className='flex justify-end'>
          <Button
            type='submit'
            className='w-[150px]'
          >
            {isSubmitting ? <Loader className='animate-spin' /> : 'Submit'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
