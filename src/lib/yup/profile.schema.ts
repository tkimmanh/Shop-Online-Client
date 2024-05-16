import { VALIDATE_MESSAGES } from 'src/config'
import * as yup from 'yup'

export const profileSchema = yup.object().shape({
  full_name: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
  phone: yup
    .string()
    .required(VALIDATE_MESSAGES.REQUIRED)
    .matches(/^[0-9]+$/, VALIDATE_MESSAGES.PHONE),
  address: yup.string().required(VALIDATE_MESSAGES.REQUIRED)
})
