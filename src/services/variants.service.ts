import http from 'src/lib/axios'

const COLOR_URL = '/colors'
const SIZES_URL = '/sizes'

const variantsService = {
  createSize(body: any) {
    return http.post(SIZES_URL, body)
  },
  createColor(body: any) {
    return http.post(COLOR_URL, body)
  },
  getAllSize() {
    return http.get(SIZES_URL)
  },
  getAllColor() {
    return http.get(COLOR_URL)
  },
  editColor(body: any) {
    return http.put(`${COLOR_URL}/${body.id}`, body)
  },
  editSize(body: any) {
    return http.put(`${SIZES_URL}/${body.id}`, body)
  },
  deleteColor(id: string) {
    return http.delete(`${COLOR_URL}/${id}`)
  },
  deleteSize(id: string) {
    return http.delete(`${SIZES_URL}/${id}`)
  },
  getColor(id: string) {
    return http.get(`${COLOR_URL}/${id}`)
  },
  getSize(id: string) {
    return http.get(`${SIZES_URL}/${id}`)
  }
}

export default variantsService
