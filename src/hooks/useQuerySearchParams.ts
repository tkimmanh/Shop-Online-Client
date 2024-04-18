import { useSearchParams } from 'react-router-dom'

export default function useQuerySearchParams() {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '2'
  return {
    ...Object.fromEntries([...searchParams]),
    page,
    limit
  }
}
