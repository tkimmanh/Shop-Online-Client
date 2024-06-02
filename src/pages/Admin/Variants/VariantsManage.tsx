import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'
import Input from 'src/components/Input'
import { routes } from 'src/routes/routes'
import variantsService from 'src/services/variants.service'
import ModalInformation from './components/ModalInformation'
import { useState } from 'react'
import ModalSize from './components/ModalSize'

const VariantsManage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenSize, setIsOpenSize] = useState(false)
  const [detail, setDetail] = useState('')
  const { register, reset, handleSubmit } = useForm()
  const { register: registerSize, reset: resetSize, handleSubmit: handleSubmitSize } = useForm()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const { data: colors, refetch: refetchColors } = useQuery({
    queryKey: ['COLORS'],
    queryFn: () => {
      return variantsService.getAllColor()
    }
  })
  const { data: sizes, refetch: refetchSize } = useQuery({
    queryKey: ['SIZE'],
    queryFn: () => {
      return variantsService.getAllSize()
    }
  })
  const addNewColorMutation = useMutation({
    mutationFn: (body) => variantsService.createColor(body)
  })
  const addNewSizeMutation = useMutation({
    mutationFn: (body) => variantsService.createSize(body)
  })

  const detailColor = useMutation({
    mutationFn: (body: any) => variantsService.getColor(body)
  })

  const detailSize = useMutation({
    mutationFn: (body: any) => variantsService.getSize(body)
  })

  const addNewColor = async (value: any) => {
    addNewColorMutation.mutate(value, {
      onSuccess() {
        enqueueSnackbar('Thêm colors mới thành công', { variant: 'success' })
        queryClient.invalidateQueries(['COLORS'])
        reset({
          name: '',
          color_code: ''
        })
      }
    })
  }
  const addNewSize = (value: any) => {
    addNewSizeMutation.mutate(value, {
      onSuccess() {
        enqueueSnackbar('Thêm colors mới thành công', { variant: 'success' })
        queryClient.invalidateQueries(['SIZE'])
        resetSize({
          name: '',
          color_code: ''
        })
      }
    })
  }

  const handleDetailColor = (id: any) => {
    detailColor.mutate(id, {
      onSuccess(data) {
        setDetail(data?.data?.getColor)
        setIsOpen(true)
      }
    })
  }

  const handleDetailSize = (id: any) => {
    detailSize.mutate(id, {
      onSuccess(data) {
        setDetail(data?.data?.getSize)
        setIsOpenSize(true)
      }
    })
  }

  const deleteColorMutations = useMutation({
    mutationFn: (body: any) => variantsService.deleteColor(body),
    onSuccess: () => {
      enqueueSnackbar('Xoá thành công', { variant: 'success' })
      queryClient.invalidateQueries(['COLORS'])
    },
    mutationKey: ['COLORS']
  })

  const handleDelete = async (id: string | number) => {
    try {
      if (confirm('Bạn có chắc chắn muốn xóa?')) {
        await deleteColorMutations.mutateAsync(id)
      }
    } catch (error) {}
  }

  const deleteSizeMutations = useMutation({
    mutationFn: (body: any) => variantsService.deleteSize(body),
    onSuccess: () => {
      enqueueSnackbar('Xoá thành công', { variant: 'success' })
      queryClient.invalidateQueries(['SIZE'])
    },
    mutationKey: ['SIZE']
  })

  const handleDeleteSize = async (id: string | number) => {
    try {
      if (confirm('Bạn có chắc chắn muốn xóa?')) {
        await deleteSizeMutations.mutateAsync(id, {
          onSuccess: () => {
            queryClient.invalidateQueries(['SIZE'])
          }
        })
      }
    } catch (error) {}
  }

  return (
    <div>
      <div className='mb-2'>
        <div className='grid grid-cols-2 gap-x-5'>
          <div>
            <h1 className='mb-2'>Màu sắc</h1>
            <form action='' onSubmit={handleSubmit(addNewColor)}>
              <Input
                type='text'
                name='name'
                placeholder='Color'
                register={register}
                rules={{
                  required: true
                }}
              ></Input>
              <div className='flex items-center gap-x-5'>
                <input className='h-[40px] w-[100px] px-1 border-2' type='color' {...register('color_code')}></input>
                <Button kind='secondary' type='submit' className='text-xs px-3 py-3'>
                  Thêm màu
                </Button>
              </div>
            </form>
          </div>

          <div>
            <h2 className='mb-2'>Kích cỡ</h2>
            <form action='' onSubmit={handleSubmitSize(addNewSize)}>
              <Input
                type='text'
                name='name'
                placeholder='Size'
                rules={{
                  required: true
                }}
                register={registerSize}
              ></Input>
              <Button kind='secondary' type='submit' className='text-xs px-3 py-3'>
                Thêm kích cỡ
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div>
        <div className='flex items-center justify-between gap-x-5 mb-5'>
          <Heading>Quản lý biến thể</Heading>
          <Link to={routes.ProductAddNew.path}></Link>
        </div>
        {/* color */}
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  ID
                </th>
                <th scope='col' className='px-6 py-3'>
                  Tên màu
                </th>
                <th scope='col' className='px-6 py-3'>
                  Mã màu
                </th>
              </tr>
            </thead>
            <tbody>
              {colors?.data.getallColors.map((color: any, index: number) => (
                <tr className='bg-white' key={index}>
                  <td className='px-6 py-4'>{color._id}</td>
                  <td className='px-6 py-4'>{color.name}</td>
                  <td className='px-6 py-4'>
                    <div
                      style={{
                        backgroundColor: color.color_code,
                        width: '50%',
                        textAlign: 'center',
                        color: 'white',
                        height: '20px'
                      }}
                    >
                      {color.color_code || '(trống)'}
                    </div>
                  </td>
                  <td className='px-6 py-4 text-right'>
                    <button
                      className='font-medium text-blue-600 hover:underline mr-[5px]'
                      onClick={() => {
                        handleDetailColor(color._id)
                      }}
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      className='font-medium text-red-600 hover:underline'
                      onClick={() => {
                        handleDelete(color._id)
                      }}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* size */}
        <div className='mt-20'>
          <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    ID
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Kích cỡ
                  </th>
                </tr>
              </thead>
              <tbody>
                {sizes?.data.getallSizes.map((size: any, index: number) => (
                  <tr className='bg-white' key={index}>
                    <td className='px-6 py-4'>{size._id}</td>
                    <td className='px-6 py-4'>{size.name}</td>
                    <td className='px-6 py-4 text-right'>
                      <button
                        className='font-medium text-blue-600 hover:underline mr-[5px]'
                        onClick={() => {
                          handleDetailSize(size._id)
                        }}
                      >
                        Chỉnh sửa
                      </button>
                      <button
                        className='font-medium text-red-600 hover:underline mr-[5px]'
                        onClick={() => {
                          handleDeleteSize(size._id)
                        }}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isOpen && <ModalInformation isOpen={isOpen} setIsOpen={setIsOpen} detail={detail} refetch={refetchColors} />}
      {isOpenSize && <ModalSize isOpen={isOpenSize} setIsOpen={setIsOpenSize} detail={detail} refetch={refetchSize} />}
    </div>
  )
}

export default VariantsManage
