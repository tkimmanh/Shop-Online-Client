import http from 'src/lib/axios'

const GET_CURRENT_USER = 'user'
const ADD_TO_CART = 'user/add-to-cart'
const usersService = {
  getCurrentUser() {
    return http.get(GET_CURRENT_USER)
  },
  addToCart(body: any) {
    return http.post(ADD_TO_CART, body)
  }
}

export default usersService
