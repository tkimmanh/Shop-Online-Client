import { enqueueSnackbar } from 'notistack'
import {  useMutation, useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'
import { routes } from 'src/routes/routes'
import userService from 'src/services/users.service'

const Userlist = () => {
  const { data: users } = useQuery({
    queryKey: ['USERS'],
    queryFn: () => {
      return userService.getAllUser()
    }
  })
  const deleteOrderMutation = useMutation({
    mutationFn: (id: string) => userService.delete(id)
  })
  const handleDeleteUser = (id: string) => {
    deleteOrderMutation.mutate(id, {
      onSuccess: () => {
        enqueueSnackbar('Xóa thành công', { variant: 'success' })
      }
    })
  }
  return (
    <div>
      <div className='flex items-center justify-between gap-x-5 mb-5'>
        <Heading>User Manage</Heading>
        {/* <Link to={routes.UsersAddNew.path}>
          <Button className='py-2 px-6 text-xs' kind='primary'>
            Add new
          </Button>
        </Link> */}
      </div>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
            <th scope='col' className='px-6 py-3'>
                ID
              </th>
              <th scope='col' className='px-6 py-3'>
                User Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Email
              </th>
              <th scope='col' className='px-6 py-3'>
                Phone
              </th>
              <th scope='col' className='px-6 py-3'>
                Create At
              </th>
              <th scope='col' className='px-6 py-3'>
                Update At
              </th>
              <th scope='col' className='px-6 py-3'>
                <span className='sr-only'>Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
          {users?.data.getAllUsers.map((user : any)  => {
              return <tr className='bg-white border-b' key={user._id}>
                <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                  {user._id}
                </th>
                <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                  {user.full_name}
                </th>
                <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                  {user.email}
                </th>
                <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                  {user.phone}
                </th>
                <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                {new Date(user.createdAt).toLocaleString()}
                </th>
                <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                {new Date(user.updatedAt).toLocaleString()}
                </th>
                <td className='px-6 py-4 text-right'>
                  {/* <Link to={`${`/admin/user/${user._id}`}`} className='font-medium text-blue-600 hover:underline'>
                    Edit
                  </Link> */}
                  <button className='font-medium text-red-600 hover:underline'
                    // disabled={category.status === messageOrder.ORDER_PEDDING}
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Userlist
