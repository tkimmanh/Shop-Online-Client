import { useMutation, useQuery, useQueryClient } from 'react-query'
import { DATE_FORMAT } from 'src/config'
import orderService from 'src/services/order.service'
import dayjs from 'dayjs'
import { formatMoney } from 'src/utils/formatMoney'
import { enqueueSnackbar } from 'notistack'
import { messageOrder } from 'src/constants/order.constatns'
import ModalInformation from '../Admin/Order/components/ModalInformation'
import { useEffect, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import classNames from 'src/utils/classNames'

const ListOrder = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined)
  const [statusCounts, setStatusCounts] = useState({})

  const queryClient = useQueryClient()
  const { data: myOrders, refetch } = useQuery({
    queryKey: ['ORDER', statusFilter],
    queryFn: () => orderService.myOrder(statusFilter)
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

  const handleStatusFilterChange = (status?: string) => {
    setStatusFilter(status)
    refetch()
  }

  useEffect(() => {
    const fetchStatusCounts = async () => {
      const response = await orderService.getOrderCountsByStatus()

      setStatusCounts(
        response.data?.counts.reduce((acc: any, curr: any) => {
          acc[curr.status] = curr.count
          return acc
        }, {})
      )
    }

    fetchStatusCounts()
  }, [])

  const isActive = (status?: string) => {
    return status === statusFilter ? 'bg-black text-white' : 'bg-white text-black'
  }
  const getStatusLabel = () => {
    const status = [
      { label: 'Tất cả đơn hàng', value: '' },
      { label: 'Chờ xác nhận', value: messageOrder.ORDER_WAIT_CONFIRM },
      { label: 'Đã xác nhận', value: messageOrder.ORDER_CONFIRM },
      { label: 'Đang giao', value: messageOrder.ORDER_PEDDING },
      { label: 'Giao hàng thành công', value: messageOrder.ORDER_SUCESS },
      { label: 'Đã hủy', value: messageOrder.CANCEL_ORDER },
      { label: 'Trả hàng', value: messageOrder.USER_RETURN_ORDER }
    ].find((item) => item.value === statusFilter)
    return status ? status.label : 'Tất cả đơn hàng'
  }
  const canCancelOrder = (status: string) => {
    return status === messageOrder.ORDER_WAIT_CONFIRM || status === messageOrder.ORDER_CONFIRM
  }
  return (
    <div className='w-full '>
      <div className='flex items-center justify-center my-10 space-x-4 mb-4'>
        {[
          { label: 'Tất cả đơn hàng', value: '' },
          { label: 'Chờ xác nhận', value: messageOrder.ORDER_WAIT_CONFIRM },
          { label: 'Đã xác nhận', value: messageOrder.ORDER_CONFIRM },
          { label: 'Đang giao', value: messageOrder.ORDER_PEDDING },
          { label: 'Giao hàng thành công', value: messageOrder.ORDER_SUCESS },
          { label: 'Đã hủy', value: messageOrder.CANCEL_ORDER },
          { label: 'Trả hàng', value: messageOrder.USER_RETURN_ORDER }
        ].map((item) => (
          <button
            key={item.value}
            onClick={() => handleStatusFilterChange(item.value)}
            className={classNames(
              'tagcloud text-[12px] font-medium leading-[18px] cursor-pointer',
              isActive(item.value)
            )}
          >
            {item.label} ({statusCounts[item.value as keyof typeof statusCounts] || 0})
          </button>
        ))}
      </div>
      <h2 className='text-2xl font-bold mb-4 text-center my-10'>Danh sách đơn hàng "{getStatusLabel()}"</h2>
      <table className='border border-gray-300 w-full mx-auto max-w-[1400px]'>
        <thead>
          <tr>
            <th className='py-5 border-l'>Ngày đặt</th>
            <th className='py-5 border-l w-[35%]'>Thông tin sản phẩm</th>
            <th className='py-5 border-l'>Trạng thái</th>
            <th className='py-5 border-l'>Phương thức thanh toán</th>
            <th className='py-5 border-l'>Giá</th>
            <th className='py-5 border-l w-[150px]'></th>
          </tr>
        </thead>
        <tbody>
          {myOrders?.data?.orders?.map((order: any) => {
            const canReturn =
              order.status === messageOrder.ORDER_SUCESS && dayjs().diff(dayjs(order.deliveredAt), 'day') <= 3

            return (
              <tr className='border-b border-t'>
                <td className='py-5 border-l text-center text-sm'>
                  {dayjs(order.createdAt).format(DATE_FORMAT.DDMMYYYYHHmmss)}
                </td>
                <td className='py-5 border-l text-left pl-3'>
                  {order.products.map((product: any) => (
                    <div key={product._id} className='my-2'>
                      <div className='py-[2px]'>
                        <strong>Sản phẩm:</strong> {product.product.title}
                      </div>
                      <div className='py-[2px]'>
                        <strong>Kích cỡ:</strong> {product.size.name || '(Trống)'}
                      </div>
                      <div className='py-[2px]'>
                        <strong>Màu:</strong> {product.color.name || '(Trống)'}
                      </div>
                      <div className='py-[2px]'>
                        <strong>Số lượng:</strong> {product.quantity}
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
                      Xem
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
                      className='py-[5px] px-4 w-full bg-blue-500 text-white rounded hover:bg-blue-700'
                    >
                      Trả hàng
                    </button>
                  ) : (
                    <span className='text-gray-300'>Hiện không thể trả hàng</span>
                  )}
                  {order.status === messageOrder.USER_RETURN_ORDER && (
                    <button
                      className={classNames(
                        'py-[5px] w-full text-[#fff] mb-[5px] rounded-[8px] border border-solid ',
                        order.status === messageOrder.USER_CANCEL_ORDER
                          ? 'border-gray-400 bg-gray-400 pointer-events-none'
                          : 'border-[#d90000] bg-[#d90000] hover:bg-[#fff] hover:text-[#d90000]'
                      )}
                      onClick={() => handleUpdateOrderStatus(order._id, messageOrder.ORDER_SUCESS)}
                    >
                      Hủy trả hàng
                    </button>
                  )}
                  {canCancelOrder(order.status) && (
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
