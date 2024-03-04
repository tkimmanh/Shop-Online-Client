import useRouteElements from './hooks/useRoutesElements'
import Modal from 'react-modal'

Modal.setAppElement('#root')
Modal.defaultStyles = {}

function App() {
  const routeElements = useRouteElements()
  return <>{routeElements}</>
}

export default App
