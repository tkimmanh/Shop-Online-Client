import { enqueueSnackbar } from 'notistack'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import orderService from 'src/services/order.service'

const PaymentSuccessPage = () => {
  const location = useLocation()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const orderId = queryParams.get('vnp_TxnRef')
    if (orderId) {
      orderService.paymentSuccess(orderId).then(() => {
        enqueueSnackbar('Thanh toán thành công', { variant: 'success' })
      })
    }
  }, [location])

  return (
    <div>
      <h1 className='text-center text-2xl font-semibold my-20'>Payment sucess</h1>
    </div>
  )
}

export default PaymentSuccessPage
