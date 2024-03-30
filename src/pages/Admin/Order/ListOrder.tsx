import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import Modal from 'src/components/Modal'
import { orderStatusOptions } from 'src/constants/order.constatns'
import orderService from 'src/services/order.service'
import { formatMoney } from 'src/utils/formatMoney'
import moment from 'moment'
import './styles.css'
import ModalInformation from './components/ModalInformation'

function ListOrder() {
  const [isOpen, setIsOpen] = useState(false)
  const [idDetail, setIdDetail] = useState('')

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

  const detail = useMemo(() => {
    return data?.data?.orders.find((_item: any) => _item?._id === idDetail)
  }, [idDetail, data])

  return (
    <div>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-3 w-1/2'>
                Full name
              </th>
              <th scope='col' className='px-6 py-3'>
                Address
              </th>
              <th scope='col' className='px-6 py-3'>
                Phone
              </th>
              <th scope='col' className='px-6 py-3 w-1/2'>
                Products
              </th>
              <th scope='col' className='px-6 py-3 '>
                Payment method
              </th>
              <th scope='col' className='px-6 py-3'>
                Total Price
              </th>
              <th scope='col' className='px-6 py-3 '>
                Status Payment
              </th>
              <th scope='col' className='px-6 py-3 w-20'>
                Status Order
              </th>
              <th scope='col' className='px-6 py-3 w-20'>
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

                <td className='px-6 py-4 w-1/3'>
                  {' '}
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
                <td className='px-6 py-4 w-20'>
                  <select value={order.status} onChange={(e) => handleStatusChange(order._id, e.target.value)}>
                    {orderStatusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className='px-6 py-4'>
                  <button
                    onClick={() => {
                      setIsOpen(true)
                      setIdDetail(order?._id)
                    }}
                    className='font-medium text-blue-600 hover:underline'
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isOpen && <ModalInformation isOpen={isOpen} setIsOpen={setIsOpen} detail={detail} />}
    </div>
  )
}

export default ListOrder
