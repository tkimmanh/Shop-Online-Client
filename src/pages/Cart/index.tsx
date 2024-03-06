import { useMemo, useState } from 'react'
import { listProducts } from 'src/constants/data.constants'
import TbodyTable from './components/TbodyTable'

const CartPage = () => {
  const [dataList, setDataList] = useState(listProducts.slice(0, 3).map((product) => ({ ...product, total: 1 })))

  const handleRemove = (id: number | string) => {
    const _data = dataList.filter((x: any) => x.id !== id)
    setDataList(_data)
  }

  const total = useMemo(() => {
    return dataList.reduce((pre, nex) => pre + Number(nex?.total || 0) * Number(nex?.price || 0), 0)
  }, [JSON.stringify(dataList)])

  return (
    <div className='w-[80%] m-auto'>
      <p className='py-[30px] text-[30px] font-bold'>Cart</p>
      <table className='w-full border-collapse border'>
        <thead>
          <td className='border p-[15px] font-[500]'>Product</td>
          <td className='border p-[15px] font-[500] text-center'>Quantity</td>
          <td className='border p-[15px] font-[500] text-center'>Subtotal</td>
        </thead>
        <tbody>
          {dataList.length > 0 ? (
            dataList.map((item: any, index: number) => (
              <TbodyTable
                item={item}
                handleRemove={handleRemove}
                index={index}
                dataList={dataList}
                setDataList={setDataList}
              />
            ))
          ) : (
            <tr>
              <td colSpan={3} className='text-center p-[20px] font-[500] text-[16px] text-gray-500'>
                There are no products in the cart
              </td>
            </tr>
          )}
          {dataList.length > 0 && (
            <tr>
              <td className='w-[45%]'></td>
              <td className='w-[25%]'></td>
              <td className='w-[25%] text-center font-medium p-[15px]'>Total: {total.toLocaleString('en')} đ </td>
              <td className='w-[5%]'></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default CartPage
