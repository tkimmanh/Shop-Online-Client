import { useSnackbar } from 'notistack'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'
import { routes } from 'src/routes/routes'
import productsService from 'src/services/products.service'

const ProductsList = () => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data: listProducts } = useQuery({
    queryKey: 'list-products',
    queryFn: () => {
      return productsService.getAllProducts()
    }
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
      if (confirm('Are you sure you want to delete?')) {
        await deleteProductMutations.mutateAsync(id)
      }
    } catch (error) {}
  }

  return (
    <div>
      <div className='flex items-center justify-between gap-x-5 mb-5'>
        <Heading>Product Manage</Heading>
        <Link to={routes.ProductAddNew.path}>
          <Button className='py-2 px-6 text-xs' kind='primary'>
            Add new
          </Button>
        </Link>
      </div>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Product name
              </th>
              <th scope='col' className='px-6 py-3'>
                Color
              </th>
              <th scope='col' className='px-6 py-3'>
                Quantity
              </th>
              <th scope='col' className='px-6 py-3'>
                Category
              </th>
              <th scope='col' className='px-6 py-3'>
                Price
              </th>
              <th scope='col' className='px-6 py-3'>
                Allow display
              </th>
              <th scope='col' className='px-6 py-3'>
                <span className='sr-only'>Edit</span>
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
                  <td className='px-6 py-4'>
                    {_item?.status === false ? (
                      <span className='text-red-500 w-5 h-5 px-5 py-2 rounded-lg bg-red-200'>false</span>
                    ) : (
                      <span className='text-green-500 w-5 h-5 px-5 py-2 rounded-lg bg-green-200'>true</span>
                    )}
                  </td>
                  <td className='px-6 py-4 text-right'>
                    <span
                      className='font-medium text-blue-600 hover:underline cursor-pointer'
                      onClick={() => navigate(routes.ProductView.path.replace(':id', _item?._id.toString()))}
                    >
                      Edit
                    </span>
                    <span
                      className='font-medium text-red-600 ml-[10px] hover:underline cursor-pointer'
                      onClick={() => handleDelete(_item?._id)}
                    >
                      Delete
                    </span>
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

export default ProductsList
