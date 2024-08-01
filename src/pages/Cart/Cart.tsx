import Heading from 'src/components/Heading'
import QuantitySelector from 'src/components/QuantitySelector'
import { formatMoney } from 'src/utils/formatMoney'
import { FiTrash } from 'react-icons/fi'
import { useMutation, useQueryClient } from 'react-query'
import usersService from 'src/services/users.service'
import { useSnackbar } from 'notistack'
import { useCartData } from 'src/hooks/useCartData'
import { useContext, useEffect, useState } from 'react'
import Modal from 'src/components/Modal'
import Input from 'src/components/Input'
import orderService from 'src/services/order.service'
import Button from 'src/components/Button'
import { useForm } from 'react-hook-form'
import { AppContext } from 'src/context/app.context'
import { TUser } from 'src/types/auth'
import addressService from 'src/services/address.service'
import { useQuery } from 'react-query'
import Spinner from 'src/components/Spinner'
export interface AdressType {
  province_id?: string
  district_id?: string
  district_name?: string
  province_name?: string
  ward_name?: string
  ward_id?: string
}

const CartPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { user, setCartChanged, cartChanged } = useContext(AppContext)
  const { data: listItemCart, loading } = useCartData()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)

  const [selectedProvince, setSelectedProvince] = useState<string>('')
  const [selectedDistrict, setSelectedDistrict] = useState<string>('')
  const [selectedWard, setSelectedWard] = useState<string>('')
  const [houseNumber, setHouseNumber] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    reset(user as TUser)
  }, [])

  const deleteCartMutation = useMutation({
    mutationFn: ({ product_id, color_id, size_id }: { product_id: string; color_id: string; size_id: string }) =>
      usersService.deleteCart({ product_id, color_id, size_id }) as any
  })
  const handleDeleteCartItem = ({
    product_id,
    color_id,
    size_id
  }: {
    product_id: string
    color_id: string
    size_id: string
  }) => {
    deleteCartMutation.mutate(
      { product_id, color_id, size_id },
      {
        onSuccess: () => {
          enqueueSnackbar('Đã xóa sản phẩm ra khỏi giỏ hàng', { variant: 'success' })
          queryClient.invalidateQueries('cart')
        }
      }
    )
  }
  const updateQuantityMutation = useMutation({
    mutationFn: ({
      product_id,
      color_id,
      size_id,
      quantity
    }: {
      product_id: string
      color_id: string
      size_id: string
      quantity: number
    }) => usersService.updateCart({ product_id, color_id, size_id, quantity: quantity })
  })

  const handleQuantityChange = (product_id: string, color_id: string, size_id: string, newQuantity: number) => {
    updateQuantityMutation.mutate(
      { product_id, color_id, size_id, quantity: newQuantity },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('cart')
        },
        onError: () => {
          enqueueSnackbar('Có lỗi xảy ra khi cập nhật số lượng', { variant: 'error' })
        }
      }
    )
  }
  const totalAmount = listItemCart?.data.user?.cart?.reduce(
    (total: number, item: { product: { price: number }; quantity: number }) => {
      return total + item?.product?.price * item?.quantity
    },
    0
  )
  const handleOnClick = () => {
    setIsOpen(true)
  }
  const createOrderMutation = useMutation({
    mutationFn: (body: any) =>
      orderService.create({
        ...body,
        coupon_code: body.payload_coupon
      })
  })

  const updateProfileMutation = useMutation({
    mutationFn: (body: any) => usersService.edit({ _id: user?._id, ...body })
  })

  const handleCreateOrder = (body: any) => {
    createOrderMutation.mutate(body, {
      onSuccess: (data: any) => {
        enqueueSnackbar('Đặt hàng thành công', { variant: 'success' })
        if (data.data?.paymentUrl) {
          window.location.href = data?.data.paymentUrl
        }
        setCartChanged(!cartChanged)
        queryClient.invalidateQueries('cart')
      }
    })
  }

  const [totalPriceAfterDiscount, setTotalPriceAfterDiscount] = useState(totalAmount)

  useEffect(() => {
    reset(user as TUser)
    calculateTotalPrice()
  }, [listItemCart])

  const calculateTotalPrice = () => {
    const total = listItemCart?.data?.user?.cart?.reduce(
      (acc: any, item: any) => acc + item?.product?.price * item.quantity,
      0
    )
    setTotalPriceAfterDiscount(total || 0)
  }

  const applyCouponMutation = useMutation(orderService.applyCoupon, {
    onSuccess: (data) => {
      setTotalPriceAfterDiscount(data?.data.totalPrice as any)
      enqueueSnackbar('Áp dụng mã giảm giá thành công', { variant: 'success' })
    },
    onError: (error: any) => {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    }
  })

  const validateSelection = () => {
    return selectedProvince && selectedDistrict && selectedWard && houseNumber
  }

  const onSubmitApplyCoupon = (data: any) => {
    applyCouponMutation.mutate({
      coupon_code: data.payload_coupon,
      cartItems: listItemCart?.data.user?.cart
    })
  }

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

  const hanldeUpdateInforUser = (values: any) => {
    updateProfileMutation.mutate(values, {
      onSuccess: () => {
        if (!validateSelection()) {
          enqueueSnackbar('Vui lòng điền đấy đủ thôn tin.', { variant: 'error' })
          return
        }
        enqueueSnackbar('Cập nhật thông tin thành công', { variant: 'success' })
        setCartChanged((prev) => !prev)
      },
      onError: () => {
        enqueueSnackbar('Cập nhật thông tin thất bại', { variant: 'error' })
      }
    })
  }
  if (loading) {
    return <Spinner fullHeight></Spinner>
  }

  return (
    <div>
      <Heading className='text-4xl text-center py-10'>Cart</Heading>
      <div className='w-full grid grid-cols-10 mx-10 gap-x-20'>
        <table className='border border-gray-300 w-full mx-auto col-span-6'>
          <thead className='border border-gray-300 '>
            <tr>
              <th className='p-3 w-[350px] font-semibold  text-left'>Sản phẩm</th>
              <th className='w-[208px] border-l border-gray-300'>Số lượng</th>
              <th className='w-[128px] border-l border-gray-300'>Tổng phụ</th>
              <th className='w-[80px] border-l border-gray-300'></th>
            </tr>
          </thead>

          <tbody>
            {listItemCart?.data?.user?.cart?.length > 0 &&
              listItemCart?.data.user?.cart?.map((item: any, index: number) => {
                return (
                  <tr className='border-b border-gray-300 '>
                    <td className='border-r border-gray-300 p-3' key={index + 1}>
                      <div className='flex gap-x-5 items-center'>
                        <img
                          className='w-24 h-40 object-contain'
                          src={item?.product?.thumbnail?.url as string}
                          alt=''
                        />
                        <div className='flex flex-col mt-5 '>
                          <span className='uppercase text-xs font-medium '>{item?.product?.title || ''}</span>
                          <span className='my-3'>{formatMoney(item?.product?.price || '')}</span>
                          {item?.product?.colors?.length > 0 && (
                            <span className='uppercase text-xs font-medium'>
                              Color -
                              {item?.product?.colors?.length > 0 &&
                                item?.product?.colors?.map((color: any) => color?.name)}
                            </span>
                          )}
                          {item?.product?.sizes?.length > 0 && item?.product?.sizes?.length > 0 && (
                            <span className='uppercase text-xs font-medium'>
                              Size - {item?.product?.sizes?.map((sizes: any) => sizes?.name)}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className='flex items-center justify-center'>
                        <QuantitySelector
                          initialQuantity={item?.quantity}
                          onQuantityChange={(newQuantity) =>
                            handleQuantityChange(item.product._id, item.color, item.size, newQuantity)
                          }
                        ></QuantitySelector>
                      </div>
                    </td>
                    <td className='border-l border-gray-300'>
                      <span className='flex items-center justify-center '>
                        {formatMoney(item?.product?.subtotal) || 0}
                      </span>
                    </td>
                    <td className='border-l border-gray-300'>
                      <div className='flex items-center justify-center '>
                        <button
                          onClick={() =>
                            handleDeleteCartItem({
                              product_id: item.product._id,
                              color_id: item.color,
                              size_id: item.size
                            })
                          }
                        >
                          <FiTrash size={20}></FiTrash>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>

        <div className='col-span-4'>
          <div className='bg-[#f7f7f7] w-[460px] h-[476px] p-10'>
            <div className='w-full border-b border-black'>
              <Heading className='text-left py-3 text-xl '>Tổng tiền trong giỏ hàng</Heading>
            </div>
            <div>
              <div className='flex justify-between mt-10'>
                <span className='font-bold text-lg'>Tổng : </span>
                <span className='font-semibold'>{formatMoney(totalPriceAfterDiscount)}</span>
              </div>
              <div className='flex items-center justify-between mt-10'>
                <span className='text-lg'>Thông tin người nhận: </span>
                <div className='border-b border-black'>
                  <button onClick={handleOnClick}>Thay đổi</button>
                </div>
              </div>

              <div className='mt-20'>
                <form onSubmit={handleSubmit(handleCreateOrder)}>
                  <div className='flex justify-between items-center'>
                    <select
                      className='py-2 px-4 border border-gray-300 '
                      {...register('payment_method', { required: true })}
                    >
                      <option value='Thanh toán khi nhận hàng'>Thanh toán khi nhận hàng</option>
                      <option value='Thanh toán bằng thẻ tín dụng'>Thanh toán bằng thẻ tín dụng</option>
                    </select>
                    {errors.payment_method && <span>This field is required</span>}
                    <Button kind='secondary' className='py-1 px-4 text-xs w-[130px]' type='submit'>
                      Xác nhận phương thức
                    </Button>
                  </div>
                </form>
              </div>
              <form className='flex my-5' onSubmit={handleSubmit(onSubmitApplyCoupon)}>
                <input
                  placeholder='Apply discount code'
                  {...register('payload_coupon')}
                  type='text'
                  className='border py-2 border-gray-300 px-4 text-base lg:w-[70%] w-full'
                />
                <Button kind='secondary' className='lg:py-3 lg:px-5 py-1 px-4 lg:text-xs w-[130px]'>
                  Áp dụng
                </Button>
              </form>
            </div>
          </div>
        </div>
        <Modal
          overlayClassName='flex items-end justify-end '
          className='w-[600px] h-screen p-4'
          isOpenModal={isOpen}
          setIsOpenModal={setIsOpen}
        >
          <Heading className='text-2xl text-center py-10'>Thông tin</Heading>
          <form action='' onSubmit={handleSubmit(hanldeUpdateInforUser)}>
            <Input register={register} type='text' placeholder='Tên đầy đủ *' name='full_name'></Input>
            <Input register={register} type='number' placeholder='Điện thoại *' name='phone'></Input>
            <h1 className='my-3 text-lg'>Địa chỉ</h1>
            <div className='flex flex-col gap-y-5'>
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
                  required
                />
              </div>

              <input
                className='p-3 mb-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                {...register('address')}
                readOnly
              />
            </div>
            <Button type='submit' kind='secondary' className='w-full py-4 text-xs'>
              Thay đổi thông tin
            </Button>
          </form>
        </Modal>
      </div>
    </div>
  )
}

export default CartPage
