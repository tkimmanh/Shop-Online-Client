import { useMutation, useQuery, useQueryClient } from 'react-query'
import { DATE_FORMAT } from 'src/config'
import orderService from 'src/services/order.service'
import dayjs from 'dayjs'
import { formatMoney } from 'src/utils/formatMoney'
import { enqueueSnackbar } from 'notistack'
import { messageOrder } from 'src/constants/order.constatns'
import ModalInformation from '../Admin/Order/components/ModalInformation'
import { useContext, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import classNames from 'src/utils/classNames'
import { AppContext } from 'src/context/app.context'

const ListOrder = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null)
  const { setUser } = useContext(AppContext)
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
        setUser((prev: any) => ({ ...prev, cart: prev?.cart - 1 }))
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
  const confirmReturnOrder = (orderId: string) => {
    confirmAlert({
      title: 'Confirm to return',
      message: 'Are you sure you want to return this order?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleUpdateOrderStatus(orderId, messageOrder.USER_RETURN_ORDER)
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    })
  }
  const { data: detailOrder } = useQuery(
    ['ORDER_DETAIL', currentOrderId],
    () => orderService.myOrderDetail(currentOrderId!),
    {
      enabled: !!currentOrderId
    }
  )
  const handleDetailOrder = (id: string) => {
    setCurrentOrderId(id)
    setIsOpen(true)
  }

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
            const canReturn =
              order.status === messageOrder.ORDER_SUCESS && dayjs().diff(dayjs(order.deliveredAt), 'day') <= 3

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
                <td className='py-5 border-l text-center px-2 text-sm'>{order?.status}</td>
                <td className='py-5 border-l text-center px-2 text-sm'>{order?.status_payment}</td>
                <td className='py-5 border-l text-left pl-3'>{formatMoney(order?.total_price)}</td>
                <td className='py-5 border-l text-center px-3 gap-y-4 flex flex-col'>
                  <p>
                    <button
                      className='py-[5px] bg-[#000] w-full text-[#fff] mb-[5px] rounded-[8px] border border-solid border-[#000] hover:bg-[#fff] hover:text-[#000]'
                      onClick={() => handleDetailOrder(order._id)}
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
                    {canReturn ? (
                      <button
                        onClick={() => confirmReturnOrder(order._id)}
                        className='py-2 px-4 w-full bg-blue-500 text-white rounded hover:bg-blue-700'
                      >
                        Returns
                      </button>
                    ) : (
                      <span className='text-gray-300 '>Return period expired</span>
                    )}
                  </p>
                  {order.status === messageOrder.USER_RETURN_ORDER ? (
                    <button
                      className={classNames(
                        'py-[5px]  w-full text-[#fff] mb-[5px] rounded-[8px] border border-solid ',
                        order.status === messageOrder.USER_CANCEL_ORDER
                          ? 'border-gray-400 bg-gray-400 pointer-events-none'
                          : 'border-[#d90000] bg-[#d90000] hover:bg-[#fff] hover:text-[#d90000]'
                      )}
                      disabled={
                        order.status === messageOrder.ORDER_PEDDING || order.status === messageOrder.USER_CANCEL_ORDER
                      }
                      onClick={() => handleUpdateOrderStatus(order._id, messageOrder.USER_CANCEL_ORDER)}
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      className={classNames(
                        'py-[5px]  w-full text-[#fff] mb-[5px] rounded-[8px] border border-solid ',
                        order.status === messageOrder.USER_CANCEL_ORDER
                          ? 'border-gray-400 bg-gray-400 pointer-events-none'
                          : 'border-[#d90000] bg-[#d90000] hover:bg-[#fff] hover:text-[#d90000]'
                      )}
                      disabled={
                        order.status === messageOrder.ORDER_PEDDING || order.status === messageOrder.USER_CANCEL_ORDER
                      }
                      onClick={() => handleUpdateOrderStatus(order._id, messageOrder.USER_CANCEL_RETURN_ORDER)}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {isOpen && <ModalInformation isOpen={isOpen} setIsOpen={setIsOpen} detail={detailOrder?.data.order} />}
    </div>
  )
}

export default ListOrder
