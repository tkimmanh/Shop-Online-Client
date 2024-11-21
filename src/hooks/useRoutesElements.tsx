import ProtectedRoute from 'src/routes/ProtectedRoute'
import React, { ReactNode, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import { routes } from 'src/routes/routes'
import MainLayout from 'src/layout/MainLayout'
import DashboardLayout from 'src/layout/DashboardLayout'
import AuthLayout from 'src/layout/AuthLayout'

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
        element: (
          <ProtectedRoute key={key} redirectAuthenticatedToHome={route.redirectAuthenticatedToHome}>
            {wrappedElement}
          </ProtectedRoute>
        )
      }
    })
  )
  return routeElements
}

export default useRouteElements
