import About1 from 'src/assets/images/about1.jpg'
import About2 from 'src/assets/images/about2.jpg'
import Brand from 'src/assets/images/brand.png'
import Heading from 'src/components/Heading'

const About = () => {
  return (
    <div className='w-[1440px] mx-auto mt-[70px] max-[1450px]:p-[10px]'>
      <div className="bg-[url('src/assets/images/about-us.jpg')] h-[625px] bg-center bg-no-repeat bg-cover flex items-center justify-center mb-[120px] w-full">
        <Heading className='text-[45px] text-[#fff] '>Câu chuyện của chúng ta</Heading>
      </div>

      <div className='min-[401px]:grid grid-cols-2 mb-[120px] max-[400px]:'>
        <div className='flex flex-col justify-center'>
          <div className='w-[80%] '>
            <p className='text-[#000] text-[32px] mb-[44px]'>CHÀO. Chúng tôi là Aizy.</p>
            <p className='text-[#4e4e4e] text-[16px] leading-[24px]'>
              Là một thương hiệu thời trang ,chúng tôi đang thực hiện sứ mệnh giúp khách hàng cảm thấy tự tin và tự tin
              hơn. bản thân tốt nhất của họ - một cách chân thực và không hối lỗi. Tại Showpo, chúng tôi coi trọng sự
              tích cực của cơ thể và cam kết cung cấp nhiều phong cách theo xu hướng được thiết kế độc quyền tại Úc. Của
              chúng tôi phong cách được tạo ra cho mọi người, cho mọi dịp và chúng tôi muốn bạn thể hiện cá tính và
              phong cách của mình. thể hiện bản thân theo phong cách Showpo đích thực.
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
            <p className='text-[#000] text-[32px] mb-[44px]'>Nó được làm ở đâu?</p>
            <p className='text-[#4e4e4e] text-[16px] leading-[24px] text-justify'>
              Là một thương hiệu thời trang trực tuyến toàn cầu, chúng tôi đang thực hiện sứ mệnh giúp khách hàng cảm
              thấy tự tin và tự tin hơn. bản thân tốt nhất của họ - một cách chân thực và không hối lỗi. Tại Showpo,
              chúng tôi coi trọng sự tích cực của cơ thể và cam kết cung cấp nhiều phong cách theo xu hướng được thiết
              kế độc quyền tại Úc. Của chúng tôi phong cách được tạo ra cho mọi người, cho mọi dịp và chúng tôi muốn bạn
              thể hiện cá tính và phong cách của mình. thể hiện bản thân theo phong cách Showpo đích thực.
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
