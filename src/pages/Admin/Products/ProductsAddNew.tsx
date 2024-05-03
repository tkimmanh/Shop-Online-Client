import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import ReactQuill from 'react-quill'
import { Link, useParams } from 'react-router-dom'
import ReactSelect from 'react-select'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'
import Input from 'src/components/Input'
import { routes } from 'src/routes/routes'
import categoryService from 'src/services/category.service'
import productsService from 'src/services/products.service'
import variantsService from 'src/services/variants.service'
import { useDropzone } from 'react-dropzone'
import { CiTrash } from 'react-icons/ci'
interface FileWithPreview extends File {
  preview: string
}

const ProductsAddNew = () => {
  const dataValue =
    'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'

  const [value, setValue] = useState(dataValue)
  const [thumbnail, setThumbnail] = useState<FileWithPreview[]>([])
  const [images, setImages] = useState<FileWithPreview[]>([])
  const { id } = useParams()

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

  const { data: categories } = useQuery({
    queryKey: ['CATEGORY'],
    queryFn: () => {
      return categoryService.getAllCategoies()
    }
  })

  const categoryOptions = categories?.data?.getallCategory?.map((category: any) => ({
    value: category._id,
    label: category.title
  }))

  const colorOptions = colors?.data.getallColors.map((color: any) => ({
    value: color._id,
    label: color.name
  }))

  const sizeOptions = sizes?.data.getallSizes.map((size: any) => ({
    value: size._id,
    label: size.name
  }))

  const [selectedColors, setSelectedColorOptions] = useState([])

  const [selectedSizes, setSelectedSizeOptions] = useState([])

  const [selectdCategory, setSelectedCategoryOptions] = useState<any>([])

  const removeThumbnail = () => {
    setThumbnail([])
  }
  const removeImages = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const { register, reset, handleSubmit } = useForm()
  const { enqueueSnackbar } = useSnackbar()

  const { data: detailProduct } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productsService.getProduct(id as string),
    enabled: !!id,
    onSuccess(data) {
      const item = data?.data?.response
      reset({
        ...item
      })
      setSelectedColorOptions(
        item?.colors?.map((_item: any) => {
          return { value: _item?._id, label: _item?.name }
        })
      )
      setSelectedSizeOptions(
        item?.sizes?.map((_item: any) => {
          return { value: _item?._id, label: _item?.name }
        })
      )
      setSelectedCategoryOptions({
        value: item?.category?._id,
        label: item?.category?.title
      })
      setValue(item?.description)
      setThumbnail([
        {
          name: item?.thumbnail?.public_id,
          preview: item?.thumbnail?.url
        } as any
      ])

      setImages(
        item?.images?.map((_item: any) => {
          return {
            name: _item?._id,
            preview: _item?.url
          } as any
        })
      )
    }
  })

  const editProductMutations = useMutation({
    mutationFn: (body: any) => productsService.editProduct(body, id),
    onSuccess: () => {
      enqueueSnackbar('Cập nhật mới thành công', { variant: 'success' })
    }
  })

  const addNewProductMutations = useMutation({
    mutationFn: (body: any) => productsService.createProduct(body),
    onSuccess: () => {
      reset()
      setImages([])
      setValue('')
      setSelectedCategoryOptions([])
      setSelectedColorOptions([])
      setSelectedSizeOptions([])
      setThumbnail([])
      enqueueSnackbar('Thêm mới thành công', { variant: 'success' })
    }
  })

  const { getRootProps: getThumbnailRootProps, getInputProps: getThumbnailInputProps } = useDropzone({
    accept: 'image/*' as any,
    multiple: false,
    onDrop: (acceptedFiles: File[]) => {
      setThumbnail(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        ) as FileWithPreview[]
      )
    }
  })

  // Dropzone cho images
  const { getRootProps: getImagesRootProps, getInputProps: getImagesInputProps } = useDropzone({
    accept: 'image/*' as any,
    onDrop: (acceptedFiles: File[]) => {
      if (images.length + acceptedFiles.length <= 5) {
        setImages((prev) => [
          ...prev,
          ...acceptedFiles.map(
            (file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file)
              }) as FileWithPreview
          )
        ])
      } else {
        enqueueSnackbar('Chỉ có thể chọn tối đa 5 ảnh', { variant: 'warning' })
      }
    }
  })

  const onSubmit = async (data: any) => {
    const formData = new FormData()
    const colorValues = selectedColors?.map((color: any) => color?.value).join(',')
    const sizeValues = selectedSizes?.map((size: any) => size?.value).join(',')
    formData.append('title', data.title)
    formData.append('price', data.price)
    formData.append('quantity', data.quantity)
    formData.append('description', value)
    if (thumbnail.length > 0) {
      formData.append('thumbnail', thumbnail[0])
    }

    images.forEach((image) => {
      formData.append(`images`, image)
    })
    formData.append('category', selectdCategory.value as any)
    formData.append('colors', colorValues)
    formData.append('sizes', sizeValues)
    formData.append('status', data.status)
    try {
      id ? await editProductMutations.mutateAsync(formData) : await addNewProductMutations.mutateAsync(formData)
    } catch (error) {
      console.log('error:', error)
    }
  }

  return (
    <div>
      <div className='flex items-center justify-between gap-x-5 mb-5'>
        <Heading>Product Thêm mới</Heading>
        <Link to={routes.ProductsAdmin.path}>
          <Button className='py-2 px-6 text-xs' kind='primary'>
            Quản lý sản phẩm
          </Button>
        </Link>
      </div>
      <form action='' onSubmit={handleSubmit(onSubmit)}>
        <div className='w-full grid grid-cols-10 gap-x-2'>
          <Input className='col-span-5' type='text' name='title' register={register} placeholder='Title'></Input>
          <Input className='col-span-3' type='number' name='price' register={register} placeholder='Price'></Input>
          <Input
            className='col-span-2'
            type='number'
            name='quantity'
            register={register}
            placeholder='Quantity'
          ></Input>
        </div>
        <div className='grid grid-cols-2 gap-x-5 mb-5'>
          <ReactSelect
            options={colorOptions}
            isMulti
            key={JSON.stringify(detailProduct)}
            defaultValue={detailProduct?.data?.findProduct?.colors?.map((_item: any) => {
              return { value: _item?._id, label: _item?.name }
            })}
            closeMenuOnSelect={false}
            onChange={setSelectedColorOptions as any}
            placeholder='Select colors'
          />

          <ReactSelect
            options={sizeOptions}
            isMulti
            key={JSON.stringify(detailProduct)}
            defaultValue={detailProduct?.data?.findProduct?.sizes?.map((_item: any) => {
              return { value: _item?._id, label: _item?.name }
            })}
            closeMenuOnSelect={false}
            onChange={setSelectedSizeOptions as any}
            placeholder='Select sizes'
          />
        </div>
        <div>
          <ReactQuill theme='snow' value={value} onChange={setValue} />
        </div>

        <div className='mt-5'>
          <ReactSelect
            defaultInputValue=''
            options={categoryOptions}
            key={JSON.stringify(detailProduct)}
            defaultValue={{
              value: detailProduct?.data?.findProduct?.category?._id,
              label: detailProduct?.data?.findProduct?.category?.title
            }}
            closeMenuOnSelect={false}
            onChange={setSelectedCategoryOptions as any}
            placeholder='Select category'
          />
        </div>
        <div className='mt-5 grid grid-cols-10 gap-x-5'>
          <div className='col-span-3'>
            <div
              {...getThumbnailRootProps()}
              className='h-[250px] border-2 rounded-md border-dashed flex justify-center items-center overflow-hidden bg-white'
            >
              <input type='file' {...getThumbnailInputProps()} />
              {thumbnail?.length > 0 ? (
                thumbnail.map((file) => (
                  <div key={file.name} className='w-full h-full relative'>
                    <img src={file.preview} alt='Preview' className='w-full h-full absolute object-contain' />
                    <button
                      className='absolute bg-white text-black left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-1 rounded-full shadow-lg'
                      onClick={() => removeThumbnail()}
                    >
                      <CiTrash size={30} />
                    </button>
                  </div>
                ))
              ) : (
                <img
                  className='object-contain h-full w-full'
                  src='https://static.vecteezy.com/system/resources/previews/004/968/473/original/upload-or-add-a-picture-jpg-file-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-etc-vector.jpg'
                  alt='Placeholder'
                />
              )}
            </div>
          </div>

          <div className='col-span-7'>
            <div
              {...getImagesRootProps()}
              className='h-[250px] border-2 rounded-md border-dashed flex justify-center items-center overflow-hidden bg-white'
            >
              <input type='file' multiple {...getImagesInputProps()} />
              {images?.length > 0 ? (
                images?.map((file, index) => (
                  <div key={file.name} className='w-full h-full relative'>
                    <img src={file.preview} alt='Preview' className='w-full h-full absolute object-contain' />
                    <button
                      className='absolute flex items-center justify-center h-12 w-12 bg-white text-black left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-1 rounded-full shadow-lg'
                      onClick={() => removeImages(index)}
                    >
                      <CiTrash size={30} />
                    </button>
                  </div>
                ))
              ) : (
                <p className='text-gray-500'>Drag 'n' drop images here, or click to select files</p>
              )}
            </div>
          </div>

          <div className='flex items-center w-full mt-5'>
            <input
              {...register('status')}
              id='link-checkbox'
              type='checkbox'
              className='w-6 h-6 text-gray-500 bg-gray-100 border-gray-300 rounded '
            />
            <label htmlFor='link-checkbox' className='ms-2 w-full text-xs font-medium text-gray-900 '>
              Allow display ?
            </label>
          </div>
        </div>
        <Button
          isLoading={addNewProductMutations.isLoading}
          type='submit'
          className='px-10 py-3 text-sm rounded mt-5'
          kind='secondary'
        >
          {id ? 'Save' : 'Thêm mới'}
        </Button>
      </form>
    </div>
  )
}

export default ProductsAddNew
