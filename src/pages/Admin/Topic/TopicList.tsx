import { enqueueSnackbar } from 'notistack'
import { useMutation, useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'
import { routes } from 'src/routes/routes'
import topicService from 'src/services/topic.service'


const TopicsList = () => {
  const { data: topics } = useQuery({
    queryKey: ['TOPICS'],
    queryFn: () => {
      return topicService.getAllTopic()
    }
  })

  
  const deleteOrderMutation = useMutation({
    mutationFn: (id: string) => topicService.deleteTopic(id)
  })
  const handleDeleteCategory = (id: string) => {
    deleteOrderMutation.mutate(id, {
      onSuccess: () => {
        enqueueSnackbar('Xóa thành công', { variant: 'success' })
      }
    })
  }

  return (
    <div>
      <div className='flex items-center justify-between gap-x-5 mb-5'>
        <Heading>Quản lý Blog</Heading>
        <Link to={routes.TopicsAddNew.path}>
          <Button className='py-2 px-6 text-xs' kind='primary'>
            Thêm mới
          </Button>
        </Link>
      </div>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                ID
              </th>
              <th scope='col' className='px-6 py-3'>
                Tên chủ đề
              </th>
            </tr>
          </thead>
          <tbody>
            {topics?.data.getAllTopic.map((topic: any) => {
              return (
                <tr className='bg-white border-b' key={topic._id}>
                  <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                    {topic._id}
                  </th>
                  <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                    {topic.name}
                  </th>
                  <td className='px-6 py-4 text-right'>
                    <Link
                      to={`${`/admin/topic/${topic._id}`}`}
                      className='font-medium text-blue-600 hover:underline mr-2'
                    >
                      Chỉnh sửa
                    </Link>
                    <button
                      className='font-medium text-red-600 hover:underline'
                      // disabled={category.status === messageOrder.ORDER_PEDDING}
                      onClick={() => handleDeleteCategory(topic._id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TopicsList
