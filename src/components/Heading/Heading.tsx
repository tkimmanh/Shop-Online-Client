import React from 'react'

interface Props {
  children: string
  className?: string

  [key: string]: any
}

const Heading: React.FC<Props> = ({ children, className, ...rest }) => {
  return (
    <h1 className={`${className} font-americana leading-8 `} {...rest}>
      {children}
    </h1>
  )
}

export default Heading
