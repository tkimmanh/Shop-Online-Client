import useRouteElements from './hooks/useRoutesElements'

function App() {
  const routeElements = useRouteElements()
  return <>{routeElements}</>
}

export default App
