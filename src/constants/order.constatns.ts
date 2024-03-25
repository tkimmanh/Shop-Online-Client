export const messageOrder = {
  WRONG_USER_INFORMATION: 'Đặt hàng thất bại thông tin khách hàng chưa chính xác',
  ORDER_START: 'Đặt hàng thành công',
  ORDER_CONFIRM: 'Đã xác nhận đơn hàng',
  ORDER_SUCESS: 'Giao hàng thành công',
  ORDER_WAIT_CONFIRM: 'Chờ xác nhận',
  ORDER_FAILED: 'Giao hàng thất bại',
  ORDER_PEDDING: 'Đang giao',
  CANCEL_ORDER: 'Đã hủy',
  USER_CANCEL_ORDER: 'Khách hàng đã hủy',
  CANCEL_ORDER_FAIL: 'Đơn hàng đang được giao và không thể hủy.',
  USER_RETURN_ORDER: 'Khách hàng trả hàng'
}

export const orderStatusOptions = [
  { label: 'Chờ xác nhận', value: messageOrder.ORDER_WAIT_CONFIRM },
  { label: 'Đã xác nhận đơn hàng', value: messageOrder.ORDER_CONFIRM },
  { label: 'Đang giao', value: messageOrder.ORDER_PEDDING },
  { label: 'Giao hàng thành công', value: messageOrder.ORDER_SUCESS },
  { label: 'Đặt hàng thất bại thông tin khách hàng chưa chính xác', value: messageOrder.WRONG_USER_INFORMATION },
  { label: 'Đã hủy', value: messageOrder.CANCEL_ORDER },
  { label: 'Khách hàng đã hủy', value: messageOrder.USER_CANCEL_ORDER },
  { label: 'Đơn hàng đang được giao và không thể hủy', value: messageOrder.CANCEL_ORDER_FAIL },
  { label: 'Hoàn trả', value: messageOrder.USER_RETURN_ORDER }
]
