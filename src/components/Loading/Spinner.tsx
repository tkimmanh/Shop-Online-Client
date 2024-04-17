import Loading from 'src/components/Loading/Loading'

const Spinner = () => (
  <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
    <div className='loader'>
      <Loading></Loading>
    </div>
  </div>
)

export default Spinner
