import { enqueueSnackbar } from 'notistack'
import { useMutation, useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'
import { routes } from 'src/routes/routes'
import categoryService from 'src/services/category.service'

const CategoriesList = () => {
  const { data: categories } = useQuery({
    queryKey: ['CATEGORIES'],
    queryFn: () => {
      return categoryService.getAllCategoies()
    }
  })
  const deleteOrderMutation = useMutation({
    mutationFn: (id: string) => categoryService.deleteCategory(id)
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
        <Heading>Quản lý danh mục</Heading>
        <Link to={routes.CategoriesAddNew.path}>
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
                Tên danh mục
              </th>
            </tr>
          </thead>
          <tbody>
            {categories?.data.getallCategory.map((category: any) => {
              return (
                <tr className='bg-white border-b' key={category._id}>
                  <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                    {category._id}
                  </th>
                  <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                    {category.title}
                  </th>
                  <td className='px-6 py-4 text-right'>
                    <Link
                      to={`${`/admin/category/${category._id}`}`}
                      className='font-medium text-blue-600 hover:underline mr-2'
                    >
                      Chỉnh sửa
                    </Link>
                    <button
                      className='font-medium text-red-600 hover:underline'
                      // disabled={category.status === messageOrder.ORDER_PEDDING}
                      onClick={() => handleDeleteCategory(category._id)}
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

export default CategoriesList
