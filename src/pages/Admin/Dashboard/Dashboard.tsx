import React from 'react'
import { Line } from 'react-chartjs-2'
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const Dashboard = () => {
  const { data: monthly } = useQuery({
    queryKey: ['MONTHLY'],
    queryFn: () => orderService.getRevenue()
  })
  const { data: listProducts } = useQuery({
    queryKey: 'list-products',
    queryFn: () => {
      return productsService.getAllProducts()
    }
  })

  const topSoldProducts = listProducts?.data?.products.sort((a: any, b: any) => b.sold - a.sold).slice(0, 5)

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
      <h2 className='text-xl font-semibold mb-4'>Doanh Thu Hàng Tháng</h2>
      <Line data={data} options={options} />
      <div className='mt-8'>
        <h3 className='text-lg font-semibold mb-4'>Top 5 Sản Phẩm Bán Chạy</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
          {topSoldProducts?.map((product: any) => (
            <div key={product._id} className='border p-4 rounded-lg shadow'>
              <img src={product.thumbnail.url} alt={product.title} className='w-full h-32 object-contain rounded-md' />
              <h4 className='mt-2 font-semibold'>{product.title}</h4>
              <p className='text-gray-600'>Sold: {product.sold}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
