'use client'
import { useEffect } from 'react'

import DefaultError from '@/src/ui/components/DefaultError'

const Error = ({ error }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    console.error(error) // log to sentry
  }, [error])
  return <DefaultError />
}
export default Error
