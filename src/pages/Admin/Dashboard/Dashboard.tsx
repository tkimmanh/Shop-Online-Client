import { Line } from 'react-chartjs-2'
import { FaProductHunt, FaUser } from 'react-icons/fa'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { useQuery } from 'react-query'
import orderService from 'src/services/order.service'
import productsService from 'src/services/products.service'
import usersService from 'src/services/users.service'
import { PiNoteBold } from 'react-icons/pi'
import { formatMoney } from 'src/utils/formatMoney'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const Dashboard = () => {
  const { data: monthly } = useQuery({
    queryKey: ['MONTHLY'],
    queryFn: () => orderService.getRevenue()
  })
  const { data: categorySelling } = useQuery({
    queryKey: ['CATEGORY_SELLING'],
    queryFn: () => orderService.categorySelling()
  })

  const { data: user } = useQuery({
    queryKey: ['USER'],
    queryFn: () => usersService.getAllUser()
  })

  const { data: orders } = useQuery({
    queryKey: ['ORDER'],
    queryFn: () => orderService.listAdmin('')
  })

  const { data: listProducts } = useQuery({
    queryKey: ['PRODUCTS'],
    queryFn: () => {
      return productsService.getAllProducts('')
    }
  })

  const { data: topDailyProducts } = useQuery({
    queryKey: ['TOP_DAILY_PRODUCTS'],
    queryFn: () => orderService.topSelling('day', new Date().toISOString())
  })

  const { data: topMonthlyProducts } = useQuery({
    queryKey: ['TOP_MONTHLY_PRODUCTS'],
    queryFn: () => orderService.topSelling('month', new Date().toISOString())
  })

  const { data: topYearlyProducts } = useQuery({
    queryKey: ['TOP_YEARLY_PRODUCTS'],
    queryFn: () => orderService.topSelling('year', new Date().toISOString())
  })

  const topSoldProducts = listProducts?.data?.products.sort((a: any, b: any) => b.sold - a.sold).slice(0, 5)

  const totalRevenue = monthly?.data?.revenues.reduce((acc: number, revenue: any) => acc + revenue.total_revenue, 0)

  const data = {
    labels: monthly?.data?.revenues.map((revenue: any) => `Tháng ${revenue.month}`),
    datasets: [
      {
        label: 'Doanh thu',
        data: monthly?.data?.revenues.map((revenue: any) => revenue.total_revenue),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)'
      }
    ]
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

  return (
    <div className='p-4'>
      <div className='my-10 flex justify-center gap-x-24'>
        <div className='flex '>
          <div className='bg-violet-500 w-14 h-14 rounded-full flex items-center justify-center'>
            <FaUser className='text-violet-200' size={30}></FaUser>
          </div>
          <div className='flex flex-col justify-center'>
            <p>Tổng số user</p>
            <span className='text-center font-bold'>{user?.data?.result?.length}</span>
          </div>
        </div>

        <div className='flex'>
          <div className='bg-green-500 w-14 h-14 rounded-full flex items-center justify-center'>
            <FaProductHunt className='bg-green-500' size={30} />
          </div>
          <div className='flex flex-col justify-center'>
            <p>Tổng số sản phẩm</p>
            <span className='text-center font-bold'>{listProducts?.data?.products?.length}</span>
          </div>
        </div>

        <div className='flex'>
          <div className='bg-orange-500 w-14 h-14 rounded-full flex items-center justify-center'>
            <PiNoteBold size={30} />
          </div>
          <div className='flex flex-col justify-center'>
            <p>Tổng số đơn hàng</p>
            <span className='text-center font-bold'>{orders?.data?.orders.length}</span>
          </div>
        </div>

        <div className='flex'>
          <div className='bg-blue-500 w-14 h-14 rounded-full flex items-center justify-center'>
            <FaProductHunt className='bg-blue-500' size={30} />
          </div>
          <div className='flex flex-col justify-center'>
            <p className='mb-1'>Doanh thu</p>
            <span className='text-center font-bold'>{formatMoney(totalRevenue)}</span>
          </div>
        </div>
      </div>
      <h2 className='text-xl font-semibold mb-4'>Doanh Thu Hàng Tháng</h2>
      <Line data={data} options={options} />
      <div className='grid grid-cols-2 gap-x-10'>
        <div className='mt-8'>
          <h3 className='text-lg font-semibold mb-4'>Top 5 Sản Phẩm Bán Chạy</h3>
          <div className='gap-4 max-w-[500px] w-full flex flex-col rounded-lg shadow-xl'>
            {topSoldProducts?.map((product: any) => (
              <div key={product._id} className='bg-white p-4 flex '>
                <div>
                  <img className='w-20 h-20 object-contain gap-x-5' src={product?.thumbnail?.url} alt='' />
                </div>
                <div>
                  <h4 className='text-lg font-semibold mt-2'>{product.title}</h4>
                  <p className='text-sm text-gray-500 mt-1'>
                    <span className='font-bold'>{product.sold}</span> sản phẩm đã bán
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='mt-8'>
          <h3 className='text-lg font-semibold mb-4'>Danh mục có sản phẩm bán chạy</h3>
          <div className='gap-4 max-w-[500px] w-full flex flex-col rounded-lg shadow-xl'>
            {categorySelling?.data?.categories?.map((category: any) => {
              return (
                <div key={category._id} className='bg-white p-4 flex '>
                  <div>
                    <h4 className='text-lg font-semibold mt-2'>{category.categoryDetails.title}</h4>
                    <p className='text-sm text-gray-500 mt-1'>
                      <span className='font-bold'>{category.totalSold}</span> sản phẩm đã bán
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-x-10'>
        {topDailyProducts?.data?.products?.length > 0 && (
          <div className='mt-8'>
            <h3 className='text-lg font-semibold mb-4'>Top 5 sản phẩm bán chạy theo ngày</h3>
            <div className='gap-4 max-w-[500px] w-full flex flex-col rounded-lg shadow-xl min-h-[496px]'>
              {topDailyProducts?.data.products?.map((product: any) => {
                console.log('product:', product)
                return (
                  <div key={product._id} className='bg-white p-4 flex gap-x-5'>
                    <div>
                      <img
                        className='w-20 h-20 object-contain gap-x-5'
                        src={product.productDetails.thumbnail.url}
                        alt=''
                      />
                    </div>
                    <div>
                      <h4 className='text-lg font-semibold mt-2'>{product.productDetails.title}</h4>
                      <p className='text-sm text-gray-500 mt-1'>
                        <span className='font-bold'>{product.totalSold}</span> sản phẩm đã bán trong ngày hôm nay
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {topMonthlyProducts?.data?.products?.length > 0 && (
          <div className='mt-8'>
            <h3 className='text-lg font-semibold mb-4'>Top 5 sản phẩm bán chạy theo tháng</h3>
            <div className='gap-4 max-w-[500px] w-full flex flex-col rounded-lg shadow-xl'>
              {topMonthlyProducts?.data.products?.map((product: any) => {
                return (
                  <div key={product._id} className='bg-white p-4 flex gap-x-5'>
                    <div>
                      <img
                        className='w-20 h-20 object-contain gap-x-5'
                        src={product.productDetails.thumbnail.url}
                        alt=''
                      />
                    </div>
                    <div>
                      <h4 className='text-lg font-semibold mt-2'>{product.productDetails.title}</h4>
                      <p className='text-sm text-gray-500 mt-1'>
                        <span className='font-bold'>{product.totalSold}</span> sản phẩm đã bán trong tháng này
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <div className='grid grid-cols-2 gap-x-10'>
        <div className='mt-8'>
          <h3 className='text-lg font-semibold mb-4'>Top 5 sản phẩm bán chạy theo năm</h3>
          <div className='gap-4 max-w-[500px] w-full flex flex-col rounded-lg shadow-xl min-h-[496px]'>
            {topYearlyProducts?.data.products?.map((product: any) => {
              return (
                <div key={product._id} className='bg-white p-4 flex gap-x-5'>
                  <div>
                    <img
                      className='w-20 h-20 object-contain gap-x-5'
                      src={product.productDetails.thumbnail.url}
                      alt=''
                    />
                  </div>
                  <div>
                    <h4 className='text-lg font-semibold mt-2'>{product.productDetails.title}</h4>
                    <p className='text-sm text-gray-500 mt-1'>
                      <span className='font-bold'>{product.totalSold}</span> sản phẩm đã bán trong năm nay
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
