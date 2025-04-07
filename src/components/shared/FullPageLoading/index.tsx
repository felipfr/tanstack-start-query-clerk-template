import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useEffect } from 'react'
import { APP } from 'src/lib/constants/app'

interface FullPageLoaderProps {
  className?: string
  size?: number
}

export function FullPageLoading({ className, size = 24 }: Readonly<FullPageLoaderProps>) {
  useEffect(() => {
    const originalTitle = document.title
    document.title = `Loading... | ${APP.NAME}`
    return () => {
      document.title = originalTitle
    }
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <LoadingSpinner className={className} size={size} />
    </div>
  )
}
