import http from 'src/lib/axios'

const billService = {
  getBillAdmin({ orderId }: { orderId: string }) {
    return http.get(`/bill/admin/${orderId}`)
  },
  getBillUser() {
    return http.get('/bill/user')
  }
}
export default billService
