import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import orderService from 'src/services/order.service'

const PaymentSuccessPage = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  useEffect(() => {
    const orderId = queryParams.get('vnp_TxnRef')
    if (orderId) {
      orderService.paymentSuccess(orderId).then(() => {
        enqueueSnackbar('Thanh toán thành công', { variant: 'success' })
      })
    }
  }, [location])

  return (
    <div>
      <p className=''>
        <h1 className='text-center text-2xl font-semibold my-20'>Thanh toán thành công</h1>
      </p>
    </div>
  )
}

export default PaymentSuccessPage
