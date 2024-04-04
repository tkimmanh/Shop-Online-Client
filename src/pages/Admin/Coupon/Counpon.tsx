import dayjs from 'dayjs'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { DATE_FORMAT } from 'src/config'
import couponService from 'src/services/coupons.service'
import { useSnackbar } from 'notistack'
import { Link } from 'react-router-dom'
import Button from 'src/components/Button'
import { routes } from 'src/routes/routes'
const Counpon = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { data: coupons } = useQuery({
    queryKey: ['COUPON'],
    queryFn: () => {
      return couponService.list()
    }
  })
  const queryClient = useQueryClient()

  const deleteCouponMutation = useMutation(couponService.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries('COUPON')
    }
  })
  const handleDeleteCoupon = async (id: string | number) => {
    if (confirm('Are you sure you want to delete?')) {
      deleteCouponMutation.mutateAsync(id as string, {
        onSuccess: () => {
          enqueueSnackbar('Xoá thành công', { variant: 'success' })
        }
      })
    }
  }
  return (
    <div>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <div className='flex items-end'>
          <Link to={routes.CouponFormAdd.path} className='text-xs'>
            <Button kind='primary' className='py-2 px-3'>
              Add new Coupon
            </Button>
          </Link>
        </div>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                ID
              </th>
              <th scope='col' className='px-6 py-3'>
                Code
              </th>
              <th scope='col' className='px-6 py-3'>
                Discount
              </th>
              <th scope='col' className='px-6 py-3'>
                Expiration Date
              </th>
              <th scope='col' className='px-6 py-3'>
                Created At
              </th>
              <th scope='col' className='px-6 py-3'>
                <span className='sr-only'>Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {coupons?.data?.result?.map((coupon: any, index: number) => (
              <tr className='bg-white' key={index}>
                <td className='px-6 py-4'>{coupon._id}</td>
                <td className='px-6 py-4'>{coupon.code}</td>
                <td className='px-6 py-4'>{coupon.discount}%</td>
                <td className='px-6 py-4'>
                  {dayjs(coupon.expiration_date).format(DATE_FORMAT.DDMMYYYYHHmmss) || '(trống)'}
                </td>
                <td className='px-6 py-4'>{dayjs(coupon.createdAt).format(DATE_FORMAT.DDMMYYYYHHmmss) || '(trống)'}</td>
                <td className='px-6 py-4'>{coupon.is_active}</td>

                <td className='px-6 py-4 flex gap-x-5 text-right'>
                  <button
                    className='font-medium text-red-600 ml-[10px] hover:underline cursor-pointer'
                    onClick={() => handleDeleteCoupon(coupon?._id)}
                  >
                    Delete
                  </button>
                  <Link to={`/admin/form-coupon/${coupon._id}`} className='font-medium text-blue-600 hover:underline'>
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Counpon
