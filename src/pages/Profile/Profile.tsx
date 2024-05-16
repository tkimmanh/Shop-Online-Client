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
import { useQuery } from 'react-query'
import addressService from 'src/services/address.service'
import { profileSchema } from 'src/lib/yup/profile.schema'
import { yupResolver } from '@hookform/resolvers/yup'

const Profile = () => {
  const { user } = useContext(AppContext)
  const {
    reset,
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm<any>({
    resolver: yupResolver(profileSchema)
  })
  const [selectedProvince, setSelectedProvince] = useState<string>('')
  const [selectedDistrict, setSelectedDistrict] = useState<string>('')
  const [selectedWard, setSelectedWard] = useState<string>('')
  const [houseNumber, setHouseNumber] = useState('')

  const updateProfileMutation = useMutation({
    mutationFn: (body: any) => usersService.edit({ _id: user?._id, ...body })
  })

  const { data: provinces, isLoading: loadingProvinces } = useQuery('provinces', addressService.getProvinces)

  const { data: districts, isLoading: loadingDistricts } = useQuery(
    ['districts', selectedProvince],
    () => addressService.getDistricts(selectedProvince),
    {
      enabled: !!selectedProvince
    }
  )

  const { data: wards, isLoading: loadingWards } = useQuery(
    ['wards', selectedDistrict],
    () => addressService.getWards(selectedDistrict),
    {
      enabled: !!selectedDistrict // Only run query if selectedDistrict is not empty
    }
  )

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
    const provinceName = provinces?.find((p) => p.province_id === newProvince)?.province_name || ''
    const districtName = districts?.find((d) => d.district_id === newDistrict)?.district_name || ''
    const wardName = wards?.find((w) => w.ward_id === newWard)?.ward_name || ''

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
                disabled={loadingProvinces}
              >
                <option value=''>{loadingProvinces ? 'Đang tải...' : 'Chọn tỉnh'}</option>
                {provinces?.map((province) => (
                  <option key={province.province_id} value={province.province_id}>
                    {province.province_name}
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
                disabled={!selectedProvince || loadingDistricts}
              >
                <option value=''>{loadingDistricts ? 'Đang tải...' : 'Chọn huyện'}</option>
                {districts?.map((district) => (
                  <option key={district.district_id} value={district.district_id}>
                    {district.district_name}
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
                disabled={!selectedDistrict || loadingWards}
              >
                <option value=''>{loadingWards ? 'Đang tải...' : 'Chọn xã'}</option>
                {wards?.map((ward) => (
                  <option key={ward.ward_id} value={ward.ward_id}>
                    {ward.ward_name}
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
