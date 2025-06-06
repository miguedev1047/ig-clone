'use client'

import { z } from 'zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signUpSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

import Link from 'next/link'
import { signUp } from '@/services/auth-service'

export function SignUpForm() {
  const { push } = useRouter()

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: '', name: '', password: '' },
  })

  const { email, name, password } = form.watch()
  const isValidValues = !!email && !!name && !!password
  const isSubmitting = form.formState.isSubmitting

  const onSubmit = form.handleSubmit(async (data) => {
    const { success, message } = await signUp(data)
    if (!success) return toast.success(message)
    toast.success(message)
    push(DEFAULT_LOGIN_REDIRECT)
  })

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className='w-full grid gap-2 mt-4'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                  placeholder='Password'
                  className='border-accent'
                  autoComplete='off'
                  type='password'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder='Username'
                  className='border-accent'
                  autoComplete='off'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className='text-xs text-center space-y-4 my-2 text-muted-foreground'>
          <p>
            People who use our service may have uploaded your contact
            information to Instagram.{' '}
            <Link
              href='#'
              target='_blank'
              className='text-sky-600 dark:text-sky-400 hover:underline'
            >
              Learn More
            </Link>
          </p>

          <p>
            By signing up, you agree to our{' '}
            <Link
              href='#'
              target='_blank'
              className='text-sky-600 dark:text-sky-400 hover:underline'
            >
              Terms
            </Link>
            ,{' '}
            <Link
              href='#'
              target='_blank'
              className='text-sky-600 dark:text-sky-400 hover:underline'
            >
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link
              href='#'
              target='_blank'
              className='text-sky-600 dark:text-sky-400 hover:underline'
            >
              Cookies Policy
            </Link>
            .
          </p>
        </div>

        <Button disabled={isSubmitting || !isValidValues}>
          {isSubmitting && <Loader className='animate-spin' />}
          {isSubmitting ? 'Signing up...' : 'Sign up'}
        </Button>
      </form>
    </Form>
  )
}
