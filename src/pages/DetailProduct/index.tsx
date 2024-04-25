import { useContext, useEffect, useState } from 'react'
import { BsBox2 } from 'react-icons/bs'
import { CiHeart } from 'react-icons/ci'
import { GoClock } from 'react-icons/go'
import { MdCompareArrows } from 'react-icons/md'
import { CiShare2 } from 'react-icons/ci'
import CardImage from 'src/assets/images/payment-product.png'
import Star from 'src/components/Star'
import { twMerge } from 'tailwind-merge'
import Card from 'src/components/Card/CardMain'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Title from 'src/components/Card/Title'
import Price from 'src/components/Card/Price'

import { useMutation, useQuery, useQueryClient } from 'react-query'
import Rating from 'react-rating-stars-component'
import productsService from 'src/services/products.service'
import { formatMoney } from 'src/utils/formatMoney'
import DOMPurify from 'dompurify'
import QuantitySelector from 'src/components/QuantitySelector'
import usersService from 'src/services/users.service'
import classNames from 'src/utils/classNames'
import { useSnackbar } from 'notistack'
import { AppContext } from 'src/context/app.context'
import { routes } from 'src/routes/routes'
import Button from 'src/components/Button'

const DetailProduct = () => {
  const { isAuthenticated, cartChanged, setCartChanged } = useContext(AppContext)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [valueTab, setValueTab] = useState(1)
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { enqueueSnackbar } = useSnackbar()

  const reviewMutation = useMutation((newReview) => productsService.addReview(id as string, newReview as any), {
    onSuccess: () => {
      queryClient.invalidateQueries(['PRODUCT', id])
      closeModal()
      enqueueSnackbar('Đánh giá sản phẩm thành công', { variant: 'success' })
    },
    onError: (error) => {
      console.error('Error submitting review:', error)
      enqueueSnackbar('Đánh giá sản phẩm thất bại', { variant: 'error' })
    }
  })

  const submitReview = async () => {
    if (rating > 0) {
      reviewMutation.mutate({ star: rating } as any)
    }
  }
  const { data: productDetail } = useQuery({
    queryKey: ['PRODUCT', id],
    queryFn: async () => {
      try {
        return await productsService.getProduct(id as string)
      } catch (error) {
        navigate(routes.NotFound.path)
      }
    }
  })
  const { data: listProducts } = useQuery({
    queryKey: ['PRODUCT'],
    queryFn: async () => {
      try {
        return await productsService.getAllProducts()
      } catch (error) {
        navigate(routes.NotFound.path)
      }
    }
  })
  const detail = productDetail?.data.response || {}
  const handleQuantityChange = (quantity: number) => {
    setQuantity(quantity)
  }

  const handleAddToCart = async () => {
    try {
      const body = {
        product_id: id,
        quantity: quantity,
        color_id: selectedColor,
        size_id: selectedSize
      }
      await usersService.addToCart(body)
      enqueueSnackbar('Đã thêm sản phẩm vào giỏ hàng', { variant: 'success' })
      setCartChanged(!cartChanged)
    } catch (error) {
      console.error(error)
    }
  }
  const filteredProducts = listProducts?.data.products?.filter((product: any) => product.status == true)
  const currentCategory = detail?.category?._id || ''
  const relatedProducts = filteredProducts?.filter(
    (product: any) => product.category?._id === currentCategory && product.id !== id
  )
  useEffect(() => {
    document.body.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [detail])
  return (
    <div className='max-w-[1440px] mx-auto'>
      <div className='grid grid-cols-5 gap-[115px]'>
        <div className='col-span-3 grid grid-cols-7  gap-[12px]'>
          <div className='col-span-1 flex flex-col gap-[13px]'>
            {detail?.images?.length > 0 &&
              detail?.images?.map((img: any) => {
                return (
                  <div className='w-full h-[147px]'>
                    <img src={img?.url} alt='' className='w-full h-full object-cover' />
                  </div>
                )
              })}
          </div>
          <div className='col-span-6'>
            <div className='w-full h-[1110px]'>
              <img src={detail?.thumbnail?.url} alt='' className='w-full h-full object-cover' />
            </div>
          </div>
        </div>
        <div className='col-span-2'>
          <div className='border-b-[1px] border-[#e5e5e5]'>
            <p className='font-[400] text-[21px] mb-[12px]'>{detail?.title}</p>
            <div className='flex mb-[12px]'>
              <Star rating={detail?.averageRating || 0} isInteractive={false} />
              <p className='pl-[10px]'>({detail?.totalReviews || 0} đánh giá của khách hàng)</p>
            </div>
            <p className='font-[500] text-[18px] mb-[20px]'>{formatMoney(detail?.price || 0)}</p>
          </div>
          <div className='mt-[20px]'>
            <p className='font-[400] text-[16px] text-[#4e4e4e] mb-[20px] leading-[27px]'></p>
            <p className='text-[16px font-[400] mb-[15px]'>
              Chỉ còn <span className='text-[#ff0000] text-[16px font-[400]'>{detail.quantity} sản phẩm (s)</span> trong
              kho hàng
            </p>

            <div
              className='h-[3px]'
              style={{ backgroundImage: 'linear-gradient(to right,#FF0000 80%, #eee 20%)' }}
            ></div>
            <div className='grid grid-cols-12 gap-[10px] mt-[20px]'>
              <QuantitySelector onQuantityChange={handleQuantityChange}></QuantitySelector>
              <button
                onClick={handleAddToCart}
                className={classNames(
                  'w-full  text-[#fff] hover:bg-[#fff] hover:text-[#000] font-[400] text-[12px] col-span-9 h-[40px]',
                  !isAuthenticated ? 'pointer-events-none bg-gray-600' : 'bg-[#000]'
                )}
                style={{ border: '1px solid #000' }}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
            <div>
              <div className='mt-[20px]'>
                <div className='mb-[20px]'>
                  <p>Color:</p>
                  <div className='flex gap-x-3 my-2'>
                    {detail.colors?.map((color: any) => {
                      return (
                        <div
                          key={color._id}
                          onClick={() => setSelectedColor(color._id)}
                          style={{
                            backgroundColor: color.color_code
                          }}
                          className={classNames(
                            `w-8 h-8  rounded-full border-2 select-none cursor-pointer`,

                            selectedColor === color._id ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                          )}
                        ></div>
                      )
                    })}
                  </div>
                </div>
                <div>
                  <p>Sizes:</p>
                  <div className='flex'>
                    {detail.sizes?.map((size: any) => (
                      <div
                        key={size._id}
                        onClick={() => setSelectedSize(size._id)}
                        className={`m-[5px] border-2 px-3 py-2 cursor-pointer ${
                          selectedSize === size._id ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                        }`}
                      >
                        {size.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className='flex my-[25px]'>
              <div className='flex items-center cursor-pointer'>
                <p className='p-[8px] bg-[#f6f6f6] rounded-[100%] hover:bg-[#000] hover:text-[#fff]'>
                  <CiHeart />
                </p>
                <p className='text-[16px] font-[400] ml-[10px]'>Yêu thích</p>
              </div>
              <div className='flex items-center ml-[20px] cursor-pointer'>
                <p className='p-[8px] bg-[#f6f6f6] rounded-[100%] cursor-pointer hover:bg-[#000] hover:text-[#fff]'>
                  <MdCompareArrows />
                </p>
                <p className='text-[16px] font-[400] ml-[10px]'>So sánh</p>
              </div>
              <div className='flex items-center ml-[20px] cursor-pointer'>
                <p className='p-[8px] bg-[#f6f6f6] rounded-[100%] cursor-pointer hover:bg-[#000] hover:text-[#fff]'>
                  <CiShare2 />
                </p>
                <p className='text-[16px] font-[400] ml-[10px]'>Chia sẻ</p>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-[20px]'>
              <div className='bg-[#f6f6f6] p-[10px]'>
                <BsBox2 className='w-[30px] h-auto mb-[10px]' />
                <p className='leading-[27px]'>Miễn phí vận chuyển khi đặt hàng</p>
              </div>
              <div className='bg-[#f6f6f6] p-[10px]'>
                <GoClock className='w-[30px] h-auto mb-[10px]' />
                <p className='leading-[27px]'>Giao hàng trong: 3-7 ngày làm việc , Vận chuyển và trả lại</p>
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
              Mô tả
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
              Đánh giá
            </span>
          </li>
        </ul>
      </div>
      <div className='py-[46px] border-b border-gray-200'>
        {valueTab == 1 ? (
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(detail?.description)
            }}
          />
        ) : (
          <div className='flex items-center justify-center'>
            <button
              onClick={openModal}
              className=' bg-[#fff] text-[#000] hover:bg-[#000] text-xl hover:text-[#fff] font-[400] h-[47px] w-[251px] mt-[10px]'
              style={{ border: '1px solid #000' }}
            >
              Xếp hạng sản phẩm
            </button>
          </div>
        )}
      </div>
      <p className='text-[32px] leading-[41px] font-[400] mt-[80px] mb-[50px] text-center'>Sản phầm cùng danh mục</p>
      <div className='grid grid-cols-4 gap-[30px]'>
        {relatedProducts?.slice(0, 4)?.map((product: any) => {
          return (
            <div key={product._id}>
              <Card id={product._id} image={product.thumbnail?.url}></Card>
              <Link className='inline-block' to={`/products/${product._id}/${product.slug}`}>
                <div className='mt-5 flex w-full flex-col gap-y-2'>
                  <Title>{product?.title}</Title>
                  <Price>{Number(product?.price || 0)?.toLocaleString('en')}đ</Price>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
      {modalIsOpen && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'>
          <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
            <div className='mt-3 text-center'>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>Đánh giá sản phẩm</h3>
              <div className='mt-2'>
                <p className='text-sm text-gray-500'>Đánh giá của bạn rất quan trọng với chúng tôi</p>
              </div>
              <div className='mt-4'>
                <div className='flex items-center justify-center'>
                  <Rating
                    count={5}
                    onChange={(newRating: any) => setRating(newRating)}
                    size={50}
                    activeColor='#ffd700'
                  />
                </div>
              </div>
              <div className='flex justify-center items-center px-4 py-3 gap-x-5'>
                <Button
                  isLoading={reviewMutation.isLoading}
                  kind='primary'
                  onClick={submitReview}
                  className='px-10 py-3 text-xs '
                >
                  Gửi đánh giá
                </Button>
                <Button kind='secondary' onClick={closeModal} className='px-10 py-3 text-xs'>
                  Đóng
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DetailProduct
