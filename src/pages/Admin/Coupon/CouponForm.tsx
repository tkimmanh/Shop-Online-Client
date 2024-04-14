import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useMutation, useQuery } from 'react-query'
import couponService from 'src/services/coupons.service'
import { useNavigate, useParams } from 'react-router-dom'

const CouponForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { register, handleSubmit, setValue, reset } = useForm()

  const [expirationDate, setExpirationDate] = useState(new Date())
  const { data: couponData } = useQuery(['COUPON', id], () => couponService.getById(id as string), {
    enabled: !!id
  })

  useEffect(() => {
    if (couponData?.data.result?.expiration_date) {
      setExpirationDate(new Date(couponData.data.result.expiration_date))
    }
    reset(couponData?.data.result)
  }, [couponData, reset])

  const addOrUpdateCouponMutation = useMutation({
    mutationFn: (data: any) => {
      if (id) {
        return couponService.update({ id, ...data })
      }
      return couponService.create(data)
    },
    onSuccess: () => {
      navigate('/admin/coupon')
    }
  })

  const handleSubmitCoupon = (value: any) => {
    addOrUpdateCouponMutation.mutate({
      ...value,
      expirationDate
    })
  }

  return (
    <div>
      <h1 className='mb-2'>Coupon</h1>
      <form action='' onSubmit={handleSubmit(handleSubmitCoupon)}>
        <Input
          type='text'
          name='code'
          placeholder='Code coupon'
          register={register}
          rules={{
            required: true
          }}
        ></Input>
        <Input
          type='number'
          name='discount'
          placeholder='Discount %'
          register={register}
          rules={{
            required: true
          }}
        ></Input>
        <div className='mb-4'>
          <div className='mb-4'>
            <DatePicker
              selected={expirationDate}
              onChange={(date: Date) => {
                setExpirationDate(date)
                setValue('expiration_date', date)
              }}
              dateFormat='MMMM d, yyyy h:mm aa'
              showTimeSelect
              timeFormat='HH:mm'
              className='form-control border border-gray-300 rounded-md py-3 text-center'
            />
          </div>
        </div>
        <Button kind='secondary' type='submit' className='text-xs px-3 py-3'>
          {id ? 'Update' : 'Create'}
        </Button>
      </form>
    </div>
  )
}

export default CouponForm
