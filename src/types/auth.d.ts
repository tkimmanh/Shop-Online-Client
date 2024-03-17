import { ErrorResponse } from 'react-router-dom'

export type TRegister = {
  email: string
  confirm_password: string
  password: string
  full_name: string
  phone: string
}

export type TLogin = Pick<TRegister, 'email' | 'password'>

export type TUser = {
  _id: string
  full_name: string
  role: string
  email: string
  phone: number
  wishlist: string[]
  createdAt: string
  updatedAt: string
  cart: string[]
  address: string
}
export type AuthResponse = SuccessResponse<{
  message: string
  access_token: string
  userObject: TUser
}>

export type ErrorAuth = ErrorResponse<{
  message: string
}>
export interface SuccessResponse<Data> {
  message: string
  access_token?: string
  data: Data
}

export interface ErrorResponse<Data> {
  message: string
  data?: Data
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}
