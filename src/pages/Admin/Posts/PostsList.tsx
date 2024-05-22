import { useSnackbar } from 'notistack'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'
import { routes } from 'src/routes/routes'
import postsService from 'src/services/posts.service'

const PostsList = () => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data: listPosts } = useQuery({
    queryKey: ['list-products', { status: true }],
    queryFn: () => {
      return postsService.getAllPosts({ status: true })
    }
  })


  const deleteOrderMutation = useMutation({
    mutationFn: (id: string) => postsService.deletePosts(id)
  })
  const handleDeletePost = (id: string) => {
    deleteOrderMutation.mutate(id, {
      onSuccess: () => {
        enqueueSnackbar('Xóa thành công', { variant: 'success' })
      }
    })
  }

  return (
    <div>
      <div className='flex items-center justify-between gap-x-5 mb-5'>
        <Heading>Quản lý bài viết</Heading>
        <Link to={routes.PostsAddNew.path}>
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
                Tên Bài viết
              </th>
              <th scope='col' className='px-6 py-3'>
                Tác giả
              </th>
              <th scope='col' className='px-6 py-3'>
                Chủ đề
              </th>
            </tr>
          </thead>
          <tbody>
            {listPosts?.data?.posts?.map((_item: any) => {
              return (
                <tr className='bg-white border-b'>
                  <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                    {_item?.title}
                  </th>
                  <td className='px-6 py-4'>{_item?.author?.full_name}</td>
                  <td className='px-6 py-4'>{_item?.topic?.name}</td>
                  <td className='px-6 py-4 text-center'>
                    <button
                      className='font-medium text-blue-600 hover:underline cursor-pointer'
                      onClick={() => navigate(routes.PostsEdit.path.replace(':id', _item?._id.toString()))}
                    >
                      Chỉnh sửa
                    </button>

                    <button
                      className='font-medium text-red-600 ml-[10px] hover:underline cursor-pointer'
                      onClick={() => handleDeletePost(_item._id)}
                    >
                      Xóa bài viết
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

export default PostsList
