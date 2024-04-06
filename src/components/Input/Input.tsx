import React from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'
interface Props {
  type: React.InputHTMLAttributes<HTMLInputElement>['type']
  errorMessage?: string
  placeholder?: string
  className?: string
  name?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions
  autoComplete?: string
  classNameErrors?: string
  classNameInput?: string
  defaultValue?: any
}
const Input = ({
  type,
  errorMessage,
  placeholder,
  className,
  name,
  autoComplete,
  register,
  rules,
  classNameErrors = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
  classNameInput = `p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm  ${className}`,
  ...rest
}: Props) => {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      <input
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={classNameInput}
        {...registerResult}
        {...rest}
      />
      <div className={classNameErrors}>{errorMessage}</div>
    </div>
  )
}

export default Input
