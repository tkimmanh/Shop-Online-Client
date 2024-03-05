import { lazy } from 'react'
const DetailProduct = lazy(() => import('src/pages/DetailProduct'))
const Dashboard = lazy(() => import('src/pages/Dashboard'))
const ProductList = lazy(() => import('src/pages/Products'))
const Register = lazy(() => import('src/pages/Register'))
const Home = lazy(() => import('src/pages/Home'))
const Login = lazy(() => import('src/pages/Login'))
const About = lazy(() => import('src/pages/About'))

interface IRoute {
  path: string
  element: React.LazyExoticComponent<() => JSX.Element>
  layout: 'AuthLayout' | 'DashboardLayout' | 'MainLayout'
  protected: boolean
}
type IRoutes = Record<string, IRoute>

export const routes: IRoutes = {
  Home: {
    path: '/',
    element: Home,
    layout: 'MainLayout',
    protected: false //không được bảo vệ ?
  },
  Product: {
    path: '/products',
    element: ProductList,
    layout: 'MainLayout',
    protected: false //không được bảo vệ ?
  },
  ProductDetail: {
    path: '/product/:id',
    element: DetailProduct,
    layout: 'MainLayout',
    protected: false //không được bảo vệ ?
  },

  Dashboard: {
    path: '/dashboard',
    element: Dashboard,
    layout: 'DashboardLayout',
    protected: true //được bảo vệ
  },
  AboutUs: {
    path: '/about',
    element: About,
    layout: 'MainLayout',
    protected: false //được bảo vệ
  },
  Login: {
    path: '/login',
    element: Login,
    layout: 'AuthLayout',
    protected: false
  },
  Register: {
    path: '/register',
    element: Register,
    layout: 'AuthLayout',
    protected: false
  }
}
