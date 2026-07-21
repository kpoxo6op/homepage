import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'

interface LastUpdatedProps {
  date?: string
}

export default function LastUpdated({ date }: LastUpdatedProps) {
  if (!date) return null

  return (
    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
      Last updated <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
    </p>
  )
}
