export const links = [
  {
    id: 1,
    path: '/',
    text: 'Home'
  },
  {
    id: 4,
    path: '/blog',
    text: 'Blogs'
  },
  {
    id: 2,
    path: '/about',
    text: 'About Us'
  },
  {
    id: 3,
    path: '/faq',
    text: 'Faq'
  }
]

export const linksDashboard = [
  {
    id: 1,
    text: 'Dashboard',
    path: '/admin',
    role: ['admin']
  },
  {
    id: 2,
    text: 'Quản lý sản phẩm',
    path: '/admin/products-list',
    role: ['admin']
  },
  {
    id: 15,
    text: 'Sản phẩm đã xoá',
    path: '/admin/products-deleted',
    role: ['admin']
  },
  {
    id: 3,
    text: 'Quản lý danh mục',
    path: '/admin/category-list',
    role: ['admin']
  },
  {
    id: 4,
    text: 'Quản lý biến thể',
    path: '/admin/variants-manage',
    role: ['admin']
  },
  {
    id: 5,
    text: 'Quản lý người dùng',
    path: '/admin/user-list',
    role: ['admin']
  },
  {
    id: 6,
    text: 'Quản lý đơn hàng',
    path: '/admin/order-list',
    role: ['admin', 'staff']
  },
  {
    id: 9,
    text: 'Danh sách đơn hàng hoàn',
    path: '/admin/refunds-list',
    role: ['admin', 'staff']
  },
  {
    id: 7,
    text: 'Quản lý mã giảm giá',
    path: '/admin/coupon',
    role: ['admin', 'staff']
  },
  {
    id: 8,
    text: 'Gửi email đến khách hàng',
    path: '/admin/list-email',
    role: ['admin', 'staff']
  },
  {
    id: 11,
    text: 'Quản lý chủ đề',
    path: '/admin/topic-list',
    role: ['admin', 'staff']
  }
]
