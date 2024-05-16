import { VALIDATE_MESSAGES } from 'src/config'
import * as yup from 'yup'

export const registerSchema = yup.object().shape({
  email: yup.string().required(VALIDATE_MESSAGES.REQUIRED).email(VALIDATE_MESSAGES.EMAIL),
  password: yup.string().required(VALIDATE_MESSAGES.REQUIRED).min(6, VALIDATE_MESSAGES.MIN_PASSWORD),
  full_name: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
  phone: yup
    .string()
    .required(VALIDATE_MESSAGES.REQUIRED)
    .matches(/^[0-9]+$/, 'Số điện thoại không hợp lệ')
})
