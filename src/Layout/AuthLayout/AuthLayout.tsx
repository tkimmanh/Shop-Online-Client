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
            src='https://images.unsplash.com/photo-1731433485113-11b5939894f1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
