import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import 'dayjs/locale/vi'
import { Link } from 'react-router-dom'
import { routes } from 'src/routes/routes'
dayjs.extend(relativeTime)
dayjs.locale('vi')

const NotificationModal = ({ notifications, onNotificationClick }: any) => {
  return (
    <div className='w-[525px]'>
      <h1 className='text-center py-2 font-semibold'>Thông báo</h1>

      <div className='flex flex-col overflow-y-auto max-h-[350px]'>
        {notifications.map((notification: any) => (
          <div
            key={notification._id}
            onClick={() => onNotificationClick(notification._id)}
            className={`flex items-center p-3 gap-4 border-b border-gray-200 ${
              !notification.read ? 'bg-gray-100' : 'bg-white'
            }`}
          >
            <div className='w-14 h-14 object-cover'>
              <img src={notification?.product_thumbnail} alt='' />
            </div>
            <div className='my-2 w-full'>
              <div className='flex justify-between items-center pb-2'>
                <Link to={routes.ListOrder.path} className='font-medium'>
                  {notification?.product_title}
                </Link>
                <span className='text-sm text-gray-400 font-semibold italic'>
                  {dayjs(notification.createdAt).fromNow()} {notification?.read ? '✓' : ''}
                </span>
              </div>
              <p className='text-sm'>{notification?.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default NotificationModal
