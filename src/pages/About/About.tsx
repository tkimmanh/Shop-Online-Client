import About1 from 'src/assets/images/about1.jpg'
import About2 from 'src/assets/images/about2.jpg'
import Brand from 'src/assets/images/brand.png'

const About = () => {
  return (
    <div className='w-[1440px] mx-auto mt-[70px] max-[1450px]:p-[10px]'>
      <div className="bg-[url('src/assets/images/about-us.jpg')] h-[625px] bg-center bg-no-repeat bg-cover flex items-center justify-center mb-[120px] w-full">
        <p className='text-[45px] text-[#fff] '>Our Story</p>
      </div>

      <div className='min-[401px]:grid grid-cols-2 mb-[120px] max-[400px]:'>
        <div className='flex flex-col justify-center'>
          <div className='w-[80%] '>
            <p className='text-[#000] text-[32px] mb-[44px]'>Hi. We’re Aizy.</p>
            <p className='text-[#4e4e4e] text-[16px] leading-[24px]'>
              As a global online fashion brand, we’re on a mission to empower our customers to feel confident and be
              their best selves – authentically & unapologetically. At Showpo, we value body positivity and are
              committed to offering an inclusive range of trend-driven styles designed exclusively in Australia. Our
              styles are made for everyone, for every occasion, and we want you to embrace your individuality and
              express yourself in true Showpo fashion.
            </p>
          </div>
        </div>
        <div className='overflow-hidden'>
          <img src={About1} alt='' className='w-full h-auto hover:scale-125 ease-in duration-1000 cursor-pointer' />
        </div>
      </div>
      <div className='grid grid-cols-2 mb-[120px]'>
        <div className='overflow-hidden'>
          <img src={About2} alt='' className='w-full h-auto hover:scale-125 ease-in duration-1000 cursor-pointer' />
        </div>
        <div className='flex flex-col justify-center items-end'>
          <div className='w-[80%] '>
            <p className='text-[#000] text-[32px] mb-[44px]'>Where is it made?</p>
            <p className='text-[#4e4e4e] text-[16px] leading-[24px]'>
              As a global online fashion brand, we’re on a mission to empower our customers to feel confident and be
              their best selves – authentically & unapologetically. At Showpo, we value body positivity and are
              committed to offering an inclusive range of trend-driven styles designed exclusively in Australia. Our
              styles are made for everyone, for every occasion, and we want you to embrace your individuality and
              express yourself in true Showpo fashion.
            </p>
          </div>
        </div>
      </div>
      <div className='mb-[120px]'>
        <img src={Brand} alt='' className='block m-auto max-w-[1134px] w-full h-auto' />
      </div>
    </div>
  )
}

export default About
