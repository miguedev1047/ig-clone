'use client'

import { z } from 'zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signInSchema } from '@/schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { signIn } from '@/services/auth-service'

export function SignInForm() {
  const { push } = useRouter()

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  })

  const isSubmitting = form.formState.isSubmitting

  const onSubmit = form.handleSubmit(async (data) => {
    const { success, message } = await signIn(data)
    if (!success) return toast.error(message)
    toast.success(message)
    push(DEFAULT_LOGIN_REDIRECT)
  })

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className='w-full grid gap-2'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder='Email'
                  disabled={isSubmitting}
                  className='border-accent'
                  autoComplete='off'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder='Password'
                  disabled={isSubmitting}
                  className='border-accent'
                  autoComplete='off'
                  type='password'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          disabled={isSubmitting}
          type='submit'
        >
          {isSubmitting && <Loader className='animate-spin' />}
          {isSubmitting ? 'Sign in...' : 'Log in'}
        </Button>
      </form>
    </Form>
  )
}
