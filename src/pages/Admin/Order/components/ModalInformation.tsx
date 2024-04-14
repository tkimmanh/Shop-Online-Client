import moment from 'moment'
import Modal from 'src/components/Modal'

const ModalInformation = (props: any) => {
  const { isOpen, setIsOpen, detail } = props

  return (
    <Modal
      overlayClassName='flex items-end justify-end '
      className='w-[500px] h-screen p-4'
      isOpenModal={isOpen}
      setIsOpenModal={setIsOpen}
    >
      <div className='h-[100%] overflow-y-auto'>
        <h1 className='text-2xl font-bold mb-[10px] pb-[5px] border-b'>Detail Order</h1>
        <div className='pb-[10px] border-b'>
          <p className='text-lg font-bold mb-[5px] mt-[15px]'>Status Order</p>
          <p className='font-medium mb-[8px]'>
            Created At: <span>{moment(detail?.createdAt).format('DD/MM/YYYY HH:mm:ss')}</span>
          </p>
          <p className='font-medium mb-[8px]'>
            Total Price: <span>{Number(detail?.total_price || 0).toLocaleString('en')} VNĐ</span>
          </p>
          <p className='font-medium mb-[8px]'>
            Status Payment: <span>{detail?.status_payment}</span>
          </p>
          <p className='font-medium mb-[8px]'>
            Status: <span>{detail?.status}</span>
          </p>
        </div>
        <div className='pb-[10px] border-b'>
          <p className='text-lg font-bold mb-[5px]'>User Information</p>
          <p className='font-medium mb-[8px]'>
            Full Name: <span>{detail?.user?.full_name}</span>
          </p>
          <p className='font-medium mb-[8px]'>
            Email: <span>{detail?.user?.email}</span>
          </p>
          <p className='font-medium mb-[8px]'>
            Phone Number: <span>{detail?.user?.phone}</span>
          </p>
        </div>
        <p className='text-lg font-bold mt-[15px]'>Products Information</p>
        {detail?.products?.map((_item: any) => {
          return (
            <div className='py-[10px] border-b'>
              <p className='font-medium mb-[8px]'>
                Name: <span>{_item?.product?.title}</span>
              </p>
              <p className='font-medium mb-[8px]'>
                Price: <span>{Number(_item?.product?.price || 0).toLocaleString('en')}</span>
              </p>
              <p className='font-medium mb-[8px]'>
                Category: <span>{_item?.product?.category?.title}</span>
              </p>
              <p className='font-medium mb-[8px]'>
                Size: <span>{_item?.size?.name}</span>
              </p>
              <p className='font-medium mb-[8px]'>
                Color: <span>{_item?.color?.name}</span>
              </p>
            </div>
          )
        })}
      </div>
    </Modal>
  )
}

export default ModalInformation
