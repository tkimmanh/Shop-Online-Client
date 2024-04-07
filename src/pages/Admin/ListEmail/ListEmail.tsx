import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import ReactQuill from 'react-quill'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import usersService from 'src/services/users.service'
import { useSnackbar } from 'notistack'

const ListEmail = () => {
  const [emails, setEmails] = useState<string[]>([])
  const [selectedEmails, setSelectedEmails] = useState<string[]>([])
  const { register, handleSubmit } = useForm()
  const [text, setText] = useState('')
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await usersService.getEmails()
        setEmails(response.data.emails)
      } catch (error) {
        console.error(error)
      }
    }

    fetchEmails()
  }, [])

  const handleSelectEmail = (email: string) => {
    const newSelectedEmails = selectedEmails.includes(email)
      ? selectedEmails.filter((e) => e !== email)
      : [...selectedEmails, email]
    setSelectedEmails(newSelectedEmails)
  }

  const handleSelectAllEmails = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedEmails(e.target.checked ? emails : [])
  }

  const sendMailMutation = useMutation({
    mutationFn: (body: any) => usersService.sendEmailToAll(body)
  })

  const onsubmit = async ({ subject }: any) => {
    sendMailMutation.mutate(
      { emails: selectedEmails, subject, text },
      {
        onSuccess: () => {
          enqueueSnackbar('Cập nhật mới thành công', { variant: 'success' })
        }
      }
    )
  }

  return (
    <div className='overflow-auto'>
      <form onSubmit={handleSubmit(onsubmit)} className='max-w-4xl mx-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                <input
                  type='checkbox'
                  onChange={handleSelectAllEmails}
                  checked={emails.length > 0 && selectedEmails.length === emails.length}
                />
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Email
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {emails.map((email, index) => (
              <tr key={index}>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <input
                    type='checkbox'
                    checked={selectedEmails.includes(email)}
                    onChange={() => handleSelectEmail(email)}
                  />
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>{email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='mt-4'>
          <Input type='text' register={register} name='subject' placeholder='Subject' />
          <div className='mt-5'>
            <ReactQuill theme='snow' value={text} onChange={setText} />
          </div>
          <Button kind='primary' type='submit' className='py-3 px-6 mt-4 text-xs'>
            Send Email
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ListEmail
