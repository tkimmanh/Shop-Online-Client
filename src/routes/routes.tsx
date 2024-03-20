import { lazy } from 'react'

const DetailProduct = lazy(() => import('src/pages/DetailProduct'))
const Dashboard = lazy(() => import('src/pages/Dashboard'))
const ProductList = lazy(() => import('src/pages/Products'))
const Register = lazy(() => import('src/pages/Register'))
const Home = lazy(() => import('src/pages/Home'))
const Login = lazy(() => import('src/pages/Login'))
const About = lazy(() => import('src/pages/About'))
const CartPage = lazy(() => import('src/pages/Cart'))
const ProductsAdmin = lazy(() => import('src/pages/Admin/Products/ProductsList'))
const ProductAddNew = lazy(() => import('src/pages/Admin/Products/ProductsAddNew'))
const VariantsManage = lazy(() => import('src/pages/Admin/Variants/VariantsManage'))
interface IRoute {
  path: string
  element: React.LazyExoticComponent<() => JSX.Element>
  layout: 'AuthLayout' | 'DashboardLayout' | 'MainLayout'
  redirectAuthenticatedToHome?: boolean
  protected?: boolean
  access?: string[]
}
type IRoutes = Record<string, IRoute>

export const routes: IRoutes = {
  Home: {
    path: '/',
    element: Home,
    layout: 'MainLayout'
  },
  Product: {
    path: '/products',
    element: ProductList,
    layout: 'MainLayout'
  },
  ProductDetail: {
    path: '/:id',
    element: DetailProduct,
    layout: 'MainLayout'
  },
  CartPayment: {
    path: '/cart-payment',
    element: CartPage,
    layout: 'MainLayout'
  },
  AboutUs: {
    path: '/about',
    element: About,
    layout: 'MainLayout'
  },
  Dashboard: {
    path: '/admin',
    access: ['admin', 'staff'],
    element: Dashboard,
    layout: 'DashboardLayout'
  },
  ProductsAdmin: {
    path: '/admin/products-list',
    access: ['admin', 'staff'],
    element: ProductsAdmin,
    layout: 'DashboardLayout'
  },
  ProductAddNew: {
    path: '/admin/products-add',
    access: ['admin', 'staff'],
    element: ProductAddNew,
    layout: 'DashboardLayout'
  },
  VariantsManage: {
    path: '/admin/variants-manage',
    access: ['admin', 'staff'],
    element: VariantsManage,
    layout: 'DashboardLayout'
  },
  Login: {
    path: '/sigin',
    element: Login,
    layout: 'AuthLayout',
    redirectAuthenticatedToHome: true
  },
  Register: {
    path: '/register',
    element: Register,
    layout: 'AuthLayout',
    redirectAuthenticatedToHome: true
  }
}
