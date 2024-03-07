import React from 'react'
import { twMerge } from 'tailwind-merge'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errMessage?: string
  title?: string
  isRequired?: boolean
}

const InputCustom = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', errMessage, title, isRequired, ...props }, ref) => {
    return (
      <div className='mb-[10px]'>
        {title && (
          <p className='font-[400] text-[16px] mb-[10px] flex'>
            {title} {isRequired && <span className='required'></span>}
          </p>
        )}
        <input
          type={type}
          className={twMerge(
            'p-3 w-full outline-none border rounded-sm focus:shadow-sm',
            className && className,
            errMessage && 'border-red-300 focus:border-red-500',
            !errMessage && 'border-gray-300 focus:border-gray-500'
          )}
          ref={ref}
          {...props}
        />
        {errMessage && <p className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errMessage}</p>}
      </div>
    )
  }
)

export { InputCustom }
