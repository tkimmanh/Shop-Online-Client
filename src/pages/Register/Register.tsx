import { TRegister } from 'src/types/auth'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import Checkbox from 'src/components/Checkbox'
import Heading from 'src/components/Heading'
import Input from 'src/components/Input'
import { routes } from 'src/routes/routes'
import authService from 'src/services/auth.service'

const Register = () => {
  const { register, handleSubmit } = useForm<TRegister>()
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const registerAccountMutation = useMutation({
    mutationFn: (body: TRegister) => authService.registerAccount(body)
  })
  const onSubmit = async (values: TRegister) => {
    if (!values.full_name || !values.email || !values.password || !values.confirm_password || !values.phone) {
      enqueueSnackbar('Vui lòng nhập đầy đủ thông tin', { variant: 'error' })
      return
    }
    registerAccountMutation.mutate(values, {
      onSuccess: () => {
        enqueueSnackbar('Đăng ký thành công', { variant: 'success' })
        navigate(routes.Login.path)
      }
    })
  }
  return (
    <div className='flex lg:inline-block items-center justify-center'>
      <div className='w-[445px] text-left mx-0'>
        <Heading className='text-4xl my-10'>My account</Heading>
        <h1 className='lg:text-2xl text-xl lg:mt-20 mb-6'>Register</h1>
        <form action='' onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-5'>
            <Input
              className='h-10'
              type='text'
              placeholder='Enter your user name *'
              name='full_name'
              register={register}
            ></Input>
          </div>
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
            <Input
              className='h-10'
              type='password'
              name='confirm_password'
              placeholder='Confirm password*'
              register={register}
            ></Input>
          </div>
          <div className='mb-5'>
            <Input
              className='h-10'
              type='number'
              name='phone'
              placeholder='Your phone number *'
              register={register}
            ></Input>
          </div>
          <div className='mb-5'>
            <Checkbox name='re-member' label='Remember me' className='text-sm'></Checkbox>
          </div>
          <div className='mb-5'>
            <Button isLoading={registerAccountMutation.isLoading} className='w-full py-3 text-xs' kind='secondary'>
              Register
            </Button>
          </div>
        </form>
        <div>
          <Link className='text-sm border-b-2 border-black border-solid' to={routes.Login.path}>
            Do you already have an account ?
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
