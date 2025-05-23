import { Card } from '@/components/ui/card'
import { NAME_APP } from '@/constants/misc'
import { SignInForm } from '@/app/(auth)/account/sign-in/_components/sign-in-form'
import { SignInWithdiscord } from '@/components/sign-in-with-discord'
import { DownloadButtons } from '@/components/download-buttons'

import Link from 'next/link'

export function SignInView() {
  return (
    <div className='space-y-4 mt-12'>
      <Card className='w-full max-w-[350px] mx-auto p-8 rounded-none'>
        <div className='w-full flex flex-col gap-6 items-center'>
          <div className='text-center space-y-6'>
            <h2 className='text-4xl font-bold'>{NAME_APP}</h2>
          </div>

          <SignInForm />

          <SignInWithdiscord
            isColoredButton
            isSeparator
            separatorPosition='top'
          />
        </div>
      </Card>

      <Card className='w-full max-w-[350px] mx-auto p-5 rounded-none text-xs'>
        <div className='text-center'>
          <p>Don&apos;t have an account?</p>

          <Link
            href='/account/sign-up'
            className='text-sky-500 dark:text-sky-400 hover:underline font-semibold'
          >
            Sign up
          </Link>
        </div>
      </Card>

      <DownloadButtons />
    </div>
  )
}
