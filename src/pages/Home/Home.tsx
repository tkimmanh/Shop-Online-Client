import SliderComponent from 'src/components/Slider'
import Card from 'src/components/Card/CardMain'
import Price from 'src/components/Card/Price'
import Title from 'src/components/Card/Title'
import Heading from 'src/components/Heading'
import { Link } from 'react-router-dom'
import { formatMoney } from 'src/utils/formatMoney'

const Home = () => {
  return (
    <div>
      <SliderComponent></SliderComponent>
      <div className='mx-7'>
        <Heading className='text-[35px] pt-20 pb-16'>Recommended For You</Heading>
        <div>
          <Card image='https://wpbingosite.com/wordpress/bedesk/wp-content/uploads/2023/06/home-banner-2.jpg'></Card>
          <div className='mt-5 flex flex-col gap-y-2'>
            <Link className='inline-block' to={''}>
              <Title>ELIA MOCK NECK CUTOUT SWEATER</Title>
            </Link>
            <Price>{formatMoney(200000)}</Price>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
