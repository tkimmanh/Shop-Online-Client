import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import Input from 'src/components/Input'
import usersService from 'src/services/users.service'
import ReactSelect from 'react-select'
import Button from 'src/components/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import { profileSchema } from 'src/lib/yup/profile.schema'

const optionRole = [
  {
    value: 'admin',
    label: 'Admin'
  },
  {
    value: 'user',
    label: 'User'
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
    formState: { errors }
  } = useForm({
    resolver: yupResolver(profileSchema)
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

  const handleeditUser = useMutation({
    mutationFn: (body: any) => usersService.editUser(id, body),
    onSuccess: () => {
      enqueueSnackbar('edit user successfuly', { variant: 'success' })
    }
  })

  const onSubmit = async (data: any) => {
    const formData = new FormData()
    formData.append('full_name', data.full_name)
    formData.append('email', data.email)
    formData.append('phone', data.phone)
    formData.append('address', data.address)
    formData.append('role', role?.value)
    try {
      await handleeditUser.mutateAsync(formData)
      navigate('/admin/user-list')
    } catch (error) {
      console.log('error:', error)
    }
  }

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
          <div className='col-span-5'>
            <p className='mb-[2px]'>Address</p>
            <Input
              type='text'
              name='address'
              register={register}
              placeholder='Address'
              errorMessage={errors.address?.message}
            ></Input>
          </div>
        </div>
        <div className='grid grid-cols-12'>
          <div className='col-span-5'>
            <p className='mb-[2px]'>Role</p>
            <ReactSelect
              key={JSON.stringify(role)}
              options={optionRole}
              defaultValue={role}
              onChange={(e: any) => {
                setRole(e)
              }}
              placeholder='Select role'
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
