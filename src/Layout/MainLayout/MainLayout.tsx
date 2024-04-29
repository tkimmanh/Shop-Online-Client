import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import { ReactNode } from 'react'

type MainLayoutProps = {
  children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
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

  return (
    <>
      <Header></Header>
      <div>{children}</div>
      <Footer></Footer>
    </>
  )
}

export default MainLayout
