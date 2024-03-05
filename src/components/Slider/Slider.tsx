import React, { useEffect, useState } from 'react'
import { GoDotFill } from 'react-icons/go'
import { listImage } from 'src/constants'
import Heading from '../Heading'
import Slider from 'react-slick'
import Button from '../Button'
import 'aos/dist/aos.css'
import AOS from 'aos'
import { Link } from 'react-router-dom'
import { routes } from 'src/routes/routes'

const CustomSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slideContents = [
    { subHeading1: 'Summer Style ', subHeading2: 'Sensations' },
    { subHeading1: 'Unleash Inner', subHeading2: ' Fashionista' },
    { subHeading1: 'Effortless Denim ', subHeading2: 'Delights' }
  ]

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 500,
    cssEase: 'linear',
    fade: true,
    dotsClass: 'slick-dots custom-dots',
    beforeChange: (_current: any, next: React.SetStateAction<number>) => {
      setCurrentSlide(next)
    },
    appendDots: (dots: any) => (
      <div>
        <ul className='m-auto'>{dots}</ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div
        className='rounded-full pl-[1px]'
        style={{
          border: currentSlide === i ? '1px solid white' : 'none'
        }}
      >
        <GoDotFill color='white' size={17} />
      </div>
    )
  }

  useEffect(() => {
    AOS.init({ duration: 900 })

    return () => {
      AOS.refresh()
    }
  }, [currentSlide])

  return (
    <Slider {...settings}>
      {listImage.map((slide, index) => (
        <div key={index} className={` relative`}>
          <div className='h-[850px] relative'>
            <img src={slide} alt={`Slide ${index}`} className={`w-full h-full object-cover absolute`} />
            <div className='center-inline'>
              <div className='max-w-[500px] w-full text-center'>
                <p data-aos='fade-down' className='text-white font-normal text-[15px]'>
                  EXPRESS YOUR UNIQUE STYLE
                </p>
                <div className='my-8' data-aos='fade-down' data-aos-delay='1100'>
                  <Heading className='text-[60px] mb-5 text-white text-center'>
                    {slideContents[currentSlide].subHeading1}
                  </Heading>
                  <Heading className='text-[60px] text-white text-center'>
                    {slideContents[currentSlide].subHeading2}
                  </Heading>
                </div>
                <Link to={routes.Product.path}>
                  <Button
                    className='text-[11px] px-7 py-3'
                    kind='ghost'
                    data-aos='fade-down'
                    data-aos-delay='1300'
                    data-aos-offset='-500'
                  >
                    SHOP NOW
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  )
}

export default CustomSlider
