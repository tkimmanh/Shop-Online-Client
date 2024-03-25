import http from 'src/lib/axios'

const BASE_URL = '/order'
const LIST_ORDER = '/order/list-orders'
const MY_ORDER = '/order/my-order'
const REVENUE = '/order/revenue/monthly'
const orderService = {
  getRevenue() {
    return http.get(REVENUE)
  },
  create(body: any) {
    return http.post(BASE_URL, body)
  },
  listAdmin() {
    return http.get(LIST_ORDER)
  },
  updateStatus(body: any) {
    return http.patch(`${BASE_URL}/${body.id}/update-status-order`, body)
  },
  paymentSuccess(orderId: string) {
    return http.get(`/order/payment-success?vnp_TxnRef=${orderId}`)
  },
  myOrder() {
    return http.get(MY_ORDER)
  },
  updateOrder(id: string, body: any) {
    return http.patch(`${BASE_URL}/${id}/update`, body)
  },
  deleteOrder(id: string) {
    return http.delete(`${BASE_URL}/${id}/delete`)
  }
}

export default orderService
