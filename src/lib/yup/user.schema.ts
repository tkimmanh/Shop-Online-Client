import { VALIDATE_MESSAGES } from 'src/config'
import * as yup from 'yup'

export const userSchema = yup.object().shape({
  email: yup.string().required(VALIDATE_MESSAGES.REQUIRED).email(VALIDATE_MESSAGES.EMAIL),
  full_name: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
  phone: yup
    .string()
    .required(VALIDATE_MESSAGES.REQUIRED)
    .matches(/^[0-9]+$/, VALIDATE_MESSAGES.PHONE),
  role: yup.string().required(VALIDATE_MESSAGES.REQUIRED)
})
