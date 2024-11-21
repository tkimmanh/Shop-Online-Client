import { useSnackbar } from 'notistack'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'
import { routes } from 'src/routes/routes'
import productsService from 'src/services/products.service'

const ProductsDeleted = () => {
  const { enqueueSnackbar } = useSnackbar()

  const queryClient = useQueryClient()
  const { data: listProducts } = useQuery({
    queryKey: 'list-products',
    queryFn: () => {
      return productsService.getAllProducts({ status: false })
    }
  })

  const restoreProductMutations = useMutation({
    mutationFn: (body: any) => productsService.setStatusProduct(body),
    onSuccess: () => {
      enqueueSnackbar('Đã khôi phục sản phẩm', { variant: 'success' })
      queryClient.invalidateQueries('list-products')
    },
    mutationKey: 'list-products'
  })

  const deleteProductMutations = useMutation({
    mutationFn: (body: any) => productsService.deleteProduct(body),
    onSuccess: () => {
      enqueueSnackbar('Xoá thành công', { variant: 'success' })
      queryClient.invalidateQueries('list-products')
    },
    mutationKey: 'list-products'
  })

  const handleDelete = async (id: string | number) => {
    try {
      if (confirm('Xóa sản phẩm?')) {
        await deleteProductMutations.mutateAsync(id)
      }
    } catch (error) {}
  }

  const handleRestore = async (body: { id: string | number; status: boolean }) => {
    try {
      if (confirm('Khôi phục sản phẩm?')) {
        await restoreProductMutations.mutateAsync(body)
      }
    } catch (error) {}
  }

  return (
    <div>
      <div className='flex items-center justify-between gap-x-5 mb-5'>
        <Heading>Quản lý sản phẩm đã xoá</Heading>
        <Link to={routes.ProductAddNew.path}>
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
                Tên sản phẩm
              </th>
              <th scope='col' className='px-6 py-3'>
                Màu sắc
              </th>
              <th scope='col' className='px-6 py-3'>
                Số lượng
              </th>
              <th scope='col' className='px-6 py-3'>
                Danh mục
              </th>
              <th scope='col' className='px-6 py-3'>
                Giá
              </th>
              <th scope='col' className='px-6 py-3'>
                Đã bán
              </th>
              <th scope='col' className='px-6 py-3'>
                Đang hiển thị
              </th>
            </tr>
          </thead>
          <tbody>
            {listProducts?.data?.products?.map((_item: any) => {
              return (
                <tr className='bg-white border-b'>
                  <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                    {_item?.title}
                  </th>
                  <td className='px-6 py-4'>{_item?.colors?.map((x: any) => x?.name).join(', ')}</td>
                  <td className='px-6 py-4'>
                    {_item?.quantity === 0 ? (
                      <span className='text-red-500 w-5 h-5 px-5 py-2 rounded-lg bg-red-200'>{_item?.quantity}</span>
                    ) : (
                      <span className='text-green-500 w-5 h-5 px-5 py-2 rounded-lg bg-green-200'>
                        {_item?.quantity}
                      </span>
                    )}
                  </td>
                  <td className='px-6 py-4'>{_item?.category?.title}</td>
                  <td className='px-6 py-4'>{_item?.price}</td>
                  <td className='px-6 py-4'>{_item?.sold}</td>
                  <td className='px-6 py-4'>
                    {_item?.status === false ? (
                      <div className='w-3 h-3 rounded-full bg-red-500'></div>
                    ) : (
                      <div className='w-3 h-3 rounded-full bg-green-500'></div>
                    )}
                  </td>
                  <td className='px-6 py-4 text-center'>
                    <button
                      onClick={() => handleRestore({ id: _item?._id, status: true })}
                      className='font-medium text-blue-600 hover:underline cursor-pointer'
                    >
                      Khôi phục sản phẩm
                    </button>

                    <button
                      className='font-medium text-red-600 ml-[10px] hover:underline cursor-pointer'
                      onClick={() => handleDelete(_item?._id)}
                    >
                      Xóa sản phẩm
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

export default ProductsDeleted
