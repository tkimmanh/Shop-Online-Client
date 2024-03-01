import { Link } from 'react-router-dom'
import { routes } from 'src/routes/routes'

interface Props {
  location?: any
  isScroll?: boolean
}
const Logo = ({ location, isScroll }: Props) => {
  let logoScroll
  if (location === '/' && isScroll) {
    logoScroll = 'https://wpbingosite.com/wordpress/bedesk/wp-content/uploads/2023/08/logo-white.png'
  } else if (location === '/' && !isScroll) {
    logoScroll = 'https://wpbingosite.com/wordpress/bedesk/wp-content/uploads/2023/08/logo-white.png'
  } else if (location !== '/') {
    logoScroll = 'https://wpbingosite.com/wordpress/bedesk/wp-content/uploads/2023/08/logo.png'
  }
  return (
    <>
      <Link to={routes.Home.path}>
        <img className='w-36' srcSet={logoScroll} alt='logo' />
      </Link>
    </>
  )
}

export default Logo
