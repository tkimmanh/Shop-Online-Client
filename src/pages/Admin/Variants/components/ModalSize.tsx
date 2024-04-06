import { enqueueSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import Modal from 'src/components/Modal'
import variantsService from 'src/services/variants.service'

const ModalSize = (props: any) => {
  const { isOpen, setIsOpen, detail, refetch } = props
  const { register, handleSubmit } = useForm()
  const queryClient = useQueryClient()

  const editSizeMutation = useMutation({
    mutationKey: ['SIZE'],
    mutationFn: (body) => variantsService.editSize(body)
  })

  const editSize = async (value: any) => {
    try {
      const data = { ...value, id: detail?._id }
      editSizeMutation.mutate(data, {
        onSuccess() {
          enqueueSnackbar('Sửa size mới thành công', { variant: 'success' })
        },
        onSettled: () => {
          queryClient.refetchQueries(['COLORS'])
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
        <h1 className='mb-2'>Size</h1>
        <form action='' onSubmit={handleSubmit(editSize)}>
          <Input
            type='text'
            name='name'
            placeholder='Size'
            defaultValue={detail?.name as string}
            rules={{
              required: true
            }}
            register={register}
          ></Input>
          <Button kind='secondary' type='submit' className='text-xs px-3 py-3'>
            Save
          </Button>
        </form>
      </div>
    </Modal>
  )
}

export default ModalSize
