import { formatMoney } from 'src/utils/formatMoney'
import SliderComponent from 'src/components/Slider'
import Card from 'src/components/Card/CardMain'
import Price from 'src/components/Card/Price'
import Title from 'src/components/Card/Title'
import Heading from 'src/components/Heading'
import Button from 'src/components/Button'
import { routes } from 'src/routes/routes'
import { Link, useSearchParams } from 'react-router-dom'
import Slider from 'react-slick'
import productsService from 'src/services/products.service'
import { useQuery } from 'react-query'
import categoryService from 'src/services/category.service'
import { useEffect } from 'react'
import { setAccessTokenToLocalStorage, setIsAuthenticated } from 'src/utils/localStorage'

const Home = () => {
  const [params] = useSearchParams()
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  }
  const { data: listProducts } = useQuery({
    queryKey: ['PRODUCTS'],
    queryFn: () => {
      return productsService.getAllProducts()
    }
  })
  const { data: listCategory } = useQuery({
    queryKey: ['CATEGORY'],
    queryFn: () => {
      return categoryService.getAllCategory()
    }
  })
  useEffect(() => {
    const access_token = params.get('access_token')
    if (access_token) {
      setAccessTokenToLocalStorage(access_token)
      setIsAuthenticated(true)
      window.location.href = routes.Home.path
    }
  }, [params])
  const filteredProducts = listProducts?.data.products?.filter((product: any) => product.status == true)
  return (
    <div>
      <SliderComponent></SliderComponent>
      <div className='mx-7'>
        <Heading className='text-3xl pt-20 pb-16'>Recommended For You</Heading>
        <div>
          <Slider {...settings}>
            {filteredProducts?.slice(0, 10).map((product: any) => {
              return (
                <div key={product.id}>
                  <Card image={product.thumbnail?.url}></Card>
                  <Link className='inline-block' to={`${product._id}`}>
                    <div className='mt-5 flex w-full flex-col gap-y-2'>
                      <Title>{product.title}</Title>
                      <Price>{formatMoney(product.price)}</Price>
                    </div>
                  </Link>
                </div>
              )
            })}
          </Slider>
        </div>

        <div className='w-full bg-[#f7f4ef] h-[438px] mt-16'>
          <div className='flex flex-col items-center justify-center'>
            <Heading className='text-3xl mt-20 pb-16 text-center'>Shop by categories</Heading>
            <p className='text-xl'>
              Your all-in-one spot for finding trends, occasion looks, featured styles and more!
            </p>
          </div>
          <div className='flex items-center justify-center gap-x-10 mt-4 '>
            {listCategory?.data.getallCategory.slice(0, 6).map((category: any) => {
              return (
                <div
                  key={category._id}
                  className='bg-white hover:bg-black hover:text-white text-black  py-5 px-20 transition-colors cursor-pointer'
                >
                  <span className='uppercase text-base font-normal'>{category.title}</span>
                </div>
              )
            })}
          </div>
          <div className='flex items-center justify-center mt-10'>
            <Link className='inline-block' to={routes.Product.path}>
              <Button kind='primary' className='px-10 m-auto font-normal text-xs py-3'>
                Show all categories
              </Button>
            </Link>
          </div>
        </div>

        <div className='grid lg:grid-cols-2 lg:gap-y-0 gap-y-5 md:grid-col lg:mt-32 md:mt-30 mt-24 gap-x-10'>
          <div>
            <Link to={routes.Product.path}>
              <div>
                <img
                  className='h-[729px] w-full object-cover overflow-hidden '
                  src='https://images.unsplash.com/photo-1616003618788-413cd29e3f1a?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                  alt=''
                />
              </div>
            </Link>
            <div className='my-5'>
              <Heading className='text-3xl mb-5'>Elevate Your Style Game</Heading>
              <p>Find Your Fashion Inspiration Here</p>
            </div>
            <Link to={routes.Product.path}>
              <Button kind='primary' className='px-7 py-3 text-xs'>
                Shop now
              </Button>
            </Link>
          </div>
          <div>
            <Link to={routes.Product.path}>
              <img
                className='h-[729px] w-full object-cover'
                src='https://images.unsplash.com/photo-1601056645510-77f6d98cf7d9?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt=''
              />
            </Link>
            <div className='my-5'>
              <Heading className='text-3xl mb-5'>Elevate Your Style Game</Heading>
              <p>Find Your Fashion Inspiration Here</p>
            </div>
            <Button kind='primary' className='px-7 py-3 text-xs'>
              Shop now
            </Button>
          </div>
        </div>

        <div className='lg:mt-32 md:mt-30 mt-24 '>
          <div className='w-full bg-[#f7f4ef] h-[291px] flex flex-col items-center justify-center'>
            <Heading className='lg:text-4xl md:text-3xl text-2xl mb-7'>Buy better. Buy less. Wear more.</Heading>
            <p className='text-xs font-normal border-b py-1 border-black border-solid'>SHOP TRENDING COLLECTION</p>
          </div>
        </div>

        <div className='w-full   lg:h-[640px] bg-[#f7f4ef] mt-16 lg:grid lg:grid-cols-10'>
          <div className='col-span-4 flex lg:flex-col lg:justify-center items-center py-10 px-3 lg:p-0 md:p-0'>
            <div className='text-left w-[200px] flex flex-col gap-y-10'>
              <Heading className='text-3xl'>Our Store</Heading>
              <div>
                <p className='font-normal text-base text-[#4e4e4e]'>Hà Nội - Việt Nam</p>
                <p className='font-normal text-base text-[#4e4e4e]'>info@jewelryshop.com</p>
                <p className='font-normal text-base text-[#4e4e4e]'>0987654321</p>
              </div>
              <Link to={routes.AboutUs.path}>
                <Button kind='primary' className='px-8 py-3 text-sm font-normal'>
                  GET DIRECTION
                </Button>
              </Link>
            </div>
          </div>
          <div className='col-span-6'>
            <img
              className='h-full w-full object-cover'
              src='https://wpbingosite.com/wordpress/bedesk/wp-content/uploads/2023/06/home-banner-3.jpg'
              alt=''
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
