import { FaDribbble, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const Blog = () => {
  return (
    <div className='w-[1440px] mx-auto max-[1440px]:px-[10px]'>
      <p className='text-[#000] text-[35px] leading-[42px] text-center my-[50px]'>Blogs</p>
      <div className='grid grid-cols-12 gap-[20px]'>
        <div className='col-span-9 '>
          <div className='mb-[60px]'>
            <div className='relative'>
              <img
                src='https://images.unsplash.com/photo-1732107214254-350490d58bda?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt=''
                className='w-full h-auto'
              />
              <div className='absolute bottom-[10px] flex'>
                <p className='ml-[10px] px-[20px] text-[#000] bg-[#fff]  hover:bg-[#000] hover:text-[#fff] font-[400] text-[14px] leading-[30px] text-center cursor-pointer'>
                  Accessories
                </p>
                <p className='ml-[10px] px-[20px] text-[#000] bg-[#fff]  hover:bg-[#000] hover:text-[#fff] font-[400] text-[14px] leading-[30px] text-center cursor-pointer'>
                  Accessories
                </p>
                <p className='ml-[10px] px-[20px] text-[#000] bg-[#fff]  hover:bg-[#000] hover:text-[#fff] font-[400] text-[14px] leading-[30px] text-center cursor-pointer'>
                  Accessories
                </p>
              </div>
            </div>
            <p className='text-[#4e4e4e] text-[12px] leading-[20px] mt-[26px]'>AUGUST 1, 2023</p>
            <p className='text-[#000000] text-[30px] leading-[36px] mt-[3px]'>Fashion Magic Everyday</p>
            <p className='text-[#4e4e4e] text-[16px] leading-[27px] mt-[16px]'>
              Our goal has always been to motivate, encourage and release our fellow creatives to do their thing Sed a
            </p>
            <button
              className='w-[155px]  text-[#fff] bg-[#000]  hover:bg-[#fff] hover:text-[#000] font-[400] text-[12px] h-[40px] mt-[15px]'
              style={{ border: '1px solid #000' }}
            >
              READ MORE
            </button>
          </div>
        </div>
        <div className='col-span-3 pt-[30px]'>
          <div className='mb-[47px]'>
            <p className='font-medium text-[16px] leading-[20px] text-[#000] mb-[19px] cursor-pointer'>CATEGORIES</p>
            <p className='text-[16px] leading-[27px] text-[#000] mb-[14px] cursor-pointer'>Accessories</p>
            <p className='text-[16px] leading-[27px] text-[#000] mb-[14px] cursor-pointer'>Beauty</p>
            <p className='text-[16px] leading-[27px] text-[#000] mb-[14px] cursor-pointer'>Collection</p>
            <p className='text-[16px] leading-[27px] text-[#000] mb-[14px] cursor-pointer'>Fashion Tips</p>
          </div>
          <div className='mb-[25px]'>
            <p className='font-medium text-[16px] leading-[20px] text-[#000] mb-[19px]'>RECENT POST</p>
            {[1, 1, 1].map(() => {
              return (
                <div className='flex mb-[30px] cursor-pointer'>
                  <div className='h-[100px] w-[100px]'>
                    <img
                      src='https://images.unsplash.com/photo-1719937051124-91c677bc58fc?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                      alt=''
                      className='h-[100px] w-[100px] object-cover'
                    />
                  </div>
                  <div className='w-[calc(100%-115px)] ml-[15px]'>
                    <p className='text-[12px] text-[#4e4e4e] leading-[20px] mb-[6px]'>JANUARY 12, 2023</p>
                    <p className='text-[18px] text-[#000] leading-[18px]'>Fashion Magic Everyday</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className='mb-[45px]'>
            <p className='font-medium text-[16px] leading-[20px] text-[#000] mb-[19px]'>SOCIAL</p>
            <div className='flex gap-x-5'>
              <Link to='#' className='border border-[#ededed]  w-8 h-8 flex items-center justify-center'>
                <FaTwitter color='black' fontSize={13} />
              </Link>
              <Link to='#' className='border border-[#ededed]  w-8 h-8 flex items-center justify-center'>
                <FaInstagram color='black' fontSize={14} />
              </Link>
              <Link to='#' className='border border-[#ededed]  w-8 h-8 flex items-center justify-center'>
                <FaFacebookF color='black' fontSize={14} />
              </Link>
              <Link to='#' className='border border-[#ededed]  w-8 h-8 flex items-center justify-center'>
                <FaDribbble color='black' fontSize={14} />
              </Link>
            </div>
          </div>
          <div>
            <p className='font-medium text-[16px] leading-[20px] text-[#000] mb-[19px]'>TAG</p>
            <div className='flex flex-wrap gap-[10px]'>
              <p className='tagcloud text-[12px] font-medium leading-[18px] cursor-pointer'>BABER </p>
              <p className='tagcloud text-[12px] font-medium leading-[18px] cursor-pointer'>BABY</p>
              <p className='tagcloud text-[12px] font-medium leading-[18px] cursor-pointer'>NEEDS</p>
              <p className='tagcloud text-[12px] font-medium leading-[18px] cursor-pointer'>BEAUTY</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog
