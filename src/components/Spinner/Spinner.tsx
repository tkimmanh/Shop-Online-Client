const Spinner = ({ fullHeight }: { fullHeight?: boolean }) => {
  return (
    <div
      className='flex items-center justify-center w-full'
      style={{
        height: fullHeight ? '100vh' : 'auto'
      }}
    >
      <div className='border-8 border-solid w-10 h-10 rounded-full border-t-transparent animate-spin'></div>
    </div>
  )
}

export default Spinner
