import { ButtonHTMLAttributes } from 'react'
import Loading from '../Loading'
import classNames from 'src/utils/classNames'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children: string
  isLoading?: boolean
  kind: 'primary' | 'secondary' | 'ghost'
}

const Button = ({ className = '', children = 'Shop now', isLoading = false, kind, ...rest }: ButtonProps) => {
  const disableButton = isLoading ? 'pointer-events-none bg-black text-white ' : ''
  let defaultClassName = 'uppercase font-normal border border-solid '

  switch (kind) {
    case 'primary':
      defaultClassName +=
        'text-black border-black bg-transparent hover:bg-black hover:text-white hover:border-transparent'
      break
    case 'secondary':
      defaultClassName += 'bg-black text-white border-black'
      break
    case 'ghost':
      defaultClassName +=
        'border-white bg-transparent text-white hover:bg-black hover:text-white hover:border-transparent'
      break
    default:
      'primary'
      break
  }

  const combinedClassName = `${className} ${defaultClassName} ${isLoading ? disableButton : ''}`

  return (
    <button className={classNames(combinedClassName, className)} {...rest}>
      {isLoading ? <Loading /> : children}
    </button>
  )
}

export default Button
