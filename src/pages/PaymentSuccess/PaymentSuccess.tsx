import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { routes } from 'src/routes/routes'

import orderService from 'src/services/order.service'

const PaymentSuccessPage = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const navigate = useNavigate()
  const orderId = queryParams.get('vnp_TxnRef')
  const vnpResponseCode = queryParams.get('vnp_ResponseCode')
  useEffect(() => {
    if (!orderId || !vnpResponseCode) {
      navigate(routes.Home.path)
    }
    if (vnpResponseCode == '24') {
      enqueueSnackbar('Quá trình thanh toán đã được hủy bỏ', { variant: 'warning' })
      navigate(routes.CartPayment.path)
    }
    if (vnpResponseCode !== '00' && vnpResponseCode !== '24') {
      enqueueSnackbar('Thanh toán thất bại', { variant: 'error' })
      navigate(routes.CartPayment.path)
    }
  }, [orderId, vnpResponseCode, navigate])
  useQuery(
    ['paymentSuccess', orderId, vnpResponseCode],
    () => orderService.paymentSuccess(orderId as any, vnpResponseCode as any),
    {
      enabled: !!orderId && !!vnpResponseCode,
      onSuccess: () => {
        enqueueSnackbar('Thanh toán thành công', { variant: 'success' })
      },
      retry: false, // Không tự động thử lại khi gặp lỗi
      staleTime: Infinity, // Thời gian dữ liệu bị lỗi sẽ được lấy lại
      cacheTime: 0, // Không lưu cache
      refetchOnWindowFocus: false, // Không refetch khi window được focus lại
      refetchOnReconnect: false // Không refetch khi có kết nối mạng trở lại
    }
  )

  return (
    <div>
      <p className=''>
        <h1 className='text-center text-2xl font-semibold my-20'>Hoàn tất quá trình thanh toán</h1>
      </p>
    </div>
  )
}

export default PaymentSuccessPage
