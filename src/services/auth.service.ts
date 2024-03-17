import http from 'src/lib/axios'
import { TRegister } from 'src/types/auth'
import { TLogin } from 'src/types/auth'

const URL_LOGIN = 'user/sigin'
const URL_REGISTER = 'user/register'
const URL_LOGOUT = 'logout'

const authService = {
  registerAccount(body: TRegister) {
    return http.post(URL_REGISTER, body)
  },
  login(body: TLogin) {
    return http.post(URL_LOGIN, body)
  },
  logout() {
    return http.post(URL_LOGOUT)
  }
}

export default authService
