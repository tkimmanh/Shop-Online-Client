import { useMutation, useQuery, useQueryClient } from 'react-query'
import { DATE_FORMAT } from 'src/config'
import orderService from 'src/services/order.service'
import dayjs from 'dayjs'
import { formatMoney } from 'src/utils/formatMoney'
import { enqueueSnackbar } from 'notistack'
import { messageOrder } from 'src/constants/order.constatns'
const ListOrder = () => {
  const queryClient = useQueryClient()
  const { data: myOrders } = useQuery({
    queryKey: ['ORDER'],
    queryFn: () => orderService.myOrder()
  })
  const deleteOrderMutation = useMutation({
    mutationFn: (id: string) => orderService.deleteOrder(id)
  })
  const handleDeleteOrder = (id: string) => {
    deleteOrderMutation.mutate(id, {
      onSuccess: () => {
        enqueueSnackbar('Xóa thành công', { variant: 'success' })
        queryClient.invalidateQueries('ORDER')
      }
    })
  }
  const updateOrderStatusMutation = useMutation(orderService.updateStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries('ORDER')
      enqueueSnackbar('Cập nhật trạng thái đơn hàng thành công', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('Có lỗi xảy ra', { variant: 'error' })
    }
  })
  const handleUpdateOrderStatus = (id: string, newStatus: string) => {
    updateOrderStatusMutation.mutate({ id, status: newStatus })
  }

  return (
    <div className='w-full '>
      <table className='border border-gray-300 w-full mx-auto max-w-[1000px]'>
        <thead>
          <tr>
            <th className='py-5 border-l'>Order ID</th>
            <th className='py-5 border-l'>Date</th>
            <th className='py-5 border-l w-[35%]'>Product</th>
            <th className='py-5 border-l'>Status</th>
            <th className='py-5 border-l'>Status Payment</th>
            <th className='py-5 border-l'>Total</th>
            <th className='py-5 border-l'>Action</th>
          </tr>
        </thead>
        <tbody>
          {myOrders?.data?.orders?.map((order: any) => {
            return (
              <tr className='border-b border-t'>
                <td className='py-5 border-l text-left pl-3 text-sm'>{order._id}</td>
                <td className='py-5 border-l text-center text-sm'>
                  {dayjs(order.createdAt).format(DATE_FORMAT.DDMMYYYYHHmmss)}
                </td>
                <td className='py-5 border-l text-left pl-3'>
                  {order.products.map((product: any) => (
                    <div key={product._id} className='my-2'>
                      <div>
                        <strong>Title:</strong> {product.product.title}
                      </div>
                      <div>
                        <strong>Size:</strong> {product.size.name}
                      </div>
                      <div>
                        <strong>Color:</strong> {product.color.name}
                      </div>
                      <div>
                        <strong>Quantity:</strong> {product.quantity}
                      </div>
                    </div>
                  ))}
                </td>
                <td className='py-5 border-l text-center px-2 text-sm'>{order.status}</td>
                <td className='py-5 border-l text-center px-2 text-sm'>{order.status_payment}</td>
                <td className='py-5 border-l text-left pl-3'>{formatMoney(order.total_price)}</td>
                <td className='py-5 border-l text-center px-3 flex flex-col gap-5'>
                  <button onClick={() => handleDeleteOrder(order._id)}>Delete</button>
                  <td>
                    {order.status === messageOrder.USER_CANCEL_ORDER ? (
                      <button onClick={() => handleUpdateOrderStatus(order._id, messageOrder.ORDER_WAIT_CONFIRM)}>
                        Re-order
                      </button>
                    ) : (
                      <button
                        disabled={order.status === messageOrder.ORDER_PEDDING}
                        onClick={() => handleUpdateOrderStatus(order._id, messageOrder.USER_CANCEL_ORDER)}
                      >
                        Cancel Order
                      </button>
                    )}
                  </td>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ListOrder
