import { useSearchParams } from 'react-router-dom'

export default function useQuerySearchParams() {
  const [searchParams] = useSearchParams()
  return Object.fromEntries([...searchParams])
}
