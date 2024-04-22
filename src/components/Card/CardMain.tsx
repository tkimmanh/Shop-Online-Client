import { CiHeart, CiSearch } from 'react-icons/ci'
import classNames from 'src/utils/classNames'
import { useContext, useEffect, useState } from 'react'
import { PiBagThin } from 'react-icons/pi'
import useHover from 'src/hooks/useHover'
import Option from './Option/Option'
import { images } from 'src/assets'
import usersService from 'src/services/users.service'
import { enqueueSnackbar } from 'notistack'
import { useQueryClient } from 'react-query'
import { AppContext } from 'src/context/app.context'
import { FaHeart } from 'react-icons/fa'
interface Props {
  image: string
  discount?: string
  id?: any
}
const Card = ({ image, discount, id }: Props) => {
  const { hovered, nodeRef } = useHover<HTMLDivElement>()
  const [isDesktop, setIsDesktop] = useState(false)
  const queryClient = useQueryClient()

  const { user, setCartChanged, cartChanged } = useContext(AppContext)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1025px)')
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches)
    }
    setIsDesktop(mediaQuery.matches)

    mediaQuery.addListener(handleChange)

    return () => mediaQuery.removeListener(handleChange)
  }, [])

  const handleAddToCart = async (id: any) => {
    try {
      await usersService.addToCart({ product_id: id })
      enqueueSnackbar('Đã thêm sản phẩm vào giỏ hàng', { variant: 'success' })
      queryClient.invalidateQueries('cart')
      setCartChanged(!cartChanged)
    } catch (error) {
      console.error(error)
    }
  }
  const handleAddToWishList = async () => {
    try {
      await usersService.addToWishList({ product_id: id })
      enqueueSnackbar('Đã thêm sản phẩm vào danh sách yêu thích', { variant: 'success' })
      setCartChanged(!cartChanged)
    } catch (error) {
      console.error(error)
    }
  }
  const handleRemoveWishList = async () => {
    try {
      await usersService.removeToWishList({ product_id: id })
      enqueueSnackbar('Đã xóa khỏi danh sách yêu thích', { variant: 'success' })
      setCartChanged(!cartChanged)
    } catch (error) {
      console.error(error)
    }
  }
  const isProductInWishlist = user?.wishlist.some((product: any) => (product as string) === id)
  return (
    <>
      <div className='relative lg:mx-0 lg:max-w-[338px] lg:h-[518px] md:h-[500px] h-[400px] ' ref={nodeRef}>
        <img className='w-full h-full object-cover' src={image || images.placeholderImage} alt='image-product' />
        <div
          className={classNames(
            'absolute bottom-8 right-0 flex gap-x-3',
            hovered && isDesktop
              ? 'slide-top transform md:translate-x-0 lg:left-[30%] lg:-translate-x-1/2'
              : 'md:flex flex flex-col gap-y-3 -translate-y-[100%] pr-5 lg:hidden'
          )}
        >
          <Option>
            {isProductInWishlist ? (
              <FaHeart onClick={() => handleRemoveWishList()} size={15} />
            ) : (
              <CiHeart onClick={() => handleAddToWishList()} size={20} />
            )}
          </Option>
          <Option>
            <PiBagThin onClick={() => handleAddToCart(id)} size={20} />
          </Option>
          <Option>
            <CiSearch size={20} />
          </Option>
        </div>
        <div className='absolute top-4 left-4 flex gap-x-2 text-xs'>
          <div className='w-11 h-6 bg-[#af6d57] text-center flex items-center justify-center text-white capitalize'>
            hot
          </div>
          {discount && <div className='w-11 h-6 bg-white text-center flex items-center justify-center'>20%</div>}
        </div>
      </div>
    </>
  )
}

export default Card
