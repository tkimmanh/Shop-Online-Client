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
const Profile = lazy(() => import('src/pages/Profile'))
const ListOderAdmin = lazy(() => import('src/pages/Admin/Order/ListOrder'))
const PaymentSucess = lazy(() => import('src/pages/PaymentSuccess'))
const ListOrder = lazy(() => import('src/pages/Order'))
const CounponPage = lazy(() => import('src/pages/Admin/Coupon/Counpon'))
const CouponForm = lazy(() => import('src/pages/Admin/Coupon/CouponForm'))
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
  PaymentSucess: {
    path: '/payment-success',
    element: PaymentSucess,
    layout: 'MainLayout'
  },
  Profile: {
    path: '/profile',
    element: Profile,
    layout: 'MainLayout'
  },
  ListOrder: {
    path: '/list-order',
    element: ListOrder,
    layout: 'MainLayout'
  },

  Dashboard: {
    path: '/admin',
    access: ['admin', 'staff'],
    element: Dashboard,
    layout: 'DashboardLayout'
  },
  CounponPage: {
    path: '/admin/coupon',
    element: CounponPage,
    layout: 'DashboardLayout'
  },
  CouponFormAdd: {
    path: '/admin/form-coupon',
    element: CouponForm,
    layout: 'DashboardLayout'
  },
  CouponFormEdit: {
    path: '/admin/form-coupon/:id',
    element: CouponForm,
    layout: 'DashboardLayout'
  },
  ListOrderAdmin: {
    path: '/admin/order-list',
    access: ['admin', 'staff'],
    element: ListOderAdmin,
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
  ProductView: {
    path: '/admin/products/:id',
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
