import { ReactNode, useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import Sidebar from './Sidebar'
import Logo from 'src/components/Logo'

type DashboardLayoutProps = {
  children: ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user } = useContext(AppContext)
  return (
    <div>
      <div className='w-full grid  h-[71px]'>
        <div className='col-span-6  border-b py-[20px] flex justify-end pr-[20px] items-center cursor-pointer'>
          <p className='pr-[10px]'>
            <strong>hello</strong> {user?.full_name}
          </p>
        </div>
      </div>
      <div className='grid grid-cols-7 h-[calc(100vh-71px)]'>
        <div className='col-span-1 h-screen shadow-xl'>
          <Sidebar />
        </div>
        <div className='col-span-6 pt-[30px] px-[20px]'>{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout
