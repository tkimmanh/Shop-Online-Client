import { useQuery } from 'react-query'
import usersService from 'src/services/users.service'

const WishList = () => {
  const { data } = useQuery({
    queryKey: ['WISHLIST'],
    queryFn: () => usersService.getListWishList()
  })

  return <div>WishList</div>
}

export default WishList
