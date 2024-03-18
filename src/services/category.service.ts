import http from 'src/lib/axios'

const BASE_URL = '/category'

const categoryService = {
  getAllCategory() {
    return http.get(BASE_URL)
  }
}

export default categoryService
