import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Button from 'src/components/Button'
import Checkbox from 'src/components/Checkbox'
import Heading from 'src/components/Heading'
import Input from 'src/components/Input'
import { routes } from 'src/routes/routes'

const Register = () => {
  const { register, handleSubmit } = useForm<any>()
  const onSubmit = (values: { email: string; password: string }) => {
    console.log('values:', values)
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
              name='username'
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
            <Checkbox name='re-member' label='Remember me' className='text-sm'></Checkbox>
          </div>

          <div className='mb-5'>
            <Button className='w-full py-3 text-xs' kind='secondary'>
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
