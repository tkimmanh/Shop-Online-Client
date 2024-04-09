import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'
import Input from 'src/components/Input'
import { routes } from 'src/routes/routes'
import categoryService from 'src/services/category.service'



const CategoriesAddNew = () => {



  const {
    register,
    reset,
    handleSubmit } = useForm()
  const { enqueueSnackbar } = useSnackbar()

  const addNewCateogyMutations = useMutation({
    mutationFn: (body) => categoryService.createCategoies(body)
  })

  const onSubmit = (value: any) => {
    addNewCateogyMutations.mutate(value, {
      onSuccess() {
        enqueueSnackbar('Thêm danh mục mới thành công', { variant: 'success' })
      }
    })
  }

  return (
    <div>
      <div className='flex items-center justify-between gap-x-5 mb-5'>
        <Heading>Category Add New</Heading>
        <Link to={routes.CategoriesAdmin.path}>
          <Button className='py-2 px-6 text-xs' kind='primary'>
            Category Manage
          </Button>
        </Link>
      </div>
      <form action='' onSubmit={handleSubmit(onSubmit)}>
        <div className='w-full grid grid-cols-10 gap-x-2'>
          <Input className='col-span-5' type='text' name='title' register={register} placeholder='Title'></Input>
        </div>
        <Button
          isLoading={addNewCateogyMutations.isLoading}
          type='submit'
          className='px-10 py-3 text-sm rounded mt-5'
          kind='secondary'
        >
          Add new
        </Button>
      </form>
    </div>
  )
}

export default CategoriesAddNew
