import { AppContext } from 'src/context/app.context'
import { ReactNode, useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { routes } from './routes'

interface ProtectedRouteProps {
  children: ReactNode
  redirectAuthenticatedToHome?: boolean
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, redirectAuthenticatedToHome = false }) => {
  const { isAuthenticated, user } = useContext(AppContext)

  const location = useLocation()

  const currentRoute = Object.values(routes).find((route) => route.path === location.pathname)

  if (isAuthenticated && redirectAuthenticatedToHome) {
    return <Navigate to={routes.Home.path} replace />
  }

  if (currentRoute?.protected && !isAuthenticated) {
    return <Navigate to={routes.Login.path} replace />
  }

  if (user !== null && currentRoute?.access && !currentRoute.access.some((accessRole) => user.role === accessRole)) {
    return <Navigate to={routes.Home.path} replace />
  }

  return <>{children}</>
}
export default ProtectedRoute
