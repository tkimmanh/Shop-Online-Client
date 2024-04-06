import { enqueueSnackbar } from 'notistack'
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
          enqueueSnackbar('Sửa colors mới thành công', { variant: 'success' })
          queryClient.invalidateQueries(['COLORS'])
        }
      })
      await refetch()
      setIsOpen(false)
    } catch (error) {}
  }

  return (
    <Modal
      overlayClassName='flex items-end justify-end '
      className='w-[500px] h-screen p-4'
      isOpenModal={isOpen}
      setIsOpenModal={setIsOpen}
    >
      <div>
        <h1 className='mb-2'>Color</h1>
        <form action='' onSubmit={handleSubmit(editColor)}>
          <Input
            type='text'
            name='name'
            placeholder='Color'
            register={register}
            defaultValue={detail?.name as string}
            rules={{
              required: true
            }}
          ></Input>
          <Input type='text' name='color_code' placeholder='Color code' register={register}></Input>
          <Button kind='secondary' type='submit' className='text-xs px-3 py-3'>
            Save
          </Button>
        </form>
      </div>
    </Modal>
  )
}

export default ModalInformation
