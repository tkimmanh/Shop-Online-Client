import http from 'src/lib/axios'

const BASE_URL = '/products'

const productsService = {
  createProduct(body: any) {
    return http.post(BASE_URL, body)
  }
}

export default productsService
