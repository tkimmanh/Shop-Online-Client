import http from 'src/lib/axios'

const GET_CURRENT_USER = 'user'
const ADD_TO_CART = 'user/add-to-cart'
const UPDATE_CART = 'user/update-cart'
const DELETE_CART = 'user/delete-cart'

const usersService = {
  getCurrentUser() {
    return http.get(GET_CURRENT_USER)
  },
  edit(body: any) {
    return http.put(`${GET_CURRENT_USER}/edit`, body)
  },
  addToCart(body: any) {
    return http.post(ADD_TO_CART, body)
  },
  updateCart({ product_id, color_id, size_id, quantity }: any) {
    return http.post(UPDATE_CART, { product_id, color_id, size_id, quantity })
  },
  deleteCart({ product_id, color_id, size_id }: any) {
    return http.post(DELETE_CART, { product_id, color_id, size_id })
  }
}

export default usersService
