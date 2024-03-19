import React, { useState } from 'react'
import { FiMinus } from 'react-icons/fi'
import { GoPlus } from 'react-icons/go'

interface QuantitySelectorProps {
  initialQuantity?: number
  onQuantityChange?: (quantity: number) => void
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ initialQuantity = 1, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(initialQuantity)

  const handleIncrease = () => {
    const newQuantity = quantity + 1
    setQuantity(newQuantity)
    onQuantityChange?.(newQuantity)
  }

  const handleDecrease = () => {
    const newQuantity = Math.max(1, quantity - 1)
    setQuantity(newQuantity)
    onQuantityChange?.(newQuantity)
  }

  return (
    <div className='flex col-span-3'>
      <button
        className=' text-center text-[20px] font-[400] flex items-center justify-center cursor-pointer'
        onClick={handleDecrease}
      >
        <div className='border border-[#000] w-[42px] h-[40px] flex items-center justify-center cursor-pointer'>
          <FiMinus />
        </div>
      </button>
      <input
        type='text'
        value={quantity}
        readOnly
        className='border-t border-b border-[#000] w-[42px] h-[40px] text-center text-[18px] font-[400] leading-[31px]'
      />
      <button className='text-center text-[20px] font-[400]' onClick={handleIncrease}>
        <div className='border border-[#000] w-[42px] h-[40px] flex items-center justify-center cursor-pointer'>
          <GoPlus />
        </div>
      </button>
    </div>
  )
}

export default QuantitySelector
