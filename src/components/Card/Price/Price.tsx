import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Price = ({ children }: Props) => {
  return <div className='text-base font-medium'>{children}</div>
}

export default Price
