import dayjs from 'dayjs'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import Heading from 'src/components/Heading'
import userService from 'src/services/users.service'

const Userlist = () => {
  const { data: users } = useQuery({
    queryKey: ['USERS'],
    queryFn: () => {
      return userService.getAllUser()
    }
  })

  return (
    <div>
      <div className='flex items-center justify-between gap-x-5 mb-5'>
        <Heading>Quản lý người dùng</Heading>
        {/* <Link to={routes.UsersAddNew.path}>
          <Button className='py-2 px-6 text-xs' kind='primary'>
            Thêm mới
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
                Tên
              </th>
              <th scope='col' className='px-6 py-3'>
                Email
              </th>
              <th scope='col' className='px-6 py-3'>
                Số điện thoại
              </th>
              <th scope='col' className='px-6 py-3'>
                Ngày tạo
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.data?.result?.map((user: any) => {
              return (
                <tr className='bg-white border-b' key={user._id}>
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
                    {dayjs(user.createdAt).format('DD/MM/YYYY')}
                  </th>

                  <td className='px-6 py-4 text-right'>
                    <Link
                      to={`${`/admin/user/${user._id}`}`}
                      className='font-medium text-blue-600 hover:underline mr-[10px]'
                    >
                      Chỉnh sửa
                    </Link>
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

export default Userlist
