import http from 'src/lib/axios'

const BASE_URL = '/products'

const productsService = {
  createProduct(body: any) {
    return http.post(BASE_URL, body)
  },
  deleteProduct(id: string | number) {
    return http.delete(BASE_URL + `/${id}`)
  },
  getAllProducts() {
    return http.get(BASE_URL)
  },
  getProduct(id: string) {
    return http.get(`${BASE_URL}/${id}`)
  }
}

export default productsService
