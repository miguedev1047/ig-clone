import type { SVGProps } from 'react'

export function SavedIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z'
      />
    </svg>
  )
}
