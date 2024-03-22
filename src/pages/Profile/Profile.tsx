import { enqueueSnackbar } from 'notistack'
import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'
import Input from 'src/components/Input'
import { AppContext } from 'src/context/app.context'
import usersService from 'src/services/users.service'
import { TUser } from 'src/types/auth'

const Profile = () => {
  const { user } = useContext(AppContext)
  const { reset, handleSubmit, register } = useForm()
  useEffect(() => {
    reset(user as TUser)
  }, [])
  const updateProfileMutation = useMutation({
    mutationFn: (body: any) => usersService.edit({ _id: user?._id, ...body })
  })
  const hanldeUpdateUserProfile = (values: any) => {
    const { confirm_password, ...updateValues } = values
    updateProfileMutation.mutate(updateValues, {
      onSuccess: () => {
        enqueueSnackbar('Cập nhật thông tin thành công', { variant: 'success' })
      }
    })
  }
  return (
    <div className='mt-10 w-full'>
      <Heading className='text-2xl text-center mb-2'>Profile</Heading>
      <div className='flex items-center flex-col justify-center'>
        <form className='w-[400px]' action='' onSubmit={handleSubmit(hanldeUpdateUserProfile)}>
          <Input type='text' name='full_name' register={register} placeholder='Enter your full name *'></Input>
          <Input
            className='mb-1'
            type='number'
            name='phone'
            register={register}
            placeholder='Enter your phone *'
          ></Input>
          <Input type='text' name='address' register={register} placeholder='Enter your address *'></Input>
          <Input
            type='password'
            name='old_password'
            register={register}
            placeholder='Enter your old password *'
          ></Input>
          <Input
            className='mb-1'
            type='password'
            name='password'
            register={register}
            placeholder='Enter your new password *'
          ></Input>

          <Button type='submit' kind='secondary' className='px-10 py-3 text-xs'>
            Update Infor
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Profile
