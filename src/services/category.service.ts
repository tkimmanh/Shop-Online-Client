import http from 'src/lib/axios'

const BASE_URL = '/category'

const categoryService = {
  createCategoies(body: any) {
    return http.post(BASE_URL, body)
  },
  getAllCategoies() {
    return http.get(BASE_URL)
  },
  getCategory(id: string) {
    return http.get(`${BASE_URL}/${id}`)
  },
  editCategory(body: any) {
    return http.put(`${BASE_URL}/${body.id}`, body)
  },
  deleteCategory(id: string) {
    return http.delete(`${BASE_URL}/${id}`)
  }
}

export default categoryService
