import { ReactNode } from 'react'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'

type AuthLayoutProps = {
  children: ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div>
      <Header></Header>
      <div className='lg:p-10 p-5 lg:gap-x-0 md:gap-x-5 w-full lg:max-w-full lg:grid md:gird flex items-center md:flex-row  flex-col md:grid-cols-10 lg:grid-cols-10'>
        <div className='col-span-6 lg:max-w-[707px] md:max-w-[400px]  w-full'>
          <img
            className='lg:h-[705px] w-full md:h-[400px] object-cover'
            src='https://wpbingosite.com/wordpress/bedesk/wp-content/uploads/2023/06/account-banner.jpg'
            alt=''
          />
        </div>
        <div className='w-full md:col-span-4 lg:col-span-4'>{children}</div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default AuthLayout
