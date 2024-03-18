import { Link, useLocation } from 'react-router-dom'
import { linksDashboard } from 'src/constants'
import { twMerge } from 'tailwind-merge'

const Sidebar = () => {
  const location = useLocation()

  return (
    <div className='h-full'>
      <div
        className={twMerge(
          'flex-col text-[16px] font-medium rounded-[12px] flex gap-[20px] items-center cursor-pointer mt-[10px] mx-[10px]'
        )}
      >
        {linksDashboard.map((link) => {
          const isActive = location.pathname === link.path
          const linkClass = twMerge(
            'text-sm w-full py-[10px] px-[10px] rounded-md hover:text-white hover:bg-green-500',
            isActive ? 'text-white bg-green-500' : ''
          )

          return (
            <Link className={linkClass} key={link.id} to={link.path}>
              {link.text}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar
