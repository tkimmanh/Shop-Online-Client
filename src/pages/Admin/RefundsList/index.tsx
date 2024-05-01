import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { orderStatusOptionsReturn } from 'src/constants/order.constatns'
import orderService from 'src/services/order.service'
import { formatMoney } from 'src/utils/formatMoney'
import ModalInformation from '../Order/components/ModalInformation'
import { confirmAlert } from 'react-confirm-alert'
const RefundsList = () => {
  const [listData, setListData] = useState<any>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [detail, setDetail] = useState('')

  const queryClient = useQueryClient()
  const { data, isSuccess } = useQuery({
    queryKey: ['ORDER'],
    queryFn: () => {
      return orderService.listReturns()
    }
  })
  useEffect(() => {
    if (isSuccess && data?.data?.orders) {
      const filteredData = data.data.orders || []
      setListData(filteredData)
    }
  }, [data, isSuccess])

  const detailMutation = useMutation(orderService.myOrderDetail, {
    onSuccess: (data) => {
      setDetail(data?.data?.order)
      queryClient.invalidateQueries(['ORDER'])
    }
  })

  const handleedit = (id: string) => {
    detailMutation.mutate(id)
    setIsOpen(true)
  }

  const updateOrderStatusMutation = useMutation(orderService.updateStatus, {
    onSuccess: (_data, variables) => {
      const { id, status } = variables
      queryClient.setQueryData(['ORDER'], (oldData: any) => {
        return {
          ...oldData,
          data: {
            ...oldData.data,
            orders: oldData.data.orders.map((order: any) => {
              if (order._id === id) {
                return { ...order, status }
              }
              return order
            })
          }
        }
      })
    }
  })
  const handleUpdateOrderStatus = (id: string, newStatus: string) => {
    updateOrderStatusMutation.mutate(
      { id, status: newStatus },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['ORDER'])
        }
      }
    )
  }

  const confirmUpdateOrderStatus = (id: string, newStatus: string) => {
    confirmAlert({
      message: 'Bạn có chắc chắn muốn thay đổi trạng thái đơn hàng?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleUpdateOrderStatus(id, newStatus)
        },
        {
          label: 'No'
        }
      ]
    })
  }

  return (
    <div>
      <div>
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
              <tr>
                <th scope='col' className='px-6 py-3 w-[25%]'>
                  Họ và tên
                </th>
                <th scope='col' className='px-6 py-3 w-[20%]'>
                  Địa chỉ
                </th>
                <th scope='col' className='px-6 py-3 '>
                  SĐT
                </th>
                <th scope='col' className='px-6 py-3 w-[30%]'>
                  Phương thức thanh toán
                </th>
                <th scope='col' className='px-6 py-3 w-[15%]'>
                  Tổng tiền
                </th>

                <th scope='col' className='px-6 py-3 w-[3%]'>
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody>
              {listData?.map((order: any, index: number) => (
                <tr className='bg-white border-b' key={index}>
                  <td className='px-6 py-4'>{order?.user?.full_name || '(Trống)'}</td>
                  <td className='px-6 py-4'>{order?.user?.address || '(Trống)'}</td>
                  <td className='px-6 py-4'>{order?.user?.phone || '(Trống)'}</td>
                  <td className='px-6 py-4'>
                    <span>{order.payment_method || '(Trống)'}</span>
                  </td>
                  <td className='px-6 py-4'>
                    <span>{formatMoney(order.total_price) || '(Trống)'}</span>
                  </td>
                  <td className='px-6 py-4'>
                    <select value={order.status} onChange={(e) => confirmUpdateOrderStatus(order._id, e.target.value)}>
                      {orderStatusOptionsReturn.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className='px-6 py-4'>
                    <button
                      onClick={() => {
                        handleedit(order?._id)
                      }}
                      className='font-medium text-blue-600 hover:underline'
                    >
                      Xem
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isOpen && <ModalInformation isOpen={isOpen} setIsOpen={setIsOpen} detail={detail} />}
    </div>
  )
}

export default RefundsList
