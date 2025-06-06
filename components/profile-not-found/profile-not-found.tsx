import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { AlertCircleIcon } from 'lucide-react'

export function ProfileNotFound() {
  return (
    <div className='w-full h-[calc(100vh-8rem)] grid place-items-center'>
      <div className='text-center space-y-4'>
        <div className='size-20 p-7 bg-accent rounded-full mx-auto grid place-items-center'>
          <AlertCircleIcon className='size-full' />
        </div>

        <h1 className='text-xl font-bold'>Profile isn&apos;t available</h1>

        <p className='text-sm'>
          The link may be broken, or the profile may have been removed.
        </p>

        <Button asChild>
          <Link href='/feed'>See more on Instagram</Link>
        </Button>
      </div>
    </div>
  )
}
