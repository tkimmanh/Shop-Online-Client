import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { useQuery, useMutation } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'
import Input from 'src/components/Input'
import { routes } from 'src/routes/routes'
import topicService from 'src/services/topic.service'


const Topicsedit = () => {
  const { register, reset, handleSubmit } = useForm()
  const { enqueueSnackbar } = useSnackbar()
  const { id } = useParams()
  // const addNewCateogyMutations = useQuery({
  //   mutationFn: () => categoryService.getCategoies(id as string)
  // })
  useQuery({
    queryKey: ['TOPIC', id],
    queryFn: () => topicService.getTopic(id as string),
    onSuccess: (data) => {
      reset(data?.data?.getOneTopic)
    }
  })



  const editCategoryMutation = useMutation({
    mutationFn: (body) => topicService.editTopic(body)
  })

  const onSubmit = (value: any) => {
    editCategoryMutation.mutate(
      { id, ...value },
      {
        onSuccess() {
          enqueueSnackbar('Sửa chủ đề thành công', { variant: 'success' })
        }
      }
    )
  }

  return (
    <div>
      <div className='flex items-center justify-between gap-x-5 mb-5'>
        <Heading>Chỉnh sửa chủ đề</Heading>
        <Link to={routes.TopicsAdmin.path}>
          <Button className='py-2 px-6 text-xs' kind='primary'>
            Quản lý chủ đề
          </Button>
        </Link>
      </div>
      <form action='' onSubmit={handleSubmit(onSubmit)}>
        <div className='w-full grid grid-cols-10 gap-x-2'>
          <Input className='col-span-5' type='text' name='name' register={register} placeholder='Name'></Input>
        </div>
        <Button
          isLoading={editCategoryMutation.isLoading}
          type='submit'
          className='px-10 py-3 text-sm rounded mt-5'
          kind='secondary'
        >
          Chỉnh sửa
        </Button>
      </form>
    </div>
  )
}

export default Topicsedit
