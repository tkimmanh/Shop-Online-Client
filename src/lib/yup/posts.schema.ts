import { VALIDATE_MESSAGES } from 'src/config'
import * as yup from 'yup';

export const postsSchema = yup.object().shape({
  title: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
  author: yup.object().nullable().required(VALIDATE_MESSAGES.REQUIRED),
  topic: yup.object().nullable().required(VALIDATE_MESSAGES.REQUIRED),
  content: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
});