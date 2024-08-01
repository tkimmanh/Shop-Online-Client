import { useSnackbar } from 'notistack'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { FaGoogle } from 'react-icons/fa'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import Button from 'src/components/Button'
import Checkbox from 'src/components/Checkbox'
import Heading from 'src/components/Heading'
import Input from 'src/components/Input'
import { AppContext } from 'src/context/app.context'
import { loginSchema } from 'src/lib/yup/login.schema'
import { routes } from 'src/routes/routes'
import authService from 'src/services/auth.service'
import { TLogin } from 'src/types/auth'
import { ErrorResponse } from 'src/types/utils'
import { isAxiosUnprocessableEntityError } from 'src/utils/common'
import { yupResolver } from '@hookform/resolvers/yup'

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<TLogin>({
    resolver: yupResolver(loginSchema)
  })
  const { enqueueSnackbar } = useSnackbar()
  const { setIsAuthenticated } = useContext(AppContext)
  const { VITE_CLIENT_GOOGLE_ID, VITE_GOOGLE_REDIRECT_URI } = import.meta.env

  const getGoogleAuthUrl = () => {
    const url = 'https://accounts.google.com/o/oauth2/v2/auth'
    const query = {
      client_id: VITE_CLIENT_GOOGLE_ID,
      redirect_uri: VITE_GOOGLE_REDIRECT_URI,
      response_type: 'code',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ].join(' '),
      prompt: 'consent',
      access_type: 'offline'
    }
    const queryString = new URLSearchParams(query).toString()

    return `${url}?${queryString}`
  }

  const loginAccountMutation = useMutation({
    mutationFn: (body: TLogin) => authService.login(body)
  })
  const onSubmit = (values: TLogin) => {
    if (!values.email || !values.password) {
      enqueueSnackbar('Vui lòng nhập email và mật khẩu', { variant: 'error' })
      return
    }
    loginAccountMutation.mutate(values, {
      onSuccess: () => {
        enqueueSnackbar('Đăng nhập thành công', { variant: 'success' })
        setIsAuthenticated(true)
        window.location.href = routes.Home.path
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<TLogin>>(error)) {
          const formError = error.response?.data as any
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as any, {
                message: formError[key] as any,
                type: 'Server'
              })
            })
          }
        }
      }
    })
  }
  const googleOauthUrl = getGoogleAuthUrl()

  return (
    <div className='flex lg:inline-block items-center justify-center'>
      <div className='w-[445px] text-left mx-0 md:px-6'>
        <Heading className='text-4xl my-10'>My account</Heading>
        <h1 className='lg:text-2xl text-xl lg:mt-20 mb-6'>Login</h1>
        <form action='' onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-5'>
            <Input
              defaultValue={'admin@gmail.com'}
              className='h-10'
              type='text'
              placeholder='Enter your email adress *'
              name='email'
              register={register}
              errorMessage={errors.email?.message}
            ></Input>
          </div>
          <div className='mb-5'>
            <Input
              defaultValue={'123456'}
              className='h-10'
              type='password'
              name='password'
              placeholder='Password*'
              register={register}
              errorMessage={errors.password?.message}
            ></Input>
          </div>
          <div className='mb-5'>
            <Checkbox name='re-member' label='Remember me' className='text-sm'></Checkbox>
          </div>
          <div className='mb-2'>
            <Button className='w-full py-3 text-xs' kind='secondary'>
              Login
            </Button>
          </div>
        </form>
        <Link to={googleOauthUrl}>
          <Button className='w-full py-3 text-[10px] flex items-center justify-center gap-x-4' kind='primary'>
            Login with google <FaGoogle />
          </Button>
        </Link>
        <div className='mt-5'>
          <Link className='text-sm border-b-2 border-black border-solid' to={routes.Register.path}>
            Do not have an account ?
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
