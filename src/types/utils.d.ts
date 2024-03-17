import { AxiosError } from 'axios'
import HttpStatusCode from 'src/constants/httpEnumStatus'

export interface SuccessResponse<Data> {
  message: string
  data: Data
}

export interface ErrorResponse<Data> {
  message?: string
  data?: Data
}
