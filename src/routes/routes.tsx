import { lazy } from 'react'

const DetailProduct = lazy(() => import('src/pages/DetailProduct'))
const Dashboard = lazy(() => import('src/pages/Admin/Dashboard'))
const ProductList = lazy(() => import('src/pages/Products'))
const Register = lazy(() => import('src/pages/Register'))
const Home = lazy(() => import('src/pages/Home'))
const Login = lazy(() => import('src/pages/Login'))
const About = lazy(() => import('src/pages/About'))
const Blog = lazy(() => import('src/pages/Blog'))
const CartPage = lazy(() => import('src/pages/Cart'))
const UsersAdmin = lazy(() => import('src/pages/Admin/Users/UserList'))
const UsersDetailAdmin = lazy(() => import('src/pages/Admin/Users/DetailUser'))
const TopicsAdmin = lazy(() => import('src/pages/Admin/Topic/TopicList'))
const TopicsAddNew = lazy(() => import('src/pages/Admin/Topic/TopicAddNew'))
const TopicsEdit = lazy(() => import('src/pages/Admin/Topic/TopicEdit'))
const CategoriesAdmin = lazy(() => import('src/pages/Admin/Categories/CategoriesList'))
const CategoriesAddNew = lazy(() => import('src/pages/Admin/Categories/CategoriesAddNew'))
const CategoriesEdit = lazy(() => import('src/pages/Admin/Categories/CategoriesEdit'))
const ProductsAdmin = lazy(() => import('src/pages/Admin/Products/ProductsList'))
const ProductAddNew = lazy(() => import('src/pages/Admin/Products/ProductsAddNew'))
const VariantsManage = lazy(() => import('src/pages/Admin/Variants/VariantsManage'))
const Profile = lazy(() => import('src/pages/Profile'))
const ListOderAdmin = lazy(() => import('src/pages/Admin/Order/ListOrder'))
const RefundsList = lazy(() => import('src/pages/Admin/RefundsList'))
const PaymentSucess = lazy(() => import('src/pages/PaymentSuccess'))
const ListOrder = lazy(() => import('src/pages/Order'))
const CounponPage = lazy(() => import('src/pages/Admin/Coupon/Counpon'))
const CouponForm = lazy(() => import('src/pages/Admin/Coupon/CouponForm'))
const ListEmail = lazy(() => import('src/pages/Admin/ListEmail'))
const NotFound = lazy(() => import('src/pages/NotFound'))
const WishList = lazy(() => import('src/pages/WishList'))
const ProductDeleted = lazy(() => import('src/pages/Admin/Products/ProductDeleted'))
interface IRoute {
  path: string
  element: React.LazyExoticComponent<() => JSX.Element>
  layout: 'AuthLayout' | 'DashboardLayout' | 'MainLayout'
  redirectAuthenticatedToHome?: boolean
  redirectAuthenticatedToHomeIsAuthenticated?: boolean
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
    path: '/products/:id/:slug',
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
  Blog: {
    path: '/blog',
    element: Blog,
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
    layout: 'MainLayout',
    protected: true
  },
  ListOrder: {
    path: '/list-order',
    element: ListOrder,
    layout: 'MainLayout'
  },
  WishList: {
    path: '/wish-list',
    element: WishList,
    layout: 'MainLayout'
  },
  //Dashboard
  Dashboard: {
    path: '/admin',
    access: ['admin', 'staff'],
    element: Dashboard,
    layout: 'DashboardLayout',
    protected: true
  },
  CounponPage: {
    path: '/admin/coupon',
    access: ['admin', 'staff'],
    element: CounponPage,
    layout: 'DashboardLayout',
    protected: true
  },
  CouponFormAdd: {
    path: '/admin/form-coupon',
    access: ['admin'],
    element: CouponForm,
    layout: 'DashboardLayout',
    protected: true
  },
  ListEmail: {
    path: '/admin/list-email',
    element: ListEmail,
    access: ['admin', 'staff'],
    layout: 'DashboardLayout',
    protected: true
  },
  CouponFormedit: {
    path: '/admin/form-coupon/:id',
    element: CouponForm,
    access: ['admin'],
    layout: 'DashboardLayout',
    protected: true
  },
  ListOrderAdmin: {
    path: '/admin/order-list',
    access: ['admin', 'staff'],
    element: ListOderAdmin,
    layout: 'DashboardLayout',
    protected: true
  },
  ListRefundsAdmin: {
    path: '/admin/refunds-list',
    access: ['admin', 'staff'],
    element: RefundsList,
    layout: 'DashboardLayout',
    protected: true
  },
  UsersAdmin: {
    path: '/admin/user-list',
    access: ['admin'],
    element: UsersAdmin,
    layout: 'DashboardLayout',
    protected: true
  },
  UsersDetailAdmin: {
    path: '/admin/user/:id',
    access: ['admin'],
    element: UsersDetailAdmin,
    layout: 'DashboardLayout',
    protected: true
  },
  TopicsAdmin: {
    path: '/admin/topic-list',
    access: ['admin'],
    element: TopicsAdmin,
    layout: 'DashboardLayout',
    protected: true
  },
  TopicsAddNew: {
    path: '/admin/topic-add-new',
    access: ['admin'],
    element: TopicsAddNew,
    layout: 'DashboardLayout',
    protected: true
  },
  TopicsEdit: {
    path: '/admin/topic/:id',
    access: ['admin'],
    element: TopicsEdit,
    layout: 'DashboardLayout',
    protected: true
  },
  CategoriesAdmin: {
    path: '/admin/category-list',
    access: ['admin'],
    element: CategoriesAdmin,
    layout: 'DashboardLayout',
    protected: true
  },
  CategoriesAddNew: {
    path: '/admin/category-add-new',
    access: ['admin'],
    element: CategoriesAddNew,
    layout: 'DashboardLayout',
    protected: true
  },
  Categoriesedit: {
    path: '/admin/category/:id',
    access: ['admin'],
    element: CategoriesEdit,
    layout: 'DashboardLayout',
    protected: true
  },
  ProductsAdmin: {
    path: '/admin/products-list',
    access: ['admin'],
    element: ProductsAdmin,
    layout: 'DashboardLayout',
    protected: true
  },
  ProductAddNew: {
    path: '/admin/products-add',
    access: ['admin'],
    element: ProductAddNew,
    layout: 'DashboardLayout',
    protected: true
  },
  ProductView: {
    path: '/admin/products/:id',
    access: ['admin'],
    element: ProductAddNew,
    layout: 'DashboardLayout',
    protected: true
  },
  VariantsManage: {
    path: '/admin/variants-manage',
    access: ['admin'],
    element: VariantsManage,
    layout: 'DashboardLayout',
    protected: true
  },
  ProductDeleted: {
    path: '/admin/products-deleted',
    access: ['admin'],
    element: ProductDeleted,
    layout: 'DashboardLayout',
    protected: true
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
  },
  NotFound: {
    path: '/not-found',
    element: NotFound,
    layout: 'MainLayout'
  }
}
