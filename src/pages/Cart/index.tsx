import { useContext, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FaArrowLeft } from 'react-icons/fa'
import { MdOutlinePayment } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { InputCustom } from 'src/components/InputCustom'
import Modal from 'src/components/Modal'
import { listProducts } from 'src/constants/data.constants'
import { AppContext } from 'src/context/app.context'
import { routes } from 'src/routes/routes'
import TbodyTable from './components/TbodyTable'

const CartPage = () => {
  const { setIsOpenModal } = useContext(AppContext)
  const navigate = useNavigate()

  const [dataList, setDataList] = useState(listProducts.slice(0, 3).map((product) => ({ ...product, total: 1 })))

  const { control, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
    setIsOpenModal(false)
    setDataList([])
  }

  const handleRemove = (id: number | string) => {
    const _data = dataList.filter((x: any) => x.id !== id)
    setDataList(_data)
  }

  const total = useMemo(() => {
    return dataList.reduce((pre, nex) => pre + Number(nex?.total || 0) * Number(nex?.price || 0), 0)
  }, [JSON.stringify(dataList)])

  return (
    <div className='w-[80%] m-auto'>
      <p className='py-[30px] text-[30px] font-bold'>Cart</p>
      <table className='w-full border-collapse border'>
        <thead>
          <td className='border p-[15px] font-[500]'>Product</td>
          <td className='border p-[15px] font-[500] text-center'>Quantity</td>
          <td className='border p-[15px] font-[500] text-center'>Subtotal</td>
        </thead>
        <tbody>
          {dataList.length > 0 ? (
            dataList.map((item: any, index: number) => (
              <TbodyTable
                item={item}
                handleRemove={handleRemove}
                index={index}
                dataList={dataList}
                setDataList={setDataList}
              />
            ))
          ) : (
            <tr>
              <td colSpan={3} className='text-center p-[20px] font-[500] text-[16px] text-gray-500'>
                There are no products in the cart
              </td>
            </tr>
          )}
          {dataList.length > 0 && (
            <tr>
              <td className='w-[45%]'></td>
              <td className='w-[25%]'></td>
              <td className='w-[25%] text-center font-medium p-[15px]'>Total: {total.toLocaleString('en')} đ </td>
              <td className='w-[5%]'></td>
            </tr>
          )}
        </tbody>
      </table>
      <div className='flex justify-between mt-[20px]'>
        <button
          className='w-[200px] bg-[#000] text-[#fff] hover:bg-[#fff] hover:text-[#000] font-[400] text-[16px] col-span-9 h-[40px] flex items-center justify-center'
          style={{ border: '1px solid #000' }}
          onClick={() => navigate(routes.Product.path)}
        >
          <FaArrowLeft className='mr-[20px]' />
          Continue shopping
        </button>

        {!!total && <button
          className='w-[400px] bg-[#000] text-[#fff] hover:bg-[#fff] hover:text-[#000] font-[400] text-[16px] col-span-9 h-[40px] flex items-center justify-center'
          style={{ border: '1px solid #000' }}
          onClick={() => {
            setIsOpenModal(true)
          }}
        >
          <MdOutlinePayment className='mr-[20px] w-[25px] h-auto' />
          Pay immediately
        </button>}
      </div>
      <Modal className='h-screen w-[1200px]' overlayClassName='flex items-end justify-end'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-2 gap-[30px] p-[20px] h-screen'>
            <div>
              <Controller
                control={control}
                name='name'
                rules={{
                  required: 'This field is required'
                }}
                render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                  <InputCustom
                    isRequired
                    title='Full name'
                    onChange={onChange}
                    ref={ref}
                    value={value}
                    onBlur={(e: any) => {
                      onChange(e?.target?.value?.trim())
                    }}
                    errMessage={error?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name='numberPhone'
                rules={{
                  required: 'This field is required'
                }}
                render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                  <InputCustom
                    isRequired
                    title='Phone number'
                    onChange={onChange}
                    ref={ref}
                    value={value}
                    onBlur={(e: any) => {
                      onChange(e?.target?.value?.trim())
                    }}
                    errMessage={error?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name='province'
                rules={{
                  required: 'This field is required'
                }}
                render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                  <InputCustom
                    isRequired
                    title='Province/City'
                    onChange={onChange}
                    ref={ref}
                    value={value}
                    onBlur={(e: any) => {
                      onChange(e?.target?.value?.trim())
                    }}
                    errMessage={error?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name='district'
                rules={{
                  required: 'This field is required'
                }}
                render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                  <InputCustom
                    isRequired
                    title='District'
                    onChange={onChange}
                    ref={ref}
                    value={value}
                    onBlur={(e: any) => {
                      onChange(e?.target?.value?.trim())
                    }}
                    errMessage={error?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name='wards'
                rules={{
                  required: 'This field is required'
                }}
                render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                  <InputCustom
                    isRequired
                    title='Wards'
                    onChange={onChange}
                    ref={ref}
                    value={value}
                    onBlur={(e: any) => {
                      onChange(e?.target?.value?.trim())
                    }}
                    errMessage={error?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name='specificAddress'
                render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                  <InputCustom
                    title='Specific address'
                    onChange={onChange}
                    ref={ref}
                    value={value}
                    onBlur={(e: any) => {
                      onChange(e?.target?.value?.trim())
                    }}
                    errMessage={error?.message}
                  />
                )}
              />
            </div>
            <div className='bg-[#ecebeb] p-[15px] flex flex-col justify-between'>
              <div>
                {dataList.map((item: any) => {
                  return (
                    <div className='flex border-b border-[#807f7f] mb-[10px] pb-[10px]'>
                      <img src={item?.imageUrl} alt='' className='w-[50px] h-[80px] object-cover rounded-[4px]' />
                      <div className='ml-[10px] flex justify-between w-[calc(100%-60px)] pt-[3px]'>
                        <p className='w-[50%] text-[16px] font-medium'>{item?.name}</p>
                        <p className='w-[10%] text-center font-medium'>{item?.total}</p>
                        <p className='w-[40%] text-end font-medium pr-[5px]'>
                          {Number(item?.total * item?.price).toLocaleString('en')} đ
                        </p>
                      </div>
                    </div>
                  )
                })}
                <p className='flex justify-end text-end font-medium pr-[5px] mt-[20px]'>
                  Total: <p className='w-[200px] text-end font-medium'>{Number(total).toLocaleString('en')} đ</p>
                </p>
                <p className='flex justify-end text-end font-medium pr-[5px] mt-[10px]'>
                  Shipping fee: <p className='w-[200px] text-end font-medium'>{Number(0).toLocaleString('en')} đ</p>
                </p>
                <p className=' flex justify-end text-end font-medium pr-[5px] mt-[10px]'>
                  Total amount paid:{' '}
                  <p className='w-[200px] text-end font-medium'>{Number(0 + total).toLocaleString('en')} đ</p>
                </p>
              </div>
              <button
                className='w-full bg-[#000] text-[#fff] hover:bg-[#fff] hover:text-[#000] font-[400] text-[16px] col-span-9 h-[40px] flex items-center justify-center'
                style={{ border: '1px solid #000' }}
              >
                Order
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default CartPage
