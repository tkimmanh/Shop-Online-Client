import { useMutation, useQuery, useQueryClient } from 'react-query'
import { DATE_FORMAT } from 'src/config'
import orderService from 'src/services/order.service'
import dayjs from 'dayjs'
import { formatMoney } from 'src/utils/formatMoney'
import { enqueueSnackbar } from 'notistack'
import { messageOrder } from 'src/constants/order.constatns'
import ModalInformation from '../Admin/Order/components/ModalInformation'
import { useMemo, useState } from 'react'
const ListOrder = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [idDetail, setIdDetail] = useState('')

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
  const updateOrderStatusMutation = useMutation({
    mutationFn: (body: any) => orderService.updateOrder(body)
  })
  const handleUpdateOrderStatus = (id: string, newStatus: string) => {
    updateOrderStatusMutation.mutate(
      { id, status: newStatus },
      {
        onSuccess: () => {
          enqueueSnackbar('Cập nhật thành công', { variant: 'success' })
          queryClient.invalidateQueries('ORDER')
        }
      }
    )
  }

  const detail = useMemo(() => {
    return myOrders?.data?.orders.find((_item: any) => _item?._id === idDetail)
  }, [idDetail, myOrders])

  return (
    <div className='w-full '>
      <table className='border border-gray-300 w-full mx-auto max-w-[1400px]'>
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
                      <div className='py-[2px]'>
                        <strong>Title:</strong> {product.product.title}
                      </div>
                      <div className='py-[2px]'>
                        <strong>Size:</strong> {product.size.name}
                      </div>
                      <div className='py-[2px]'>
                        <strong>Color:</strong> {product.color.name}
                      </div>
                      <div className='py-[2px]'>
                        <strong>Quantity:</strong> {product.quantity}
                      </div>
                    </div>
                  ))}
                </td>
                <td className='py-5 border-l text-center px-2 text-sm'>{order.status}</td>
                <td className='py-5 border-l text-center px-2 text-sm'>{order.status_payment}</td>
                <td className='py-5 border-l text-left pl-3'>{formatMoney(order.total_price)}</td>
                <td className='py-5 border-l text-center px-3'>
                  <p>
                    <button
                      className='py-[5px] bg-[#000] w-full text-[#fff] mb-[5px] rounded-[8px] border border-solid border-[#000] hover:bg-[#fff] hover:text-[#000]'
                      onClick={() => {
                        setIsOpen(true)
                        setIdDetail(order?._id)
                      }}
                    >
                      View
                    </button>
                  </p>
                  <p>
                    <button
                      className='py-[5px] bg-[#d90000] w-full text-[#fff] mb-[5px] rounded-[8px] border border-solid border-[#d90000] hover:bg-[#fff] hover:text-[#d90000]'
                      onClick={() => handleDeleteOrder(order._id)}
                    >
                      Delete
                    </button>
                  </p>
                  <p>
                    {order.status === messageOrder.USER_CANCEL_ORDER ? (
                      <button
                        className='py-[5px] bg-[#000] w-full text-[#fff] mb-[5px] rounded-[8px] border border-solid border-[#000] hover:bg-[#fff] hover:text-[#000]'
                        onClick={() => handleUpdateOrderStatus(order._id, messageOrder.ORDER_WAIT_CONFIRM)}
                      >
                        Re-order
                      </button>
                    ) : (
                      <button
                        className='py-[5px] bg-[#d90000] w-full text-[#fff] mb-[5px] rounded-[8px] border border-solid border-[#d90000] hover:bg-[#fff] hover:text-[#d90000]'
                        disabled={order.status === messageOrder.ORDER_PEDDING}
                        onClick={() => handleUpdateOrderStatus(order._id, messageOrder.USER_CANCEL_ORDER)}
                      >
                        Cancel Order
                      </button>
                    )}
                  </p>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {isOpen && <ModalInformation isOpen={isOpen} setIsOpen={setIsOpen} detail={detail} />}
    </div>
  )
}

export default ListOrder
