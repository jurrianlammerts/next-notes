import { parseISO, format } from 'date-fns'

export default function Date({ dateString }: any) {
  const date = parseISO(dateString)
  return <time className="date" dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}