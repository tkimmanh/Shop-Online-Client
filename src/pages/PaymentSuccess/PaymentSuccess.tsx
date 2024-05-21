import dayjs from 'dayjs'
import { enqueueSnackbar } from 'notistack'
import { useContext, useEffect } from 'react'
import { useQuery } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { DATE_FORMAT } from 'src/config'
import { AppContext } from 'src/context/app.context'
import { routes } from 'src/routes/routes'

import orderService from 'src/services/order.service'
import { formatMoney } from 'src/utils/formatMoney'

const PaymentSuccessPage = () => {
  const location = useLocation()
  const { setCartChanged, cartChanged } = useContext(AppContext)
  const queryParams = new URLSearchParams(location.search)
  const navigate = useNavigate()
  const orderId = queryParams.get('vnp_TxnRef')
  const vnpResponseCode = queryParams.get('vnp_ResponseCode')
  const vnpAmount = queryParams.get('vnp_Amount')
  const vnpBankCode = queryParams.get('vnp_BankCode')
  const vnpBankTranNo = queryParams.get('vnp_BankTranNo')
  const vnpCardType = queryParams.get('vnp_CardType')
  const vnpOrderInfo = queryParams.get('vnp_OrderInfo')
  const vnpPayDate = queryParams.get('vnp_PayDate')
  const vnpTransactionNo = queryParams.get('vnp_TransactionNo')
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
    () =>
      orderService.paymentSuccess({
        vnp_TxnRef: orderId,
        vnp_ResponseCode: vnpResponseCode,
        vnp_Amount: vnpAmount,
        vnp_BankCode: vnpBankCode,
        vnp_BankTranNo: vnpBankTranNo,
        vnp_CardType: vnpCardType,
        vnp_OrderInfo: vnpOrderInfo,
        vnp_PayDate: vnpPayDate,
        vnp_TransactionNo: vnpTransactionNo
      }),
    {
      enabled: !!orderId && !!vnpResponseCode,
      onSuccess: () => {
        enqueueSnackbar('Thanh toán thành công', { variant: 'success' })
        setCartChanged(!cartChanged)
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
        <h1 className='text-center text-2xl font-semibold mt-10 mb-20'>
          {vnpResponseCode === '00' ? 'Thanh toán thành công' : 'Thanh toán thất bại'}
        </h1>
        <div className='flex items-center flex-col gap-y-5'>
          {vnpResponseCode === '00' && (
            <>
              <p>Số tiền: {formatMoney(parseInt(vnpAmount as string) / 100) || 0}</p>
              <p>Ngân hàng: {vnpBankCode}</p>
              <p>Mã giao dịch ngân hàng: {vnpBankTranNo}</p>
              <p>Loại thẻ: {vnpCardType}</p>
              <p>Thông tin đơn hàng: {vnpOrderInfo}</p>
              <p>Thời gian thanh toán: {dayjs(vnpPayDate).format(DATE_FORMAT.DDMMYYYYHHmmss)}</p>
              <p>Mã giao dịch: {vnpTransactionNo}</p>
            </>
          )}
        </div>
      </p>
    </div>
  )
}

export default PaymentSuccessPage
