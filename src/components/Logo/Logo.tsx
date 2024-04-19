import { Link } from 'react-router-dom'
import Heading from 'src/components/Heading'
import { routes } from 'src/routes/routes'

interface Props {
  location?: any
  isScroll?: boolean
}
const Logo = ({ location, isScroll }: Props) => {
  let logoScroll
  if (location === '/' && isScroll) {
    logoScroll = 'text-white'
  } else if (location === '/' && !isScroll) {
    logoScroll = 'text-white'
  } else if (location !== '/') {
    logoScroll = 'text-black'
  }
  return (
    <>
      <Link to={routes.Home.path}>
        <div className='flex flex-col items-center justify-center gap-y-2'>
          <Heading className={`font-medium text-5xl tracking-widest ${logoScroll}`}>Aizy</Heading>
          <p className='tracking-[4px] text-xs uppercase'>Personal Brand</p>
        </div>
      </Link>
    </>
  )
}

export default Logo
