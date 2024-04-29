import { ReactNode, useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import Sidebar from './Sidebar'

type DashboardLayoutProps = {
  children: ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  ;(function (_d, m) {
    var kommunicateSettings = {
      appId: '1f5ecc0ced6ace672750cb82d627dbb0b',
      popupWidget: true,
      automaticChatOpenOnNavigation: true
    }
    var s = document.createElement('script')
    s.type = 'text/javascript'
    s.async = true
    s.src = 'https://widget.kommunicate.io/v2/kommunicate.app'
    var h = document.getElementsByTagName('head')[0]
    h.appendChild(s)
    ;(window as any).kommunicate = m
    m._globals = kommunicateSettings
  })(document, (window as any).kommunicate || {})

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
