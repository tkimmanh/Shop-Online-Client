import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Price = ({ children }: Props) => {
  return <div className='lg:text-base text-sm font-medium'>{children}</div>
}

export default Price
