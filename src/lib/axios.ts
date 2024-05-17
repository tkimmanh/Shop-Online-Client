import { clearLocalStorage, getAccessTokenFromLocalStorage, setAccessTokenToLocalStorage } from 'src/utils/localStorage'
import axios, { AxiosInstance, AxiosError, HttpStatusCode } from 'axios'
import { routes } from 'src/routes/routes'
import { AuthResponse } from 'src/types/auth'
import { enqueueSnackbar } from 'notistack'

const BASE_URL = 'http://localhost:8001/'

function createHttpInstance(): AxiosInstance {
  const accessToken = getAccessTokenFromLocalStorage()

  const instance = axios.create({
    baseURL: BASE_URL
  })

  instance.interceptors.request.use(
    (config) => {
      if (accessToken && config.headers) {
        config.headers.authorization = `Bearer ${accessToken}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    (response) => {
      const { url } = response.config
      if (url === `user${routes.Login.path}`) {
        const data = response.data as AuthResponse
        const newAccessToken = data?.access_token
        setAccessTokenToLocalStorage(newAccessToken as string)
      } else if (url === '/logout') {
        window.location.href = routes.Login.path
        clearLocalStorage()
      }
      return response
    },
    (error: AxiosError) => {
      if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
        const data: any | undefined = error.response?.data
        const message = data?.message || error?.message
        enqueueSnackbar(message, { variant: 'error' })
      }
      return Promise.reject(error)
    }
  )

  return instance
}

const http = createHttpInstance()

export default http
