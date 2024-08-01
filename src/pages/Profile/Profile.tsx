import { enqueueSnackbar } from 'notistack'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'
import Input from 'src/components/Input'
import { AppContext } from 'src/context/app.context'
import usersService from 'src/services/users.service'
import { TUser } from 'src/types/auth'
import { profileSchema } from 'src/lib/yup/profile.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import addressData from '../../../data.json'

export interface AdressType {
  Id: string
  Level: string
  Name: string
}

const Profile = () => {
  const { user } = useContext(AppContext)

  const [selectedProvince, setSelectedProvince] = useState<string>('')
  const [selectedDistrict, setSelectedDistrict] = useState<string>('')
  const [selectedWard, setSelectedWard] = useState<string>('')
  const [houseNumber, setHouseNumber] = useState('')

  const provinces = addressData as any
  const districts = selectedProvince ? provinces.find((p: AdressType) => p.Id === selectedProvince)?.Districts : []
  const wards = selectedDistrict ? districts?.find((d: AdressType) => d.Id === selectedDistrict)?.Wards : []

  const transformedWards: AdressType[] = wards?.map((ward: AdressType) => ({
    ...ward,
    Name: ward.Name
  }))

  const {
    reset,
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm<any>({
    resolver: yupResolver(profileSchema)
  })

  const updateProfileMutation = useMutation({
    mutationFn: (body: any) => usersService.edit({ _id: user?._id, ...body })
  })

  useEffect(() => {
    if (!selectedProvince) {
      setSelectedDistrict('')
      setSelectedWard('')
    }
  }, [selectedProvince])

  useEffect(() => {
    if (!selectedDistrict) {
      setSelectedWard('')
    }
  }, [selectedDistrict])

  const handleAddressChange = (
    newProvince = selectedProvince,
    newDistrict = selectedDistrict,
    newWard = selectedWard
  ) => {
    const provinceName = provinces?.find((p: AdressType) => p.Id === newProvince)?.Name || ''
    const districtName = districts?.find((d: AdressType) => d.Id === newDistrict)?.Name || ''
    const wardName = wards?.find((w: AdressType) => w.Id === newWard)?.Name || ''

    const fullAddress = [houseNumber, wardName, districtName, provinceName].filter(Boolean).join(' - ')
    setValue('address', fullAddress)
  }

  useEffect(() => {
    handleAddressChange()
  }, [houseNumber])

  useEffect(() => {
    reset(user as TUser)
  }, [])

  const hanldeUpdateUserProfile = (values: any) => {
    if (!values.full_name || !values.phone || !values.address) {
      enqueueSnackbar('Vui lòng điền đầy đủ thông tin', { variant: 'error' })
      return
    }
    const { confirm_password, ...updateValues } = values
    updateProfileMutation.mutate(updateValues, {
      onSuccess: () => {
        enqueueSnackbar('Cập nhật thông tin thành công', { variant: 'success' })
      }
    })
  }

  return (
    <div className='mt-10 w-full'>
      <Heading className='text-4xl text-center mb-5'>Profile</Heading>
      <div className='flex items-center flex-col justify-center'>
        <form className='w-[500px]' action='' onSubmit={handleSubmit(hanldeUpdateUserProfile)}>
          <Input
            type='text'
            name='full_name'
            register={register}
            placeholder='Enter your full name *'
            errorMessage={errors.full_name?.message as any}
          ></Input>
          <Input
            className='mb-1'
            type='number'
            name='phone'
            register={register}
            placeholder='Enter your phone *'
            errorMessage={errors.phone?.message as any}
          ></Input>
          <div className='flex flex-col gap-y-5 mb-1'>
            <div className='flex gap-x-3'>
              <select
                className='border w-1/2 border-gray-300 p-3 rounded-sm focus:shadow-sm focus:border-gray-500 outline-none'
                value={selectedProvince}
                onChange={(e) => {
                  const newProvince = e.target.value
                  setSelectedProvince(newProvince)
                  handleAddressChange(newProvince)
                }}
              >
                <option value=''>Chọn tỉnh</option>
                {provinces?.map((province: AdressType) => (
                  <option key={province.Id} value={province.Id}>
                    {province.Name}
                  </option>
                ))}
              </select>

              <select
                className='border border-gray-300 p-3 rounded-sm focus:shadow-sm focus:border-gray-500 outline-none w-[50%]'
                value={selectedDistrict}
                onChange={(e) => {
                  const newDistrict = e.target.value
                  setSelectedDistrict(newDistrict)
                  handleAddressChange(selectedProvince, newDistrict, selectedWard)
                }}
                disabled={!selectedProvince}
              >
                <option value=''>Chọn huyện</option>
                {districts?.map((district: AdressType) => (
                  <option key={district.Id} value={district.Id}>
                    {district.Name}
                  </option>
                ))}
              </select>
            </div>

            <div className='flex gap-x-3'>
              <select
                className='border border-gray-300 p-3 rounded-sm focus:shadow-sm focus:border-gray-500 outline-none w-[50%]'
                value={selectedWard}
                onChange={(e) => {
                  const newWard = e.target.value
                  setSelectedWard(newWard)
                  handleAddressChange(selectedProvince, selectedDistrict, newWard)
                }}
                disabled={!selectedDistrict}
              >
                <option value=''>Chọn xã</option>
                {transformedWards?.map((ward: AdressType) => (
                  <option key={ward.Id} value={ward.Id}>
                    {ward.Name}
                  </option>
                ))}
              </select>

              <input
                className='p-3 w-1/2 outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                placeholder='Số nhà hoặc tên đường'
                value={houseNumber}
                onChange={(e) => setHouseNumber(e.target.value)}
              />
            </div>

            <input
              className='p-3 mb-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
              {...register('address')}
              readOnly
            />
          </div>
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
            Cập nhật thông tin
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Profile
