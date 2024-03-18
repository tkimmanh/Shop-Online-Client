import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'
import Input from 'src/components/Input'
import { routes } from 'src/routes/routes'
import variantsService from 'src/services/variants.service'

const VariantsManage = () => {
  const { register, reset, setError, handleSubmit } = useForm()
  const { enqueueSnackbar } = useSnackbar()

  const { data: colors } = useQuery({
    queryKey: ['COLORS'],
    queryFn: () => {
      return variantsService.getAllColor()
    }
  })
  const { data: sizes } = useQuery({
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
  const addNewColor = (value: any) => {
    addNewColorMutation.mutate(value, {
      onSuccess() {
        enqueueSnackbar('Thêm colors mới thành công', { variant: 'success' })
      }
    })
  }
  const addNewSize = (value: any) => {
    addNewSizeMutation.mutate(value, {
      onSuccess() {
        enqueueSnackbar('Thêm colors mới thành công', { variant: 'success' })
      }
    })
  }
  return (
    <div>
      <div className='mb-2'>
        <div className='grid grid-cols-2 gap-x-5'>
          <div>
            <h1 className='mb-2'>Color</h1>
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
              <Input type='text' name='color_code' placeholder='Color code' register={register}></Input>
              <Button kind='secondary' type='submit' className='text-xs px-3 py-3'>
                Add color
              </Button>
            </form>
          </div>

          <div>
            <h2 className='mb-2'>Size</h2>
            <form action='' onSubmit={handleSubmit(addNewSize)}>
              <Input
                type='text'
                name='name'
                placeholder='Size'
                rules={{
                  required: true
                }}
                register={register}
              ></Input>
              <Button kind='secondary' type='submit' className='text-xs px-3 py-3'>
                Add Size
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div>
        <div className='flex items-center justify-between gap-x-5 mb-5'>
          <Heading>Variants Manage</Heading>
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
                  Name
                </th>
                <th scope='col' className='px-6 py-3'>
                  Code color
                </th>
                <th scope='col' className='px-6 py-3'>
                  <span className='sr-only'>Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {colors?.data.getallColors.map((color: any, index: number) => (
                <tr className='bg-white' key={index}>
                  <td className='px-6 py-4'>{color._id}</td>
                  <td className='px-6 py-4'>{color.name}</td>
                  <td className='px-6 py-4'>{color.code || '(trống)'}</td>
                  <td className='px-6 py-4 text-right'>
                    <button className='font-medium text-blue-600 hover:underline'>Edit</button>
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
                    Sizes
                  </th>

                  <th scope='col' className='px-6 py-3'>
                    <span className='sr-only'>Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sizes?.data.getallSizes.map((size: any, index: number) => (
                  <tr className='bg-white' key={index}>
                    <td className='px-6 py-4'>{size._id}</td>
                    <td className='px-6 py-4'>{size.name}</td>
                    <td className='px-6 py-4 text-right'>
                      <button className='font-medium text-blue-600 hover:underline'>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VariantsManage
