import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import Input from 'src/components/Input'
import usersService from 'src/services/users.service'
import ReactSelect from 'react-select'
import Button from 'src/components/Button'
import { yupResolver } from '@hookform/resolvers/yup'

import { userSchema } from 'src/lib/yup/user.schema'

const optionRole = [
  {
    value: 'admin',
    label: 'Admin'
  },
  {
    value: 'user',
    label: 'User'
  },
  {
    value: 'staff',
    label: 'Staff'
  }
]

const DetailUser = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [role, setRole] = useState<any>(null)
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(userSchema)
  })
  const { enqueueSnackbar } = useSnackbar()

  const { data: user } = useQuery({
    queryKey: ['USER'],
    queryFn: () => usersService.detailUser(id as string),
    onSuccess: (data) => {
      reset(data?.data?.result)
      const role = optionRole.find((x: any) => x?.value === data?.data?.result?.role)
      setRole(role)
    }
  })

  useEffect(() => {
    if (user) {
      reset(user?.data?.result)
      const role = optionRole.find((x: any) => x?.value === user?.data?.result?.role)
      setRole(role)
    }
  }, [user, reset])

  const onSubmit = async (values: any) => {
    try {
      await handleeditUser.mutateAsync({ ...values, role: role?.value })
      navigate('/admin/user-list')
    } catch (error) {
      console.log('error:', error)
    }
  }

  const handleeditUser = useMutation({
    mutationFn: (body: any) => {
      return usersService.editUser(id, body)
    },
    onSuccess: () => {
      enqueueSnackbar('edit user successfully', { variant: 'success' })
    }
  })

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} key={JSON.stringify(user?.data?.result)}>
        <div className='grid grid-cols-12'>
          <div className='col-span-5'>
            <p className='mb-[2px]'>Full name</p>
            <Input
              type='text'
              name='full_name'
              register={register}
              placeholder='Full name'
              errorMessage={errors.full_name?.message}
            ></Input>
          </div>
          <div className='col-span-2'></div>
          <div className='col-span-5'>
            <p className='mb-[2px]'>Email</p>
            <Input type='text' name='email' register={register} placeholder='Email'></Input>
          </div>
        </div>
        <div className='grid grid-cols-12'>
          <div className='col-span-5'>
            <p className='mb-[2px]'>Phone</p>
            <Input
              type='text'
              name='phone'
              register={register}
              placeholder='Phone'
              errorMessage={errors.phone?.message}
            ></Input>
          </div>
          <div className='col-span-2'></div>
        </div>
        <div className='grid grid-cols-12'>
          <div className='col-span-5'>
            <p className='mb-[2px]'>Role</p>
            <Controller
              name='role'
              control={control}
              defaultValue={role}
              render={({ field }) => (
                <ReactSelect
                  {...field}
                  options={optionRole}
                  value={role}
                  onChange={(selectedOption) => {
                    setRole(selectedOption)
                    field.onChange(selectedOption)
                  }}
                  placeholder='Select role'
                />
              )}
            />
          </div>
        </div>
        <Button
          isLoading={handleeditUser.isLoading}
          type='submit'
          className='px-10 py-3 text-sm rounded mt-5'
          kind='secondary'
        >
          Lưu
        </Button>
      </form>
    </div>
  )
}

export default DetailUser
