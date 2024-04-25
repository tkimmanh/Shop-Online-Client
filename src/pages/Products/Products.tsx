import { formatMoney } from 'src/utils/formatMoney'
import Card from 'src/components/Card/CardMain'
import Price from 'src/components/Card/Price'
import Title from 'src/components/Card/Title'
import Button from 'src/components/Button'
import { useForm } from 'react-hook-form'
import Input from 'src/components/Input'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import productsService from 'src/services/products.service'
import categoryService from 'src/services/category.service'
import variantsService from 'src/services/variants.service'
import useQuerySearchParams from 'src/hooks/useQuerySearchParams'
import { isUndefined, omit, omitBy } from 'lodash'
import { routes } from 'src/routes/routes'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import classNames from 'src/utils/classNames'
import { sizes } from 'src/constants/variants.constants'
const Products = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      sortBy: '',
      priceFrom: '',
      priceTo: ''
    }
  })
  const navigate = useNavigate()
  const queryParams: any = useQuerySearchParams()
  const [selectedColors, setSelectedColors] = useState<any>([])

  const handleColorSelect = (color: any) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c: any) => c !== color))
    } else {
      setSelectedColors([...selectedColors, color])
    }
  }

  const queryConfig: any = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '10',
      sort: queryParams.sort,
      priceFrom: queryParams.priceFrom,
      priceTo: queryParams.priceTo,
      color: queryParams.color,
      category: queryParams.category,
      sizes: queryParams.sizes
    },
    isUndefined
  )
  const { data: listProducts } = useQuery({
    queryKey: ['PRODUCTS', queryConfig],
    queryFn: () => {
      return productsService.getAllProducts(queryConfig)
    }
  })
  const { data: listCategory } = useQuery({
    queryKey: ['CATEGORY'],
    queryFn: () => {
      return categoryService.getAllCategoies()
    }
  })
  const { data: colors } = useQuery({
    queryKey: ['COLORS'],
    queryFn: () => {
      return variantsService.getAllColor()
    }
  })
  const { data: sizes } = useQuery({
    queryKey: ['SIZES'],
    queryFn: () => {
      return variantsService.getAllSize()
    }
  })

  const handleSort = (orderValue: any) => {
    navigate({
      pathname: routes.Product.path,
      search: createSearchParams({
        ...queryConfig,
        sort: orderValue
      }).toString()
    })
  }
  const onSubmitPrice = handleSubmit((value: any) => {
    navigate({
      pathname: routes.Product.path,
      search: createSearchParams({
        ...queryConfig,
        priceFrom: value.price_min,
        priceTo: value.price_max
      }).toString()
    })
  })
  const applyFiltersColor = () => {
    navigate({
      pathname: routes.Product.path,
      search: createSearchParams({
        ...queryConfig,
        color: selectedColors
      }).toString()
    })
  }
  useEffect(() => {
    navigate(
      {
        pathname: routes.Product.path,
        search: createSearchParams({
          ...queryParams,
          page: '1',
          limit: '10'
        }).toString()
      },
      { replace: true }
    )
  }, [])
  const handlePageClick = (data: any) => {
    const selectedPage = data.selected + 1
    navigate({
      pathname: routes.Product.path,
      search: createSearchParams({
        ...queryConfig,
        page: selectedPage.toString()
      }).toString()
    })
  }

  const handleRemoveAllFilter = () => {
    navigate({
      pathname: routes.Product.path,
      search: createSearchParams(
        omit(queryConfig, ['priceFrom', 'priceTo', 'sort', 'color', 'sizes', 'category'])
      ).toString()
    })
  }

  const totalProducts = listProducts?.data.counts
  const limit = parseInt(queryParams.limit || '10', 10)
  const pageCount = Math.ceil(totalProducts / limit)

  const filteredProducts = listProducts?.data.products?.filter((product: any) => product.status == true)

  return (
    <div className='mt-10'>
      <div className='grid lg:grid-cols-10 min'>
        <div className='lg:col-span-3 hidden md:inline-block lg:inline-block lg:ml-10 max-w-[338px]'>
          <div className='flex flex-col gap-y-4'>
            <h1 className='tracking-widest text-xs text-left font-medium uppercase mb-5'>Danh Mục</h1>
            <ul className='flex flex-col gap-y-4 text-base'>
              {listCategory?.data.getallCategory?.map((category: any) => {
                const isActive = queryConfig.category === category.title!
                return (
                  <Link
                    className={classNames(isActive ? 'font-bold' : 'text-black')}
                    to={{
                      pathname: routes.Product.path,
                      search: createSearchParams({
                        ...queryConfig,
                        category: category.title!
                      }).toString()
                    }}
                  >
                    {category.title}
                  </Link>
                )
              })}
            </ul>
          </div>
          <div className='border-b border-solid w-[80%] my-5'></div>
          <h1 className='tracking-widest text-xs text-left font-medium'>KHOẢNG GIÁ</h1>
          <form className='max-w-[338px]' onSubmit={onSubmitPrice} action=''>
            <div className='mb-5 mt-5'>
              <Input
                register={register}
                placeholder='từ *'
                className='h-8 py-5 mb-5 border-black'
                type='text'
                name='price_min'
              ></Input>
            </div>
            <div className='mb-5'>
              <Input
                register={register}
                placeholder='tới *'
                className='h-8 py-5 mb-5 border-black'
                type='text'
                name='price_max'
              ></Input>
            </div>
            <Button className='w-full py-3 mt-5 text-xs uppercase' kind='secondary'>
              áp dụng
            </Button>
          </form>
          <div className='border-b border-solid w-[80%] my-5'></div>
          <div>
            <h1 className='tracking-widest text-xs text-left font-medium mb-5 uppercase'>Màu</h1>
            <div className='flex flex-col '>
              {colors?.data.getallColors?.map((color: any) => (
                <div className='flex items-center gap-x-5 ' key={color._id}>
                  <button
                    style={{ backgroundColor: color.color_code }}
                    className={`w-9 h-9 focus:outline-none my-2 ${
                      selectedColors.includes(color.name) ? 'ring-2 ring-offset-2 ring-orange-500' : ''
                    }`}
                    onClick={() => handleColorSelect(color.name)}
                  ></button>
                  <span className='cursor-pointer' onClick={() => handleColorSelect(color.name)}>
                    {color.name}
                  </span>
                </div>
              ))}
              <Button
                kind='secondary'
                onClick={applyFiltersColor}
                className='flex w-full items-center justify-center bg-orange p-3 text-xs uppercase text-white hover:bg-orange/80'
              >
                Xác nhận
              </Button>
            </div>
            <div className='border-b border-solid w-[80%] my-5'></div>
            <div>
              <h1 className='tracking-widest text-xs text-left font-medium mb-5 uppercase'>Kích cỡ</h1>
              <div className='flex gap-x-5 flex-wrap gap-y-4'>
                {sizes?.data?.getallSizes?.map((size: any) => {
                  return (
                    <Link
                      className='border border-gray-200 py-2 px-4'
                      to={{
                        pathname: routes.Product.path,
                        search: createSearchParams({
                          ...queryConfig,
                          sizes: size.name!
                        }).toString()
                      }}
                    >
                      {size.name}
                    </Link>
                  )
                })}
              </div>
            </div>
            <div className='border-b border-solid w-[80%] my-5'></div>
            <Button
              kind='secondary'
              onClick={handleRemoveAllFilter}
              className='flex w-full items-center justify-center p-3 text-xs uppercase text-white '
            >
              Xóa tất cả bộ lọc
            </Button>
          </div>
        </div>
        <div className='col-span-7'>
          <div className='flex justify-between'>
            <p className='mb-4 text-sm my-auto'>Showing 1–12 of 18 item(s)</p>
            <select onChange={(e) => handleSort(e.target.value)} className='mb-4  border-2 p-2 rounded'>
              <option value=''>Sắp xếp</option>
              <option value='newest'>Mới nhất</option>
              <option value='oldest'>Cũ nhất</option>
              <option value='sold'>Bán chạy nhất</option>
              <option value='min'>Giá: Từ thấp đến cao</option>
              <option value='max'>Giá: Từ cao đến thấp</option>
            </select>
          </div>
          <div className='grid lg:grid-cols-3 gap-5 grid-cols-2'>
            {filteredProducts?.map((product: any) => {
              return (
                <div key={product._id}>
                  <Card id={product._id} image={product.thumbnail?.url}></Card>
                  <Link className='inline-block' to={`${product._id}/${product.slug}`}>
                    <div className='mt-5 flex w-full flex-col gap-y-2'>
                      <Title>{product.title}</Title>
                      <Price>{formatMoney(product.price)}</Price>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
          <div className='mt-15'>
            {listProducts?.data?.products?.length > 0 && (
              <ReactPaginate
                previousLabel={'← Previous'}
                nextLabel={'Next →'}
                breakLabel={'...'}
                pageCount={pageCount}
                marginPagesDisplayed={10}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
