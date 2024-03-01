import DashboardLayout from 'src/Layout/DashboardLayout'
import ProtectedRoute from 'src/routes/ProtectedRoute'
import React, { ReactNode, Suspense } from 'react'
import AuthLayout from 'src/Layout/AuthLayout'
import MainLayout from 'src/Layout/MainLayout'
import { useRoutes } from 'react-router-dom'
import { routes } from 'src/routes/routes'

interface LayoutProps {
  children: React.ReactNode
}

interface LazyLoadingWrapperProps {
  children: ReactNode
}

function LazyLoadingWrapper({ children }: LazyLoadingWrapperProps) {
  return <Suspense fallback={<div />}>{children}</Suspense>
}

const layoutComponents: { [key: string]: React.ComponentType<LayoutProps> } = {
  MainLayout: MainLayout,
  DashboardLayout: DashboardLayout,
  AuthLayout: AuthLayout
}

function useRouteElements() {
  const routeElements = useRoutes(
    Object.entries(routes).map(([key, route]) => {
      const Layout = layoutComponents[route.layout]
      const Element = route.element
      const wrappedElement = (
        <LazyLoadingWrapper key={key}>
          <Layout>
            <Element />
          </Layout>
        </LazyLoadingWrapper>
      )
      return {
        path: route.path,
        element: route.protected ? <ProtectedRoute key={key}>{wrappedElement}</ProtectedRoute> : wrappedElement
      }
    })
  )
  return routeElements
}

export default useRouteElements
