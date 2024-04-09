import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { useQuery, useMutation } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'
import Input from 'src/components/Input'
import { routes } from 'src/routes/routes'
import categoryService from 'src/services/category.service'



const CategoriesEdit = () => {



  const {
    register,
    reset,
    handleSubmit } = useForm()
  const { enqueueSnackbar } = useSnackbar()
  const { id } = useParams()
  // const addNewCateogyMutations = useQuery({
  //   mutationFn: () => categoryService.getCategoies(id as string)
  // })
  const { data: category } = useQuery({
    queryKey: ['CATEGORY'],
    queryFn: () => {
      return categoryService.getCategory(id as string)
    },
    onSuccess:()=>{
      reset(category?.data.getaCategory)
    }
  })

  const editCategoryMutation = useMutation ({
    mutationFn: (body) => categoryService.editCategory(body)
  })
  
  const onSubmit = (value: any) => {
    editCategoryMutation.mutate({id,...value}, {
      onSuccess() {
        enqueueSnackbar('Sửa danh mục mới thành công', { variant: 'success' })
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
          // isLoading={addNewCateogyMutations.isLoading}
          type='submit'
          className='px-10 py-3 text-sm rounded mt-5'
          kind='secondary'
        >
          Edit
        </Button>
      </form>
    </div>
  )
}

export default CategoriesEdit
