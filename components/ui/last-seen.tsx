import TimeAgo, { Style } from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en)

interface LastSeenProps {
  date: Date | undefined
  timeStyle?: string | Style | undefined
}

export function LastSeen(props: LastSeenProps) {
  const { date, timeStyle = 'twitter' } = props

  return (
    <ReactTimeAgo
      date={date || new Date()}
      timeStyle={timeStyle}
      locale='en'
      className='text-xs text-muted-foreground leading-none'
    />
  )
}
