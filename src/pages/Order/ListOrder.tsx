import { useMutation, useQuery, useQueryClient } from 'react-query'
import { DATE_FORMAT } from 'src/config'
import orderService from 'src/services/order.service'
import dayjs from 'dayjs'
import { formatMoney } from 'src/utils/formatMoney'
import { enqueueSnackbar } from 'notistack'
import { messageOrder } from 'src/constants/order.constatns'
import ModalInformation from '../Admin/Order/components/ModalInformation'
import { useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import classNames from 'src/utils/classNames'

const ListOrder = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null)
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
        queryClient.invalidateQueries('ORDER')
        enqueueSnackbar('Xóa thành công', { variant: 'success' })
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
      message: 'Bạn có chắc muốn trả hàng?',
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
            <th className='py-5 border-l'>ID</th>
            <th className='py-5 border-l'>Ngày đặt</th>
            <th className='py-5 border-l w-[35%]'>Thông tin sản phẩm</th>
            <th className='py-5 border-l'>Trạng thái</th>
            <th className='py-5 border-l'>Phương thức thanh toán</th>
            <th className='py-5 border-l'>Giá</th>
            <th className='py-5 border-l'></th>
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
                    {order.status === messageOrder.USER_CANCEL_ORDER && (
                      <button
                        className='py-[5px] bg-[#d90000] w-full text-[#fff] mb-[5px] rounded-[8px] border border-solid border-[#d90000] hover:bg-[#fff] hover:text-[#d90000]'
                        onClick={() => handleDeleteOrder(order._id)}
                      >
                        Xóa đơn hàng
                      </button>
                    )}
                  </p>
                  {canReturn ? (
                    <button
                      onClick={() => confirmReturnOrder(order._id)}
                      className='py-2 px-4 w-full bg-blue-500 text-white rounded hover:bg-blue-700'
                    >
                      Trả hàng
                    </button>
                  ) : (
                    <span className='text-gray-300 '>Quá hạn trả hàng</span>
                  )}
                  {order.status === messageOrder.USER_RETURN_ORDER && (
                    <button
                      className={classNames(
                        'py-[5px]  w-full text-[#fff] mb-[5px] rounded-[8px] border border-solid ',
                        order.status === messageOrder.USER_CANCEL_ORDER
                          ? 'border-gray-400 bg-gray-400 pointer-events-none'
                          : 'border-[#d90000] bg-[#d90000] hover:bg-[#fff] hover:text-[#d90000]'
                      )}
                      onClick={() => handleUpdateOrderStatus(order._id, messageOrder.ORDER_SUCESS)}
                    >
                      Hủy hoàn hàng
                    </button>
                  )}
                  {order.status === messageOrder.ORDER_WAIT_CONFIRM && (
                    <button
                      className='py-[5px] bg-[#d90000] w-full text-[#fff] mb-[5px] rounded-[8px] border border-solid border-[#d90000] hover:bg-[#fff] hover:text-[#d90000]'
                      onClick={() => handleUpdateOrderStatus(order._id, messageOrder.USER_CANCEL_ORDER)}
                    >
                      Hủy đơn hàng
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
