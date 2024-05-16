import { VALIDATE_MESSAGES } from 'src/config'
import * as yup from 'yup'

export const productsSchema = yup.object().shape({
  title: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
  price: yup.string().required(VALIDATE_MESSAGES.REQUIRED).min(0, VALIDATE_MESSAGES.PRICE),
  quantity: yup.string().required(VALIDATE_MESSAGES.REQUIRED).min(0, VALIDATE_MESSAGES.QUANTITY),
  category: yup
    .object()
    .shape({
      value: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
      label: yup.string().required(VALIDATE_MESSAGES.REQUIRED)
    })
    .nullable()
    .required(VALIDATE_MESSAGES.REQUIRED)
})
