import Heading from 'src/components/Heading'
import QuantitySelector from 'src/components/QuantitySelector'
import { formatMoney } from 'src/utils/formatMoney'
import { FiTrash } from 'react-icons/fi'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import usersService from 'src/services/users.service'
import { useSnackbar } from 'notistack'
import { useCartData } from 'src/hooks/useCartData'
const CartPage = () => {
  const { data: listItemCart } = useCartData()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const deleteCartMutation = useMutation({
    mutationFn: ({ product_id, color_id, size_id }: any) =>
      usersService.deleteCart({ product_id, color_id, size_id }) as any
  })
  const handleDeleteCartItem = ({ product_id, color_id, size_id }: any) => {
    deleteCartMutation.mutate(
      { product_id, color_id, size_id },
      {
        onSuccess: () => {
          enqueueSnackbar('Đã xóa sản phẩm ra khỏi giỏ hàng', { variant: 'success' })
          queryClient.invalidateQueries('cart')
        }
      }
    )
  }
  const updateQuantityMutation = useMutation({
    mutationFn: ({ product_id, color_id, size_id, quantity }: any) =>
      usersService.updateCart({ product_id, color_id, size_id, quantity: quantity })
  })

  const handleQuantityChange = (product_id: string, color_id: string, size_id: string, newQuantity: number) => {
    updateQuantityMutation.mutate(
      { product_id, color_id, size_id, quantity: newQuantity },
      {
        onSuccess: () => {
          enqueueSnackbar('Cập nhật số lượng thành công', { variant: 'success' })
          queryClient.invalidateQueries('cart')
        },
        onError: () => {
          enqueueSnackbar('Có lỗi xảy ra khi cập nhật số lượng', { variant: 'error' })
        }
      }
    )
  }

  return (
    <div>
      <Heading className='text-4xl text-center py-10'>Cart</Heading>
      <div className='w-full grid grid-cols-10 mx-10 gap-x-20'>
        <table className='border border-gray-300 w-full mx-auto col-span-6'>
          <thead className='border border-gray-300 '>
            <tr>
              <th className='p-3 w-[350px] font-semibold min-h-[58px] text-left'>Product</th>
              <th className='w-[208px] border-l border-gray-300'>Quantity</th>
              <th className='w-[128px] border-l border-gray-300'>Subtotal</th>
              <th className='w-[80px] border-l border-gray-300'></th>
            </tr>
          </thead>
          <tbody>
            {listItemCart?.data.user?.cart?.map((item: any, index: number) => {
              return (
                <tr className='border-b border-gray-300 '>
                  <td className='border-r border-gray-300 p-3' key={index + 1}>
                    <div className='flex gap-x-5 items-start'>
                      <img className='w-24 h-40 object-contain' src={item?.product?.thumbnail.url as string} alt='' />
                      <div className='flex flex-col mt-5 '>
                        <span className='uppercase text-xs font-medium '>{item?.product.title}</span>
                        <span className='my-3'>{formatMoney(item?.product.price)}</span>
                        {item.product.colors?.length > 0 && (
                          <span className='uppercase text-xs font-medium'>
                            Color - {item?.product.colors?.map((color: any) => color?.name)}
                          </span>
                        )}
                        {item.product.sizes?.length > 0 && (
                          <span className='uppercase text-xs font-medium'>
                            Size - {item?.product?.sizes?.map((sizes: any) => sizes?.name)}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className='flex items-center my-auto justify-center h-40'>
                    <div>
                      <QuantitySelector
                        initialQuantity={item?.quantity}
                        onQuantityChange={(newQuantity) =>
                          handleQuantityChange(item.product._id, item.color, item.size, newQuantity)
                        }
                      ></QuantitySelector>
                    </div>
                  </td>
                  <td className='border-l border-gray-300'>
                    <span className='flex items-center justify-center '>{formatMoney(item?.product?.subtotal)}</span>
                  </td>
                  <td className='border-l border-gray-300'>
                    <div className='flex items-center justify-center '>
                      <button
                        onClick={() =>
                          handleDeleteCartItem({
                            product_id: item.product._id,
                            color_id: item.color,
                            size_id: item.size
                          })
                        }
                      >
                        <FiTrash></FiTrash>
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className='col-span-4'>
          <div className='bg-[#f7f7f7] w-[460px] h-[476px]'></div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
