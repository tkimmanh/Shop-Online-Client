import axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT_URL,
  timeout: 5000,
  withCredentials: true
})

instance.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)
