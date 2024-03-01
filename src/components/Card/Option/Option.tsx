import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  onClick?: () => void
}

const Option = ({ children, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className='w-9 h-9 bg-white rounded-full border shadow-md flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-all '
    >
      {children}
    </button>
  )
}

export default Option
