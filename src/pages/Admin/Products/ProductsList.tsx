import { useSnackbar } from 'notistack'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'
import { routes } from 'src/routes/routes'
import productsService from 'src/services/products.service'

const ProductsList = () => {
  const { enqueueSnackbar } = useSnackbar()

  const deleteProductMutations = useMutation({
    mutationFn: (body: any) => productsService.deleteProduct(body),
    onSuccess: () => {
      enqueueSnackbar('Xoá thành công', { variant: 'success' })
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
                Category
              </th>
              <th scope='col' className='px-6 py-3'>
                Price
              </th>
              <th scope='col' className='px-6 py-3'>
                <span className='sr-only'>Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className='bg-white border-b'>
              <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                Apple MacBook Pro 17"
              </th>
              <td className='px-6 py-4'>Silver</td>
              <td className='px-6 py-4'>Laptop</td>
              <td className='px-6 py-4'>$2999</td>
              <td className='px-6 py-4 text-right'>
                <a href='#' className='font-medium text-blue-600 hover:underline'>
                  Edit
                </a>
                <span
                  className='font-medium text-red-600 ml-[10px] hover:underline cursor-pointer'
                  onClick={() => handleDelete(111111)}
                >
                  Delete
                </span>
              </td>
            </tr>
            <tr className='bg-white border-b'>
              <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                Microsoft Surface Pro
              </th>
              <td className='px-6 py-4'>White</td>
              <td className='px-6 py-4'>Laptop PC</td>
              <td className='px-6 py-4'>$1999</td>
              <td className='px-6 py-4 text-right'>
                <a href='#' className='font-medium text-blue-600 hover:underline'>
                  Edit
                </a>
                <span
                  className='font-medium text-red-600 ml-[10px] hover:underline cursor-pointer'
                  onClick={() => handleDelete(111111)}
                >
                  Delete
                </span>
              </td>
            </tr>
            <tr className='bg-white'>
              <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                Magic Mouse 2
              </th>
              <td className='px-6 py-4'>Black</td>
              <td className='px-6 py-4'>Accessories</td>
              <td className='px-6 py-4'>$99</td>
              <td className='px-6 py-4 text-right'>
                <a href='#' className='font-medium text-blue-600 hover:underline'>
                  Edit
                </a>
                <span
                  className='font-medium text-red-600 ml-[10px] hover:underline cursor-pointer'
                  onClick={() => handleDelete(111111)}
                >
                  Delete
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductsList
