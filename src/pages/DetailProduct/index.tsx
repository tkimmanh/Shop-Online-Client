import React, { useState } from 'react'
import { IoEyeSharp } from 'react-icons/io5'
import { FiMinus } from 'react-icons/fi'
import { GoPlus } from 'react-icons/go'
import { BsBox2 } from 'react-icons/bs'
import { CiHeart } from 'react-icons/ci'
import { GoClock } from 'react-icons/go'
import { MdCompareArrows } from 'react-icons/md'
import { CiShare2 } from 'react-icons/ci'
import styles from './styles.module.scss'
import Product1 from 'src/assets/images/product-1.jpg'
import Product2 from 'src/assets/images/product-2.jpg'
import Product3 from 'src/assets/images/product-3.jpg'
import Product4 from 'src/assets/images/product-4.jpg'
import CardImage from 'src/assets/images/payment-product.png'
import Star from 'src/components/Star'
import { twMerge } from 'tailwind-merge'
import Card from 'src/components/Card/CardMain'
import { Link } from 'react-router-dom'
import Title from 'src/components/Card/Title'
import Price from 'src/components/Card/Price'
import { formatMoney } from 'src/utils/formatMoney'
import { listProducts } from 'src/constants/data.constants'

const DetailProduct = () => {
  const [valueTab, setValueTab] = useState(1)
  return (
    <div className='max-w-[1440px] mx-auto'>
      <div className='text-[15px font-[400] py-[30px]'>
        Home<span className={styles.delimiter}></span>Shop<span className={styles.delimiter}></span>Dresses
        <span className={styles.delimiter}></span>Sheath <span className={styles.delimiter}></span>Laylin Floral Halter
        Cutout Mini Dress
      </div>

      <div className='grid grid-cols-5 gap-[115px]'>
        <div className='col-span-3 grid grid-cols-7  gap-[12px]'>
          <div className='col-span-1 flex flex-col gap-[13px]'>
            <div className='w-full h-[147px]'>
              <img src={Product1} alt='' className='w-full h-full object-cover' />
            </div>
            <div className='w-full h-[147px]'>
              <img src={Product2} alt='' className='w-full h-full object-cover' />
            </div>
            <div className='w-full h-[147px]'>
              <img src={Product3} alt='' className='w-full h-full object-cover' />
            </div>
            <div className='w-full h-[147px]'>
              <img src={Product4} alt='' className='w-full h-full object-cover' />
            </div>
          </div>
          <div className='col-span-6'>
            <div className='w-full h-[1110px]'>
              <img src={Product4} alt='' className='w-full h-full object-cover' />
            </div>
          </div>
        </div>
        <div className='col-span-2'>
          <div className='border-b-[1px] border-[#e5e5e5]'>
            <p className='font-[400] text-[21px] mb-[12px]'>Laylin Floral Halter Cutout Mini Dress</p>
            <div className='flex mb-[12px]'>
              <Star />
              <p className='pl-[10px]'>(1 customer review)</p>
            </div>
            <p className='font-[500] text-[18px] mb-[20px]'>250.000$</p>
          </div>
          <div className='mt-[20px]'>
            <div className='flex items-center mb-[10px]'>
              <IoEyeSharp className={styles.eyes} />
              <span className='text-[16px] font-[500] ml-[10px]'>37 people are viewing this right now</span>
            </div>
            <p className='font-[400] text-[16px] text-[#4e4e4e] mb-[20px] leading-[27px]'>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <p className='text-[16px font-[400] mb-[15px]'>
              Only <span className='text-[#ff0000] text-[16px font-[400]'>47 item(s)</span> left in stock!
            </p>
            <div
              className='h-[3px]'
              style={{ backgroundImage: 'linear-gradient(to right,#FF0000 80%, #eee 20%)' }}
            ></div>
            <div className='grid grid-cols-12 gap-[10px] mt-[20px]'>
              <div className='flex col-span-3'>
                <p className='border border-[#000] w-[42px] h-[40px] text-center text-[20px] font-[400] flex items-center justify-center cursor-pointer'>
                  <FiMinus />
                </p>
                <input
                  type='text'
                  defaultValue={1}
                  className='border-t border-b border-[#000] w-[42px] h-[40px] text-center text-[18px] font-[400] leading-[31px]'
                />
                <p className='border border-[#000] w-[42px] h-[40px] text-center text-[20px] font-[400] flex items-center justify-center cursor-pointer'>
                  <GoPlus />
                </p>
              </div>
              <button
                className='w-full bg-[#000] text-[#fff] hover:bg-[#fff] hover:text-[#000] font-[400] text-[12px] col-span-9 h-[40px]'
                style={{ border: '1px solid #000' }}
              >
                ADD TO CARD
              </button>
            </div>
            <button
              className='w-full bg-[#fff] text-[#000] hover:bg-[#000] hover:text-[#fff] font-[400] text-[12px] h-[40px] mt-[10px]'
              style={{ border: '1px solid #000' }}
            >
              BUY NOW
            </button>
            <div className='flex my-[25px]'>
              <div className='flex items-center cursor-pointer'>
                <p className='p-[8px] bg-[#f6f6f6] rounded-[100%] hover:bg-[#000] hover:text-[#fff]'>
                  <CiHeart />
                </p>
                <p className='text-[16px] font-[400] ml-[10px]'>Add to wishlist</p>
              </div>
              <div className='flex items-center ml-[20px] cursor-pointer'>
                <p className='p-[8px] bg-[#f6f6f6] rounded-[100%] cursor-pointer hover:bg-[#000] hover:text-[#fff]'>
                  <MdCompareArrows />
                </p>
                <p className='text-[16px] font-[400] ml-[10px]'>Compare</p>
              </div>
              <div className='flex items-center ml-[20px] cursor-pointer'>
                <p className='p-[8px] bg-[#f6f6f6] rounded-[100%] cursor-pointer hover:bg-[#000] hover:text-[#fff]'>
                  <CiShare2 />
                </p>
                <p className='text-[16px] font-[400] ml-[10px]'>Share</p>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-[20px]'>
              <div className='bg-[#f6f6f6] p-[10px]'>
                <BsBox2 className='w-[30px] h-auto mb-[10px]' />
                <p className='leading-[27px]'>Free worldwide shipping on all orders over $100</p>
              </div>
              <div className='bg-[#f6f6f6] p-[10px]'>
                <GoClock className='w-[30px] h-auto mb-[10px]' />
                <p className='leading-[27px]'>Delivers in: 3-7 Working Days Shipping & Return</p>
              </div>
            </div>
            <div className='border border-[#e2e2e2] grid grid-cols-5 gap-[20px] py-[20px] px-[25px] mt-[15px]'>
              <div className='col-span-1 leading-[27px]'>Guaranteed Checkout</div>
              <div className='col-span-4 flex justify-center items-center'>
                <img src={CardImage} alt='' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='text-sm font-medium text-center text-gray-500 border-b border-gray-200 mt-[80px]'>
        <ul className='flex justify-center'>
          <li className='me-[60px]'>
            <span
              className={twMerge(
                'inline-block p-2  cursor-pointer text-[22px] text-[#000] leading-[37px]',
                valueTab == 1 && 'border-[#000] border-b-2',
                valueTab != 1 && 'hover:text-gray-600 hover:border-gray-300'
              )}
              onClick={() => setValueTab(1)}
            >
              Description
            </span>
          </li>
          <li className='me-[60px]'>
            <span
              className={twMerge(
                'inline-block p-2  cursor-pointer text-[22px] text-[#000] leading-[37px]',
                valueTab == 2 && 'border-[#000] border-b-2',
                valueTab != 2 && 'hover:text-gray-600 hover:border-gray-300'
              )}
              onClick={() => setValueTab(2)}
            >
              Reviews
            </span>
          </li>
        </ul>
      </div>
      <div className='py-[46px] border-b border-gray-200'>
        {valueTab == 1 ? (
          <div className='grid grid-cols-4 gap-[100px]'>
            <div className='col-span-2'>
              <p className='font-[500] text-[16px] leading-[19px] mb-[20px]'>Details</p>
              <p className='font-[400] text-[16px] leading-[27px] text-[#4e4e4e]'>
                Style No. 68755644; Color Code: 038
              </p>
              <p className='font-[400] text-[16px] leading-[27px] text-[#4e4e4e] mb-[20px]'>
                Turn heads in this stunning maxi dress featured in a forever classic halter-neck silhouette with
                gorgeous embroidery throughout and smocking at waistline for added shape.
              </p>
              <ul className='font-[400] text-[16px] leading-[27px] text-[#4e4e4e] pl-[20px] list-disc'>
                <li>Effortless, pull-on style</li>
                <li>Tiered design</li>
                <li>Deep V-neckline</li>
              </ul>
            </div>
            <div className=''>
              <p className='font-[500] text-[16px] leading-[19px] mb-[20px]'>Care/Import</p>
              <ul className='font-[400] text-[16px] leading-[27px] text-[#4e4e4e] pl-[20px] list-disc'>
                <li>Dolman style sleeves</li>
                <li>Side pockets</li>
                <li>Deep V-neckline</li>
                <li>Discreet bust clasp for modesty</li>
                <li>Large decorative bow detail at front</li>
                <li>Soft elastic waist</li>
                <li>Side splits</li>
              </ul>
            </div>
            <div className=''>
              <p className='font-[500] text-[16px] leading-[19px] mb-[20px]'>Care/Import</p>
              <ul className='font-[400] text-[16px] leading-[27px] text-[#4e4e4e] pl-[20px] list-disc'>
                <li>Bump and breast feeding friendly</li>
                <li>100% Crinkle Viscose</li>
                <li>Cold Hand Wash</li>
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <p className='text-[25px] leading-[30px] mb-[31px]'>0 review for Laylin Floral Halter Cutout Mini Dress</p>
            <button
              className=' bg-[#fff] text-[#000] hover:bg-[#000] hover:text-[#fff] font-[400] text-[12px] h-[47px] w-[151px] mt-[10px]'
              style={{ border: '1px solid #000' }}
            >
              WRITE A REVIEW
            </button>
            <p className='text-[16px] leading-[32px] mt-[20px]'>
              Only logged in customers who have purchased this product may leave a review.
            </p>
          </div>
        )}
      </div>
      <p className='text-[32px] leading-[41px] font-[400] mt-[80px] mb-[50px] text-center'>Related Products</p>
      <div className='grid grid-cols-4 gap-[30px]'>
        {listProducts.slice(0, 4).map((product) => {
          return (
            <div key={product.id}>
              <Card image={product.imageUrl}></Card>
              <Link className='inline-block' to={`${product.id}`}>
                <div className='mt-5 flex w-full flex-col gap-y-2'>
                  <Title>{product.name}</Title>
                  <Price>{Number(product?.price || 0)?.toLocaleString('en')}đ</Price>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DetailProduct
