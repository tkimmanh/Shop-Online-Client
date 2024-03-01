import { AppContext } from 'src/context/app.context'
import { ReactNode, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { routes } from './routes'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <>{children}</> : <Navigate to={routes.Product.path}></Navigate>
}

export default ProtectedRoute
