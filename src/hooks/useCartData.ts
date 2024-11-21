import { useQuery } from 'react-query'
import usersService from 'src/services/users.service'
import { getAccessTokenFromLocalStorage } from 'src/utils/localStorage'

export function useCartData() {
  const accessToken = getAccessTokenFromLocalStorage()
  const result = useQuery('cart', usersService.getCurrentUser, {
    enabled: !!accessToken
  })
  return { ...result, loading: result.isLoading }
}
