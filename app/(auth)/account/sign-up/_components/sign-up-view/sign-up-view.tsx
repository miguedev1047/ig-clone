import { DownloadButtons } from '@/components/download-buttons'
import { SignInWithdiscord } from '@/components/sign-in-with-discord'
import { Card } from '@/components/ui/card'
import { NAME_APP } from '@/constants/misc'
import { SignUpForm } from '@/app/(auth)/account/sign-up/_components/sign-up-form'

import Link from 'next/link'

export function SignUpView() {
  return (
    <div className='space-y-4'>
      <Card className='w-full max-w-[350px] mx-auto p-8 rounded-none'>
        <div className='w-full flex flex-col gap-4 items-center'>
          <div className='text-center space-y-6'>
            <h2 className='text-4xl font-bold'>{NAME_APP}</h2>

            <p className='text-muted-foreground font-semibold'>
              Sign up to see photos and videos from your friends.
            </p>

            <SignInWithdiscord
              isColoredButton
              isSeparator
              separatorPosition='bottom'
            />
          </div>

          <SignUpForm />
        </div>
      </Card>

      <Card className='w-full max-w-[350px] mx-auto p-5 rounded-none text-xs'>
        <div className='text-center'>
          <p>Have an account?</p>

          <Link
            href='/account/sign-in'
            className='text-sky-500 dark:text-sky-400 hover:underline font-semibold'
          >
            Log in
          </Link>
        </div>
      </Card>

      <DownloadButtons />
    </div>
  )
}
