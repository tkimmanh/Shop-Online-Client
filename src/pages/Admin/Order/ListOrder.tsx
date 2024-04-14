import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { confirmAlert } from 'react-confirm-alert'
import { orderStatusOptions } from 'src/constants/order.constatns'
import orderService from 'src/services/order.service'
import { formatMoney } from 'src/utils/formatMoney'
import './styles.css'
import ModalInformation from './components/ModalInformation'

function ListOrder() {
  const [isOpen, setIsOpen] = useState(false)
  const [detail, setDetail] = useState('')
  const [sort, setSort] = useState('')
  const [search, setSearch] = useState('')

  const { data } = useQuery(['ORDER', { sort, search }], () => {
    return orderService.listAdmin({ sort, search })
  })

  const queryClient = useQueryClient()
  const updateOrderStatusMutation = useMutation(orderService.updateStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries(['ORDER'])
    }
  })

  const detailMutation = useMutation(orderService.myOrderDetail, {
    onSuccess: (data) => {
      setDetail(data?.data?.order)
      setIsOpen(true)
      queryClient.invalidateQueries(['ORDER'])
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
      message: 'Are you sure you want to update this order status?',
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

  const handleEdit = (id: string) => {
    detailMutation.mutate(id)
  }

  return (
    <div>
      <div>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value='newest'>Latest</option>
          <option value='oldest'>Oldest</option>
        </select>
        <input
          type='text'
          placeholder='Tìm kiếm theo tên...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Full name
              </th>
              <th scope='col' className='px-6 py-3 w-1/2'>
                Address
              </th>
              <th scope='col' className='px-6 py-3'>
                Phone
              </th>
              <th scope='col' className='px-6 py-3 w-2/3'>
                Products
              </th>
              <th scope='col' className='px-6 py-3 '>
                Payment method
              </th>
              <th scope='col' className='px-6 py-3'>
                Total Price
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

                <td className='px-6 py-4 w-1/3'>
                  {order.products.map((product: any, productIndex: number) => (
                    <div key={productIndex}>
                      {product?.product?.title} - {product?.color?.name} - {product?.size?.name} x {product?.quantity}
                    </div>
                  ))}
                </td>
                <td className='px-6 py-4'>
                  <span>{order.payment_method}</span>
                </td>
                <td className='px-6 py-4'>
                  <span>{formatMoney(order.total_price)}</span>
                </td>
                <td className='px-6 py-4 w-20'>
                  <select value={order.status} onChange={(e) => confirmUpdateOrderStatus(order._id, e.target.value)}>
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
                      // setIsOpen(true)
                      handleEdit(order?._id)
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
