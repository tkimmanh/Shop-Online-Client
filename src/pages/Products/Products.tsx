import { listProducts } from 'src/constants/data.constants'
import { colors } from 'src/constants/colors.constants'
import { formatMoney } from 'src/utils/formatMoney'
import Card from 'src/components/Card/CardMain'
import Price from 'src/components/Card/Price'
import Title from 'src/components/Card/Title'
import Button from 'src/components/Button'
import { useForm } from 'react-hook-form'
import Input from 'src/components/Input'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Products = () => {
  const { register } = useForm()
  const [_selectedColor, setSelectedColor] = useState('')
  return (
    <div className='mt-10'>
      <div className='grid lg:grid-cols-10'>
        <div className='lg:col-span-3 hidden md:inline-block lg:inline-block lg:ml-10'>
          <div className='flex flex-col gap-y-4'>
            <h1 className='tracking-widest text-xs text-left font-medium'>CATEGORIES</h1>
            <form className='flex flex-col gap-y-4 text-base'>
              <span>All Product</span>
              <span>All Product</span>
              <span>All Product</span>
              <span>All Product</span>
            </form>
          </div>
          <div className='border-b border-solid w-[80%] my-5'></div>
          <h1 className='tracking-widest text-xs text-left font-medium'>PRICE</h1>
          <form className='max-w-[338px] ' action=''>
            <div className='mb-5 mt-5'>
              <Input
                register={register}
                placeholder='from *'
                className='h-8 border-black'
                type='text'
                name='to'
              ></Input>
            </div>
            <div className='mb-5'>
              <Input
                register={register}
                placeholder='to *'
                className='h-8 border-black'
                type='text'
                name='from'
              ></Input>
            </div>
            <Button className='w-full py-3 text-xs' kind='secondary'>
              Apply
            </Button>
          </form>
          <div className='border-b border-solid w-[80%] my-5'></div>
          <div>
            <h1 className='tracking-widest text-xs text-left font-medium'>COLOR</h1>
            <div className='flex flex-col '>
              {colors.map((color) => (
                <div className='flex items-center gap-x-5 '>
                  <button
                    key={color.id}
                    style={{ backgroundColor: color.color }}
                    className='w-9 h-9 focus:outline-none my-2'
                    onClick={() => setSelectedColor(color.color)}
                  ></button>
                  <span>{color.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className='border-b border-solid w-[80%] my-5'></div>
        </div>
        <div className='col-span-7'>
          <p className='mb-4 text-sm'>Showing 1–12 of 18 item(s)</p>
          <div className='grid lg:grid-cols-3 gap-5 grid-cols-2'>
            {listProducts.map((product) => {
              return (
                <div key={product.id}>
                  <Card image={product.imageUrl}></Card>
                  <Link className='inline-block' to={`${product.id}`}>
                    <div className='mt-5 flex w-full flex-col gap-y-2'>
                      <Title>{product.name}</Title>
                      <Price>{formatMoney(product.price)}</Price>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
