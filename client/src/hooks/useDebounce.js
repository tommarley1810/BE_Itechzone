/**
 * useDebounce.js — Hook delay giá trị (dùng cho search)
 */
import { useState, useEffect } from 'react'

export default function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
