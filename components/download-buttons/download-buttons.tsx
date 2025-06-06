import Image from 'next/image'

import { MicrosoftBtn, PlayStoreBtn } from '@/assets/buttons/_index'
import { Button } from '@/components/ui/button'
import { MICROSOFT_URL, PLAYSTORE_URL } from '@/constants/general'

export function DownloadButtons() {
  return (
    <div className='flex flex-col gap-4 !mt-4'>
      <p className='text-center text-sm'>Get the app.</p>

      <div className='mx-auto space-x-2'>
        <Button
          asChild
          className='bg-transparent p-0'
        >
          <a
            href={PLAYSTORE_URL}
            target='_blank'
          >
            <Image
              src={PlayStoreBtn.src}
              width={128}
              height={128}
              className='w-[134px] h-auto'
              alt='Instagram Download Button'
            />
          </a>
        </Button>

        <Button
          asChild
          className='bg-transparent p-0'
        >
          <a
            href={MICROSOFT_URL}
            target='_blank'
          >
            <Image
              src={MicrosoftBtn.src}
              width={128}
              height={128}
              className='w-[110px] h-auto'
              alt='Instagram Download Button'
            />
          </a>
        </Button>
      </div>
    </div>
  )
}
