import axios, { AxiosError, HttpStatusCode } from 'axios'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}
import { setAccessTokenToLocalStorage } from './localStorage'

export function handleAccessTokenFromURL() {
  const urlParams = new URLSearchParams(window.location.search)
  const accessToken = urlParams.get('access_token')
  if (accessToken) {
    setAccessTokenToLocalStorage(accessToken)
    window.history.pushState({}, document.title, window.location.pathname)
  }
}
