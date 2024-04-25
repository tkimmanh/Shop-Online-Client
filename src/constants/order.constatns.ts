export const messageOrder = {
  ORDER_CONFIRM: 'Đã xác nhận đơn hàng',
  ORDER_PEDDING: 'Đang giao',
  ORDER_SUCESS: 'Giao hàng thành công',
  ORDER_WAIT_CONFIRM: 'Chờ xác nhận',
  ORDER_FAILED: 'Giao hàng thất bại',
  WRONG_USER_INFORMATION: 'Đặt hàng thất bại thông tin khách hàng chưa chính xác',
  CANCEL_ORDER: 'Đã hủy',
  ORDER_CONFIRM_FAIL_2: 'Giao hàng thất bại không thể liên lạc với người nhận',
  ORDER_CONFIRM_FAIL_1: 'Giao hàng thất bại người nhận từ chối nhận hàng',
  ORDER_CONFIRM_FAIL: 'Sản phẩm tạm hết hàng',
  USER_CANCEL_ORDER: 'Khách hàng đã hủy',
  CANCEL_ORDER_FAIL: 'Đơn hàng đang được giao và không thể hủy.',
  USER_RETURN_ORDER: 'Khách hàng trả hàng',
  USER_CANCEL_RETURN_ORDER: 'Hủy hoàn hàng',
  RETURN_ORDER_SUCCESS: 'Trả hàng thành công',
  RETURN_ORDER_FAIL: 'Trả hàng thất bại',
  RETURN_ORDER_WAIT_CONFIRM: 'Đang kiểm tra hàng',
  REUTRN_ORDER_CONFIRM: 'Đã xác nhận trả hàng'
}

export const orderStatusOptions = [
  { label: 'Đã hủy', value: messageOrder.CANCEL_ORDER },
  { label: 'Khách hàng đã hủy', value: messageOrder.USER_CANCEL_ORDER },
  { label: 'Đơn hàng đang được giao và không thể hủy', value: messageOrder.CANCEL_ORDER_FAIL },
  { label: 'Hoàn trả', value: messageOrder.USER_RETURN_ORDER }
]

export const orderStatusAdminOptions = [
  { label: 'Chờ xác nhận', value: messageOrder.ORDER_WAIT_CONFIRM },
  { label: 'Đã xác nhận đơn hàng', value: messageOrder.ORDER_CONFIRM },
  { label: 'Đang giao', value: messageOrder.ORDER_PEDDING },
  { label: 'Giao hàng thành công', value: messageOrder.ORDER_SUCESS },
  { label: 'Sản phẩm tạm hết hàng', value: messageOrder.ORDER_CONFIRM_FAIL },
  { label: 'Đặt hàng thất bại thông tin khách hàng chưa chính xác', value: messageOrder.WRONG_USER_INFORMATION },
  { label: 'Giao hàng thất bại người nhận từ chối nhận hàng', value: messageOrder.ORDER_CONFIRM_FAIL_1 },
  { label: 'Giao hàng thất bại không thể liên lạc với người nhận', value: messageOrder.ORDER_CONFIRM_FAIL_2 }
]
export const orderStatusOptionsReturn = [
  { label: 'Hoàn trả', value: messageOrder.USER_RETURN_ORDER },
  { label: 'Đã xác nhận trả hàng', value: messageOrder.REUTRN_ORDER_CONFIRM },
  { label: 'Đang kiểm tra hàng', value: messageOrder.RETURN_ORDER_WAIT_CONFIRM },
  { label: 'Trả hàng thành công', value: messageOrder.RETURN_ORDER_SUCCESS },
  { label: 'Trả hàng thất bại', value: messageOrder.RETURN_ORDER_FAIL }
]
