import { CiBellOn, CiHeart, CiUser } from 'react-icons/ci'
import { useState, useEffect, useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import { IoBagOutline } from 'react-icons/io5'
import { useLocation } from 'react-router-dom'
import classNames from 'src/utils/classNames'
import { routes } from 'src/routes/routes'
import { Link } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import { links } from 'src/constants'
import Logo from '../Logo'
import Popover from '../Popover'
import { io } from 'socket.io-client'
import { clearLocalStorage } from 'src/utils/localStorage'
import usersService from 'src/services/users.service'
import { enqueueSnackbar } from 'notistack'
import NotificationModal from 'src/components/NotificationModal/NotificationModal'
import { useQuery } from 'react-query'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, isAuthenticated, setIsAuthenticated } = useContext(AppContext)
  const location = useLocation()
  const [_showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [activePopover, setActivePopover] = useState<string | null>(null)
  const [unreadCount, setUnreadCount] = useState(0)

  const handlePopoverToggle = (popoverId: string) => {
    if (activePopover === popoverId) {
      setActivePopover(null)
    } else {
      setActivePopover(popoverId)
    }
  }

  const { data, error, isLoading } = useQuery(['notifications', user?._id], () => usersService.notifyUser(), {
    enabled: !!user?._id && isAuthenticated,
    onSuccess: (response) => {
      setNotifications(response?.data?.notifications)
    },
    onError: (error) => {
      console.error('Lỗi lấy thông báo:', error)
    }
  })

  useEffect(() => {
    if (data) {
      setNotifications(data?.data?.notifications)
    }
  }, [data])

  useEffect(() => {
    if (isAuthenticated) {
      const userId = user?._id
      const socket = io('http://localhost:8001', { query: { userId } })

      socket.on('notification', (notification) => {
        if (notification.user_id === userId) {
          enqueueSnackbar(notification.message, { variant: 'info' })
          setUnreadCount((prev) => prev + 1)
        }
      })
      return () => {
        socket.disconnect()
      }
    }
  }, [user?._id])

  const markNotificationAsRead = (notificationId: string) => {
    // Gọi API để đánh dấu thông báo là đã đọc
    usersService
      .readNotify(notificationId)
      .then(() => {
        setNotifications((currentNotifications: any) =>
          currentNotifications.map((notif: any) => {
            if (notif._id === notificationId) {
              return { ...notif, read: true }
            }
            return notif
          })
        )
        // Cập nhật số lượng thông báo chưa đọc
        setUnreadCount((prev) => Math.max(0, prev - 1))
      })
      .catch((error) => {
        console.error('Lỗi đánh dấu thông báo:', error)
      })
  }

  // Cập nhật số thông báo chưa đọc
  useEffect(() => {
    setUnreadCount(notifications.filter((notif: any) => !notif?.read).length)
  }, [notifications])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    if (location.pathname === '/') {
      window.addEventListener('scroll', handleScroll)
    }

    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])
  const handleLogout = () => {
    clearLocalStorage()
    setIsAuthenticated(false)
    window.location.href = routes.Login.path
  }

  const headerClassDefaults = location.pathname === '/' ? 'fixed' : 'relative'
  const headerClass = location.pathname === '/' && isScrolled ? 'bg-black shadow-md fixed' : ' bg-transparent '
  const textColorClass = location.pathname === '/' ? 'text-white' : 'text-black'
  const badgeBgClass = location.pathname === '/' && isScrolled ? 'bg-white text-black' : 'text-white bg-black'
  return (
    <div
      className={classNames(
        headerClassDefaults,
        headerClass,
        'top-0 left-0 w-full z-50 transition-colors duration-300 lg:h-24 h-16'
      )}
    >
      <div className={classNames(textColorClass, 'uppercase text-xs flex items-center h-full justify-between mx-5')}>
        <div className='flex-1 lg:flex hidden'>
          {links.map((link) => (
            <Link
              className={classNames(textColorClass, 'mr-10 font-normal tracking-wide')}
              to={link.path}
              key={link.id}
            >
              {link.text}
            </Link>
          ))}
        </div>

        <div className='flex-1 lg:hidden'>
          <button>
            <FiMenu size={26} />
          </button>
        </div>
        <div className='flex-1 flex items-center justify-center '>
          <Logo isScroll={isScrolled} location={location.pathname} />
        </div>
        {/* Popover thông báo */}
        <div className='relative flex-1 flex justify-end'>
          <Popover
            isOpen={activePopover === 'notifications'}
            onToggle={() => handlePopoverToggle('notifications')}
            renderPopover={
              <NotificationModal
                notifications={notifications}
                onNotificationClick={markNotificationAsRead}
              ></NotificationModal>
            }
          >
            <button className='relative' onClick={() => setShowNotifications(true)}>
              <CiBellOn size={26} />
              <span className={classNames(badgeBgClass, 'absolute -right-2 -top-1 text-xs rounded-full px-1')}>
                {unreadCount}
              </span>
            </button>
          </Popover>

          {/* Popover menu */}
          <Popover
            isOpen={activePopover === 'userMenu'}
            onToggle={() => handlePopoverToggle('userMenu')}
            renderPopover={
              <div className='flex flex-col '>
                {isAuthenticated ? (
                  <>
                    <Link className='mt-5 px-3 py-3 inline-block cursor-pointer' to={routes.Profile.path}>
                      Tài khoản
                    </Link>
                    <Link className='px-3 py-3' to={routes.WishList.path}>
                      Sản phẩm yêu thích
                    </Link>
                    <Link className='px-3 py-3' to={routes.ListOrder.path}>
                      Danh sách đơn hàng
                    </Link>
                    {user?.role === 'admin' && (
                      <Link className='px-3 py-3' to={routes.Dashboard.path}>
                        Dashboard
                      </Link>
                    )}
                    {user?.role === 'staff' && (
                      <Link className='px-3 py-3' to={routes.ListOrderAdmin.path}>
                        Kiểm tra đơn hàng '(staff)'
                      </Link>
                    )}
                    <button onClick={handleLogout} className=' px-3 py-3 inline-block cursor-pointer text-left'>
                      Đăng xuất
                    </button>
                  </>
                ) : (
                  <Link className='px-3 py-3' to={routes.Login.path}>
                    Đăng nhập
                  </Link>
                )}
              </div>
            }
          >
            <>
              <button className={'mx-2 relative block'}>
                <CiUser size={26} />
              </button>
            </>
          </Popover>
        </div>
        <Link to={routes.WishList.path}>
          <button className='mx-2 relative'>
            <CiHeart size={26} />
            <span className={classNames(badgeBgClass, 'absolute -right-2 -top-1 text-xs rounded-full px-1')}>
              {user?.wishlist.length}
            </span>
          </button>
        </Link>
        <Link to={routes.CartPayment.path}>
          <button className='mx-2 relative'>
            <IoBagOutline size={26} />
            <span className={classNames(badgeBgClass, 'absolute -right-2 -top-1 text-xs rounded-full px-1')}>
              {user?.cart.length}
            </span>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Header
