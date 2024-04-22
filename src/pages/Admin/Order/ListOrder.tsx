import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { confirmAlert } from 'react-confirm-alert'
import { messageOrder, orderStatusAdminOptions, orderStatusOptions } from 'src/constants/order.constatns'
import orderService from 'src/services/order.service'
import { formatMoney } from 'src/utils/formatMoney'
import './styles.css'
import ModalInformation from './components/ModalInformation'
import Input from 'src/components/Input'
import { useForm } from 'react-hook-form'

function ListOrder() {
  const [isOpen, setIsOpen] = useState(false)
  const [detail, setDetail] = useState('')
  const [sort, setSort] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const queryClient = useQueryClient()
  const { register, watch } = useForm()
  const search = watch('search')
  const { data, refetch } = useQuery(
    ['orders', selectedStatus],
    () => orderService.listAdmin({ status: selectedStatus, sort, search: search }),
    { keepPreviousData: true }
  )

  const updateOrderStatusMutation = useMutation(orderService.updateStatus, {
    onSuccess: (_data, variables) => {
      const { id, status } = variables
      queryClient.setQueryData(['orders', selectedStatus], (oldData: any) => {
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

  useEffect(() => {
    refetch()
  }, [selectedStatus, search, refetch])
  const getOptionsWithDefault = (currentStatus: any) => {
    const statusExists = orderStatusAdminOptions.some((option) => option.value === currentStatus)
    if (!statusExists && currentStatus) {
      return [...orderStatusAdminOptions, { label: currentStatus, value: currentStatus }]
    }
    return orderStatusAdminOptions
  }
  return (
    <div>
      <div className='flex items-center'>
        <div className='w-[70%]'>
          <label htmlFor='status-select' className='block text-sm font-medium text-gray-700'>
            Filter by status
          </label>
          <select
            id='status-select'
            className='mb-5 block border w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value)
              refetch()
            }}
          >
            <option value=''>All Statuses</option>
            {Object.entries(messageOrder).map(([key, value]) => (
              <option key={key} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className='w-[35%]'>
          <Input
            type='text'
            className='pl-3 pr-10 py-2 flex items-center border-gray-300 '
            name='search'
            placeholder='Search name user'
            register={register}
          ></Input>
        </div>
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
                <td className='px-6 py-4'>{order?.user?.full_name || '(Trống)'}</td>
                <td className='px-6 py-4'>{order?.user?.address || '(Trống)'}</td>
                <td className='px-6 py-4'>{order?.user?.phone || '(Trống)'}</td>

                <td className='px-6 py-4 w-1/3'>
                  {order.products.map((product: any, productIndex: number) => (
                    <div key={productIndex}>
                      {product?.product?.title || '(Trống)'} - {product?.color?.name || '(Trống)'} -{' '}
                      {product?.size?.name || '(Trống)'} x {product?.quantity || '(Trống)'}
                    </div>
                  ))}
                </td>
                <td className='px-6 py-4'>
                  <span>{order.payment_method || '(Trống)'}</span>
                </td>
                <td className='px-6 py-4'>
                  <span>{formatMoney(order.total_price) || '(Trống)'}</span>
                </td>
                <td className='px-6 py-4 w-20'>
                  <select
                    value={order.status}
                    onChange={(e) => confirmUpdateOrderStatus(order._id, e.target.value)}
                    className='border-2 rounded py-2'
                  >
                    {getOptionsWithDefault(order.status).map((option) => (
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
