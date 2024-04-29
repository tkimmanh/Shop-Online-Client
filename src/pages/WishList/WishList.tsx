import { isEmpty } from 'lodash'
import moment from 'moment'
import { enqueueSnackbar } from 'notistack'
import { MdOutlineDelete } from 'react-icons/md'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import Heading from 'src/components/Heading'
import { routes } from 'src/routes/routes'
import usersService from 'src/services/users.service'

const WishList = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: 'WISHLIST',
    queryFn: () => usersService.getListWishList()
  })

  const deleteMutations = useMutation({
    mutationFn: (body: any) => usersService.removeToWishList(body),
    onSuccess: () => {
      enqueueSnackbar('Xoá thành công', { variant: 'success' })
      queryClient.invalidateQueries('WISHLIST')
    },
    mutationKey: 'WISHLIST'
  })

  const handleDelete = async (id: string | number) => {
    try {
      if (confirm('Are you sure you want to delete?')) {
        await deleteMutations.mutateAsync({ product_id: id })
      }
    } catch (error) {}
  }

  const handleAddToCart = (id: any, slug: any) => {
    navigate(routes.ProductDetail.path.replace(':id', id).replace(':slug', slug))
  }

  return (
    <div>
      <Heading className='text-center mt-[40px] text-[40px] font-medium'>Sản phẩm yêu thích</Heading>
      <div className='w-[1440px] mx-auto mt-[40px]'>
        {!isEmpty(data?.data?.wishlist) ? (
          <table className='w-full text-sm text-left  text-gray-500 border'>
            <tbody>
              {data?.data?.wishlist?.map((item: any) => {
                return (
                  <tr className='bg-white border-b'>
                    <td className='w-[40px] p-[5px]'>
                      <MdOutlineDelete className='text-[24px] cursor-pointer' onClick={() => handleDelete(item?._id)} />
                    </td>
                    <td className='w-[90px] py-[10px]'>
                      <img className='w-[80px] h-[122px] object-cover' src={item?.thumbnail?.url} alt='' />
                    </td>
                    <td className='w-[65%] p-[5px]'>
                      <p className='text-[18px] leading-[27px] text-[#000] font-medium'>{item?.title}</p>
                      <p className='text-[16px] leading-[31px] text-[#000]'>
                        {Number(item?.price).toLocaleString('en')} đ
                      </p>
                      <p className='text-[16px] leading-[27px] text-[#000]'>
                        {moment(item?.createdAt).format('MMMM DD, YYYY')}
                      </p>
                    </td>
                    <td className='border-l py-[5px] pl-[20px]'>
                      <button
                        onClick={() => handleAddToCart(item?._id, item?.slug)}
                        className='w-[200px]  text-[#000] bg-[#fff] hover:bg-[#000] hover:text-[#fff] font-[400] text-[12px] col-span-9 h-[40px]'
                        style={{ border: '1px solid #000' }}
                      >
                        Thêm vào giỏ hàng
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : (
          <p className='text-center mt-[40px] text-[20px] font-semibold'>Trống</p>
        )}
      </div>
    </div>
  )
}

export default WishList
