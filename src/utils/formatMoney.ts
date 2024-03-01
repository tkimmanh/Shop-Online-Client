export const formatMoney = (amount: number | string) => {
  return amount.toLocaleString('it-IT') + 'đ'
}
