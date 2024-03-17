import { useSnackbar } from 'notistack'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import Button from 'src/components/Button'
import Checkbox from 'src/components/Checkbox'
import Heading from 'src/components/Heading'
import Input from 'src/components/Input'
import { AppContext } from 'src/context/app.context'
import { routes } from 'src/routes/routes'
import authService from 'src/services/auth.service'
import { TLogin } from 'src/types/auth'
import { ErrorResponse } from 'src/types/utils'
import { isAxiosUnprocessableEntityError } from 'src/utils/common'

const Login = () => {
  const { register, handleSubmit, setError } = useForm<TLogin>()
  const { enqueueSnackbar } = useSnackbar()
  const { setIsAuthenticated } = useContext(AppContext)
  const loginAccountMutation = useMutation({
    mutationFn: (body: TLogin) => authService.login(body)
  })
  const onSubmit = (values: TLogin) => {
    loginAccountMutation.mutate(values, {
      onSuccess: () => {
        enqueueSnackbar('Đăng nhập thành công', { variant: 'success' })
        setIsAuthenticated(true)
        window.location.href = routes.Home.path
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<TLogin>>(error)) {
          const formError = error.response?.data
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
  return (
    <div className='flex lg:inline-block items-center justify-center'>
      <div className='w-[445px] text-left mx-0 md:px-6'>
        <Heading className='text-4xl my-10'>My account</Heading>
        <h1 className='lg:text-2xl text-xl lg:mt-20 mb-6'>Login</h1>
        <form action='' onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-5'>
            <Input
              className='h-10'
              type='text'
              placeholder='Enter your email adress *'
              name='email'
              register={register}
            ></Input>
          </div>
          <div className='mb-5'>
            <Input className='h-10' type='password' name='password' placeholder='Password*' register={register}></Input>
          </div>
          <div className='mb-5'>
            <Checkbox name='re-member' label='Remember me' className='text-sm'></Checkbox>
          </div>
          <div className='mb-5'>
            <Button className='w-full py-3 text-xs' kind='secondary'>
              Login
            </Button>
          </div>
        </form>
        <div>
          <Link className='text-sm border-b-2 border-black border-solid' to={routes.Register.path}>
            Do not have an account ?
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
