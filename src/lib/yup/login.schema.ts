import { VALIDATE_MESSAGES } from 'src/config'
import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  username: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
  password: yup.string().required(VALIDATE_MESSAGES.REQUIRED)
})
