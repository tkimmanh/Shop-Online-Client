import { FaDribbble, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Button from '../Button'

const Footer = () => {
  return (
    <div className='mx-7 '>
      <div className='grid lg:grid-cols-4 md:grid-cols-2  grid-cols-1  border-t mt-10'>
        <div className='my-10'>
          <h1 className='text-sm mb-12'>EXPLORE</h1>
          <ul className='flex flex-col gap-y-5 text-[#5f5b6b]'>
            <li>Jewellery</li>
            <li>High Jewellery</li>
            <li>Wedding & Engagement</li>
            <li>Provenance and Peace</li>
            <li>The 4Cs</li>
          </ul>
        </div>
        <div className='my-10'>
          <h1 className='text-sm mb-12'>HELP</h1>
          <ul className='flex flex-col gap-y-5 text-[#5f5b6b]'>
            <li>FAQs</li>
            <li>Shipping</li>
            <li>Returns</li>
            <li>Size Guides</li>
            <li>Materials & Care</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className='my-10'>
          <h1 className='text-sm mb-12'>ABOUT US</h1>
          <ul className='flex flex-col gap-y-5 text-[#5f5b6b]'>
            <li>About Us</li>
            <li>The Rewards Stack</li>
            <li>The Rewards Stack</li>
            <li>Sustainability</li>
            <li>Careers</li>
            <li>Blog</li>
          </ul>
        </div>

        <div className='my-10'>
          <h1 className='text-sm mb-12'>SIGN UP FOR 10% OFF</h1>
          <ul className='flex flex-col gap-y-10 text-[#5f5b6b]'>
            <li>
              <p>Be the first to know about new releases, exclusive promotions, events and styling tips!</p>
            </li>
            <li>
              <div className='flex '>
                <input type='text' className='border py-3 px-5 text-xs lg:w-[70%] w-full' />
                <Button kind='secondary' className='lg:py-3 lg:px-5 py-2 px-3 lg:text-xs w-[30%]'>
                  Đăng nhập
                </Button>
              </div>
            </li>
            <li>
              <div className='flex gap-x-5'>
                <Link to='#' className='border border-black rounded-full w-8 h-8 flex items-center justify-center'>
                  <FaTwitter color='black' fontSize={13} />
                </Link>
                <Link to='#' className='border border-black rounded-full w-8 h-8 flex items-center justify-center'>
                  <FaInstagram color='black' fontSize={14} />
                </Link>
                <Link to='#' className='border border-black rounded-full w-8 h-8 flex items-center justify-center'>
                  <FaFacebookF color='black' fontSize={14} />
                </Link>
                <Link to='#' className='border border-black rounded-full w-8 h-8 flex items-center justify-center'>
                  <FaDribbble color='black' fontSize={14} />
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
