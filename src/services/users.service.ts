import http from 'src/lib/axios'

const GET_CURRENT_USER = 'user'

const usersService = {
  getCurrentUser() {
    return http.get(GET_CURRENT_USER)
  }
}

export default usersService
