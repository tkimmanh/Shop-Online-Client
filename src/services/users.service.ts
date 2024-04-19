import http from 'src/lib/axios'

const BASE_URL = 'user'
const ADD_TO_CART = 'user/add-to-cart'
const UPDATE_CART = 'user/update-cart'
const DELETE_CART = 'user/delete-cart'
const DETAIL_USER = 'user/get-by-admin'
const EDIT_USER = 'user/edit-by-admin'

const usersService = {
  getAllUser() {
    return http.get(`${BASE_URL}/all-users`)
  },
  getCurrentUser() {
    return http.get(BASE_URL)
  },
  edit(body: any) {
    return http.put(`${BASE_URL}/edit`, body)
  },
  detailUser(id: any) {
    return http.get(`${DETAIL_USER}/${id}`)
  },
  editUser(id: any, body: any) {
    return http.put(`${EDIT_USER}/${id}`, body)
  },
  addToCart(body: any) {
    return http.post(ADD_TO_CART, body)
  },
  updateCart({ product_id, color_id, size_id, quantity }: any) {
    return http.post(UPDATE_CART, { product_id, color_id, size_id, quantity })
  },
  deleteCart({ product_id, color_id, size_id }: any) {
    return http.post(DELETE_CART, { product_id, color_id, size_id })
  },
  getEmails() {
    return http.get(`${BASE_URL}/email`)
  },
  sendEmailToAll(body: any) {
    return http.post(`${BASE_URL}/send-email-to-all`, body)
  },
  delete(id: string) {
    return http.delete(`${BASE_URL}/delete-by-admin/${id}`)
  }
}

export default usersService
