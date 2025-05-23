'use client'

import { useRef } from 'react'
import { CircleXIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export function ClearInput({
  className,
  value,
  placeholder,
  onChange,
  onBlur,
}: React.ComponentProps<typeof Input>) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClearInput = () => {
    if (inputRef.current) {
      inputRef.current.focus()
      inputRef.current.value = ''
    }
  }

  return (
    <div className='*:not-first:mt-2'>
      <div className='relative'>
        <Input
          ref={inputRef}
          className={cn(className)}
          placeholder={placeholder}
          autoComplete='off'
          type='text'
          value={value}
          onBlur={onBlur}
          onChange={onChange}
        />
        {value && (
          <button
            type='button'
            className='text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
            aria-label='Clear input'
            onClick={handleClearInput}
          >
            <CircleXIcon
              size={16}
              aria-hidden='true'
            />
          </button>
        )}
      </div>
    </div>
  )
}
