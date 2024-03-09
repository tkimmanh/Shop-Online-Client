import { CiSearch, CiHeart, CiUser } from 'react-icons/ci'
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

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const { setIsOpenModal } = useContext(AppContext)
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
        <div className='relative flex-1 flex justify-end'>
          <button className='mx-2 relative'>
            <CiSearch size={26} />
          </button>
          <Link to={routes.Login.path}>
            <button className='mx-2 relative'>
              <CiUser size={26} />
            </button>
          </Link>
          <button className='mx-2 relative'>
            <CiHeart size={26} />
            <span className={classNames(badgeBgClass, 'absolute -right-2 -top-1 text-xs rounded-full px-1')}>3</span>
          </button>
          <Link to={routes.CartPayment.path}>
            <button className='mx-2 relative'>
              <IoBagOutline size={26} />
              <span className={classNames(badgeBgClass, 'absolute -right-2 -top-1 text-xs rounded-full px-1')}>5</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
