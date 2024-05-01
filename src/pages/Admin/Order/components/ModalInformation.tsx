import moment from 'moment'
import Modal from 'src/components/Modal'
import { formatMoney } from 'src/utils/formatMoney'

const ModalInformation = (props: any) => {
  const { isOpen, setIsOpen, detail } = props
  console.log('detail', detail)

  return (
    <Modal
      overlayClassName='flex items-end justify-end '
      className='w-[500px] h-screen p-4'
      isOpenModal={isOpen}
      setIsOpenModal={setIsOpen}
    >
      <div className='h-[100%] overflow-y-auto'>
        <h1 className='text-2xl font-bold mb-[10px] pb-[5px] border-b'>Chi tiết đơn hàng</h1>
        <div className='pb-[10px] border-b'>
          <p className='text-lg font-bold mb-[5px] mt-[15px]'>Trạng thái đơn hàng</p>
          <p className='font-medium mb-[8px]'>
            Ngày tạo: <span>{moment(detail?.createdAt).format('DD/MM/YYYY HH:mm:ss')}</span>
          </p>
          <p className='font-medium mb-[8px]'>
            Tổng tiền: <span>{Number(detail?.total_price || 0).toLocaleString('en')} VNĐ</span>
          </p>
          <p className='font-medium mb-[8px]'>
            Phương thức thanh toán: <span>{detail?.status_payment}</span>
          </p>
          <p className='font-medium mb-[8px]'>
            Trạng thái đơn hàng: <span>{detail?.status}</span>
          </p>
        </div>
        <div className='pb-[10px] border-b'>
          <p className='text-lg font-bold mb-[5px]'>Thông tin người dùng</p>
          <p className='font-medium mb-[8px]'>
            Họ và tên: <span>{detail?.user?.full_name}</span>
          </p>
          <p className='font-medium mb-[8px]'>
            Email: <span>{detail?.user?.email}</span>
          </p>
          <p className='font-medium mb-[8px]'>
            Địa chỉ: <span>{detail?.user?.address}</span>
          </p>
          <p className='font-medium mb-[8px]'>
            Số điện thoại: <span>{detail?.user?.phone}</span>
          </p>
        </div>
        <p className='text-lg font-bold mt-[15px]'>Thông tin sản phẩm đã đặt</p>
        {detail?.products?.map((_item: any) => {
          return (
            <div className='flex items-center justify-between'>
              <div className='py-[10px] border-b'>
                <p className='font-medium mb-[8px]'>
                  Tên : <span>{_item?.product?.title}</span>
                </p>
                <p className='font-medium mb-[8px]'>
                  Giá: <span>{Number(_item?.product?.price || 0).toLocaleString('en')}</span>
                </p>
                <p className='font-medium mb-[8px]'>
                  Danh mục: <span>{_item?.product?.category?.title || '(Trống)'}</span>
                </p>
                <p className='font-medium mb-[8px]'>
                  Kích cỡ: <span>{_item?.size?.name || '(Trống)'}</span>
                </p>
                <p className='font-medium mb-[8px]'>
                  Màu: <span>{_item?.color?.name || '(Trống)'}</span>
                </p>
                <p>
                  Số lượng: <span>{_item?.quantity}</span>
                </p>
              </div>

              <div>
                <img className='w-24 h-40' src={_item?.product?.thumbnail?.url} alt='' />
              </div>
            </div>
          )
        })}
        <h1 className='my-5 text-lg'>
          <span className='text-black font-bold '>Tổng tiền</span> : {formatMoney(detail?.total_price)}
        </h1>
      </div>
    </Modal>
  )
}

export default ModalInformation
