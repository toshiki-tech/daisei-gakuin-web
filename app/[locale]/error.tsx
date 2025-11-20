'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-ink mb-4">エラーが発生しました</h2>
        <p className="text-ink/70 mb-6">申し訳ございません。エラーが発生しました。</p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"
        >
          もう一度試す
        </button>
      </div>
    </div>
  )
}

