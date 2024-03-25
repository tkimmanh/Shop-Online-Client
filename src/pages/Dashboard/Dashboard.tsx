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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const Dashboard = () => {
  const { data: monthly } = useQuery({
    queryKey: ['MONTHLY'],
    queryFn: () => orderService.getRevenue()
  })

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
    <div>
      <h2>Doanh Thu Hàng Tháng</h2>
      <Line data={data} options={options} />
    </div>
  )
}

export default Dashboard
