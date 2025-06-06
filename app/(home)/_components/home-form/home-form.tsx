'use client'

import { z } from 'zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Loader } from 'lucide-react'
import { toast } from 'sonner'
import { signInSchema } from '@/schemas'
import { useRouter } from 'next/navigation'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { signIn } from '@/services/auth-service'

export function HomeForm() {
  const { push } = useRouter()

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: 'guestuser@email.com', password: 'password123' },
  })

  const { email, password } = form.watch()
  const isSubmiting = form.formState.isSubmitting
  const isValidValues = !!email && !!password

  const onSubmit = form.handleSubmit(async (data) => {
    const { success, message } = await signIn(data)
    if (!success) return toast.success(message)
    toast.success('Log in successful!')
    push(DEFAULT_LOGIN_REDIRECT)
  })

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className='w-full grid gap-4'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  disabled={isSubmiting}
                  placeholder='Email'
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
                  disabled={isSubmiting}
                  placeholder='Password'
                  type='password'
                  className='border-accent'
                  autoComplete='off'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button disabled={isSubmiting || !isValidValues}>
          {isSubmiting && <Loader className='animate-spin' />}
          {isSubmiting ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
    </Form>
  )
}
