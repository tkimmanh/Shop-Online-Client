import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { messageOrder } from 'src/constants/order.constatns'
import orderService from 'src/services/order.service'
import { formatMoney } from 'src/utils/formatMoney'
import ModalInformation from '../Order/components/ModalInformation'

const RefundsList = () => {
  const [listData, setListData] = useState<any>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [detail, setDetail] = useState('')

  const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: ['CATEGORY'],
    queryFn: () => {
      return orderService.listAdmin('')
    },
    onSuccess: () => {
      setListData(data?.data?.orders.filter((item: any) => item.status === messageOrder.USER_RETURN_ORDER))
    }
  })

  const detailMutation = useMutation(orderService.myOrderDetail, {
    onSuccess: (data) => {
      setDetail(data?.data?.order)
      setIsOpen(true)
      queryClient.invalidateQueries(['ORDER'])
    }
  })

  const handleEdit = (id: string) => {
    detailMutation.mutate(id)
  }

  return (
    <div>
      <div>
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
              <tr>
                <th scope='col' className='px-6 py-3 w-[25%]'>
                  Full name
                </th>
                <th scope='col' className='px-6 py-3 w-[20%]'>
                  Address
                </th>
                <th scope='col' className='px-6 py-3 w-[10%]'>
                  Phone
                </th>
                <th scope='col' className='px-6 py-3 w-[25%]'>
                  Products
                </th>
                <th scope='col' className='px-6 py-3 w-[15%]'>
                  Total Price
                </th>
                <th scope='col' className='px-6 py-3 w-[3%]'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {listData?.map((order: any, index: number) => (
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
                    <span>{formatMoney(order.total_price) || '(Trống)'}</span>
                  </td>
                  <td className='px-6 py-4'>
                    <button
                      onClick={() => {
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
      </div>
      {isOpen && <ModalInformation isOpen={isOpen} setIsOpen={setIsOpen} detail={detail} />}
    </div>
  )
}

export default RefundsList
