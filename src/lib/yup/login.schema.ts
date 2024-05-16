import { VALIDATE_MESSAGES } from 'src/config'
import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  email: yup.string().required(VALIDATE_MESSAGES.REQUIRED).email(VALIDATE_MESSAGES.EMAIL),
  password: yup.string().required(VALIDATE_MESSAGES.REQUIRED).min(6, VALIDATE_MESSAGES.MIN_PASSWORD)
})
