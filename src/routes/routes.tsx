import { lazy } from 'react'
const Dashboard = lazy(() => import('src/pages/Dashboard'))
const ProductList = lazy(() => import('src/pages/Product'))
const Home = lazy(() => import('src/pages/Home'))
const Login = lazy(() => import('src/pages/Login'))

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
    path: '/product',
    element: ProductList,
    layout: 'MainLayout',
    protected: false //không được bảo vệ ?
  },
  Dashboard: {
    path: '/dashboard',
    element: Dashboard,
    layout: 'DashboardLayout',
    protected: true //được bảo vệ
  },
  Login: {
    path: '/login',
    element: Login,
    layout: 'AuthLayout',
    protected: false
  }
}
