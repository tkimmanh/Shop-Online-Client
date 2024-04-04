import http from 'src/lib/axios'

const BASE_URL = '/coupon'

const couponService = {
  create(body: any) {
    return http.post(`${BASE_URL}/create`, body)
  },
  list() {
    return http.get(BASE_URL)
  },
  update(body: any) {
    return http.put(`${BASE_URL}/${body.id}`, body)
  },
  getById(id: string) {
    return http.get(`${BASE_URL}/${id}`)
  },
  delete(id: string) {
    return http.delete(`${BASE_URL}/${id}`)
  }
}
export default couponService
