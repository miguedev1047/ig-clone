'use client'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FrownIcon, HomeIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const { back } = useRouter()

  return (
    <section className='flex min-h-screen items-center justify-center bg-background p-4 relative'>
      <Card className='w-full max-w-md text-center'>
        <CardHeader>
          <CardTitle className='flex items-center justify-center gap-2 text-3xl font-bold'>
            <FrownIcon className='h-8 w-8' />
            ¿Oh, you are lost?
            <Badge variant='destructive'>404</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground'>
            ¡Ups! This page doesn&apos;t exist.
          </p>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Button
            onClick={back}
            className='flex items-center gap-2'
          >
            <HomeIcon className='h-4 w-4' />
            Back
          </Button>
        </CardFooter>
      </Card>
    </section>
  )
}
