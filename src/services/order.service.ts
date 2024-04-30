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
  listAdmin(params: any) {
    return http.get(LIST_ORDER, { params })
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
  myOrderDetail(id: string) {
    return http.get(`${BASE_URL}/${id}/detail`)
  },
  updateOrder(body: any) {
    return http.patch(`${BASE_URL}/${body.id}/update`, body)
  },
  deleteOrder(id: string) {
    return http.delete(`${BASE_URL}/${id}/delete`)
  },
  applyCoupon(body: any) {
    return http.post(`${BASE_URL}/apply-coupon`, body)
  },
  listReturns() {
    return http.get(`${BASE_URL}/returns`)
  },
  categorySelling() {
    return http.get(`${BASE_URL}/category-top-selling`)
  },
  topSelling(period: string, date: any) {
    return http.get(`${BASE_URL}/top-selling/${period}?date=${date}`)
  }
}

export default orderService
