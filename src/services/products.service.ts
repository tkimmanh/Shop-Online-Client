import http from 'src/lib/axios'

const BASE_URL = '/products'

const productsService = {
  createProduct(body: any) {
    return http.post(BASE_URL, body)
  },
  deleteProduct(id: string | number) {
    return http.delete(BASE_URL + `/${id}`)
  },
  editProduct(body: any, id?: string) {
    return http.put(BASE_URL + `/${id}`, body)
  },
  getAllProducts() {
    return http.get(BASE_URL)
  },
  getProduct(id: string) {
    return http.get(`${BASE_URL}/${id}`)
  },
  addReview(productId: string, review: { star: number }) {
    return http.post(`${BASE_URL}/${productId}/reviews`, review)
  }
}

export default productsService
