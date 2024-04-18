import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import Modal from 'src/components/Modal'
import variantsService from 'src/services/variants.service'

const ModalInformation = (props: any) => {
  const { isOpen, setIsOpen, detail, refetch } = props
  const { register, handleSubmit } = useForm()
  const queryClient = useQueryClient()

  const editColorMutation = useMutation({
    mutationKey: ['COLORS'],
    mutationFn: (body) => variantsService.editColor(body)
  })

  const editColor = async (value: any) => {
    try {
      const data = { ...value, id: detail?._id }
      editColorMutation.mutate(data, {
        onSuccess() {
          // enqueueSnackbar('Sửa màu thành công', { variant: 'success' }); // Uncomment or add enqueueSnackbar call if needed
          queryClient.invalidateQueries(['COLORS'])
        }
      })
      await refetch()
      setIsOpen(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Modal
      overlayClassName='flex items-end justify-end'
      className='w-[500px] h-screen p-4'
      isOpenModal={isOpen}
      setIsOpenModal={setIsOpen}
    >
      <div>
        <h1 className='mb-2'>Color</h1>
        <form onSubmit={handleSubmit(editColor)}>
          <Input
            type='text'
            name='name'
            placeholder='Color'
            register={register}
            defaultValue={detail?.name as string}
            rules={{
              required: true
            }}
          />

          <div className='flex items-center gap-x-5'>
            <input
              className='h-[40px] w-[100px] px-1 border-2'
              type='color'
              {...register('color_code')}
              defaultValue={detail.color_code}
            ></input>
            <Button kind='secondary' type='submit' className='text-xs px-3 py-3'>
              Save
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default ModalInformation
