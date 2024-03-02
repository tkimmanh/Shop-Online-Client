import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  children: ReactNode
}

const Title = ({ children }: Props) => {
  return <div className='text-xs font-medium w-[300px] uppercase'>{children}</div>
}

export default Title
