import { useMutation, useQuery, useQueryClient } from 'react-query'
import orderService from 'src/services/order.service'
import { formatMoney } from 'src/utils/formatMoney'

const orderStatusOptions = [
  { label: 'Chờ xác nhận', value: 'Chờ xác nhận' },
  { label: 'Đã xác nhận đơn hàng', value: 'Đã xác nhận đơn hàng' },
  { label: 'Đang giao', value: 'Đang giao' },
  { label: 'Giao hàng thành công', value: 'Giao hàng thành công' },
  { label: 'Đã hủy', value: 'Đã hủy' }
]
function ListOrder() {
  const { data } = useQuery({
    queryKey: ['ORDER'],
    queryFn: () => {
      return orderService.listAdmin()
    }
  })
  const queryClient = useQueryClient()
  const updateOrderStatusMutation = useMutation(orderService.updateStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries(['ORDER'])
    }
  })

  const handleStatusChange = (orderId: any, newStatus: any) => {
    updateOrderStatusMutation.mutate({ id: orderId, status: newStatus })
  }
  return (
    <div>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Full name
              </th>
              <th scope='col' className='px-6 py-3'>
                Address
              </th>
              <th scope='col' className='px-6 py-3'>
                Phone
              </th>
              <th scope='col' className='px-6 py-3'>
                Products
              </th>
              <th scope='col' className='px-6 py-3'>
                Payment method
              </th>
              <th scope='col' className='px-6 py-3'>
                Total Price
              </th>
              <th scope='col' className='px-6 py-3'>
                Status Payment
              </th>
              <th scope='col' className='px-6 py-3'>
                Status Order
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.orders.map((order: any, index: number) => (
              <tr className='bg-white border-b' key={index}>
                <td className='px-6 py-4'>{order.user.full_name}</td>
                <td className='px-6 py-4'>{order.user.address}</td>
                <td className='px-6 py-4'>{order.user.phone}</td>

                <td className='px-6 py-4'>
                  {order.products.map((product: any, productIndex: number) => (
                    <div key={productIndex}>
                      {product.product.title} - {product.color.name} - {product.size.name} x {product.quantity}
                    </div>
                  ))}
                </td>
                <td className='px-6 py-4'>{order.payment_method}</td>
                <td className='px-6 py-4'>
                  <span>{formatMoney(order.total_price)}</span>
                </td>
                <td className='px-6 py-4'>{order.status_payment}</td>
                <td className='px-6 py-4'>
                  <select value={order.status} onChange={(e) => handleStatusChange(order._id, e.target.value)}>
                    {orderStatusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className='px-6 py-4'>
                  <button className='font-medium text-blue-600 hover:underline'>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListOrder
