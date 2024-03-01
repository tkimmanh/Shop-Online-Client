import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import { ReactNode } from 'react'

type MainLayoutProps = {
  children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Header></Header>
      <div>{children}</div>
      <Footer></Footer>
    </>
  )
}

export default MainLayout
