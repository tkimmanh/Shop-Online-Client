import http from 'src/lib/axios'

const BASE_URL = '/order'
const LIST_ORDER = '/order/list-orders'
const orderService = {
  create(body: any) {
    return http.post(BASE_URL, body)
  },
  listAdmin() {
    return http.get(LIST_ORDER)
  },
  updateStatus(body: any) {
    return http.patch(`${BASE_URL}/${body.id}/update-status-order`, body)
  }
}

export default orderService
