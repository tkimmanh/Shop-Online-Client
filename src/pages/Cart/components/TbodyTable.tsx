import { useEffect, useState } from 'react'
import { FiMinus, FiTrash2 } from 'react-icons/fi'
import { GoPlus } from 'react-icons/go'

const TbodyTable = (props: any) => {
  const { item, handleRemove, setDataList, dataList, index } = props
  const [count, setCount] = useState<number>(item?.total)

  useEffect(() => {
    const _data = [...dataList]
    _data[index] = {
      ...item,
      total: count
    }
    setDataList(_data)
  }, [count])

  return (
    <tr>
      <td className='border p-[15px] w-[45%]'>
        <div className='flex'>
          <img src={item?.imageUrl} className='h-[150px] w-[100px]' />
          <div className='ml-[15px]'>
            <p className='mb-[10px]'>{item?.name}</p>
            <p className=''>{Number(item?.price || 0)?.toLocaleString('en')}đ</p>
          </div>
        </div>
      </td>
      <td className='border p-[15px] w-[25%]'>
        <div className='flex col-span-3 justify-center'>
          <p
            className='border border-[#000] w-[42px] h-[40px] text-center text-[20px] font-[400] flex items-center justify-center cursor-pointer'
            onClick={() => {
              count > 1 && setCount((pre: number) => --pre)
            }}
          >
            <FiMinus />
          </p>
          <input
            type='text'
            value={count}
            onChange={(e: any) => {
              setCount(e?.target?.value)
            }}
            className='border-t border-b border-[#000] w-[42px] h-[40px] text-center text-[18px] font-[400] leading-[31px]'
          />
          <p
            className='border border-[#000] w-[42px] h-[40px] text-center text-[20px] font-[400] flex items-center justify-center cursor-pointer'
            onClick={() => {
              setCount((pre: number) => ++pre)
            }}
          >
            <GoPlus />
          </p>
        </div>
      </td>
      <td className='border p-[15px] text-center w-[25%]'>
        {Number(item?.price * count || 0)?.toLocaleString('en')} đ
      </td>
      <td className='border p-[15px] text-center w-[5%]'>
        <FiTrash2
          className='w-[30px] h-auto mx-auto cursor-pointer'
          onClick={() => handleRemove && handleRemove(item?.id)}
        />
      </td>
    </tr>
  )
}

export default TbodyTable
