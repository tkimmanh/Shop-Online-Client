import { instance } from 'src/lib/axios'

const URL_LOGIN = 'login'
const URL_REGISTER = 'register'
const URL_LOGOUT = 'logout'

const authService = {
  registerAccount(body: { username: string; password: string }) {
    return instance.post(URL_REGISTER, body)
  },
  login(body: { username: string; password: string }) {
    return instance.post(URL_LOGIN, body)
  },
  logout() {
    return instance.post(URL_LOGOUT)
  }
}

export default authService
