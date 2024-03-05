import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Title = ({ children }: Props) => {
  return <div className='lg:text-xs text-[10.5px]  font-medium max-w-[300px] uppercase'>{children}</div>
}

export default Title
