import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import ReactQuill from 'react-quill'
import { Link, useParams } from 'react-router-dom'
import ReactSelect from 'react-select'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'
import Input from 'src/components/Input'
import { routes } from 'src/routes/routes'
import topicService from 'src/services/topic.service'
import postsService from 'src/services/posts.service'
import usersService from 'src/services/users.service'
import { useDropzone } from 'react-dropzone'
import { CiTrash } from 'react-icons/ci'

import { yupResolver } from '@hookform/resolvers/yup'
import { postsSchema } from 'src/lib/yup/posts.schema'

interface FileWithPreview extends File {
  preview: string
}

const PostsAddNew = () => {
  const dataValue =
    'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'

  const [value, setValue] = useState(dataValue)
  const [thumbnail, setThumbnail] = useState<FileWithPreview[]>([])


  const { data: topics } = useQuery({
    queryKey: ['TOPICS'],
    queryFn: () => {
      return topicService.getAllTopic()
    }
  })
  const { data: users } = useQuery({
    queryKey: ['USERS'],
    queryFn: () => {
      return usersService.getAllUser()
    }
  })
  const topicOptions = topics?.data?.getAllTopic?.map((topic: any) => ({
    value: topic._id,
    label: topic.name
  }))
  const userOptions = users?.data?.result?.map((user: any) => ({
    value: user._id,
    label: user.full_name
  }))

  const [selectedUser, setSelectedUserOptions] = useState<any>([])

  const [selectedTopic, setSelectedTopicOptions] = useState<any>([])

  const removeThumbnail = () => {
    setThumbnail([])
  }

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(postsSchema)
  })
  const { enqueueSnackbar } = useSnackbar()


  const addNewProductMutations = useMutation({
    mutationFn: (body: any) => postsService.createPosts(body),
    onSuccess: () => {
      reset()
      setValue('')
      setSelectedUserOptions([])
      setSelectedTopicOptions([])
      setThumbnail([])
      enqueueSnackbar('Thêm mới thành công', { variant: 'success' })
    }
  })

  const { getRootProps: getThumbnailRootProps, getInputProps: getThumbnailInputProps } = useDropzone({
    accept: 'image/*' as any,
    multiple: false,
    onDrop: (acceptedFiles: File[]) => {
      setThumbnail(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        ) as FileWithPreview[]
      )
    }
  })



  const onSubmit = async (data: any) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('content', data.content)
    if (thumbnail.length > 0) {
      formData.append('thumbnail', thumbnail[0])
    }
    formData.append('topic', selectedTopic.value as any)
    formData.append('author', selectedUser.value as any)
    try {
      await addNewProductMutations.mutateAsync(formData)
    } catch (error) {
      console.log('error:', error)
    }
  }

  const customFilterOption = (option: any, inputValue: any) => {
    return option.label.toLowerCase().includes(inputValue.toLowerCase())
  }

  return (
    <div>
      <div className='flex items-center justify-between gap-x-5 mb-5'>
        <Heading>Post Thêm mới</Heading>
        <Link to={routes.PostsAdmin.path}>
          <Button className='py-2 px-6 text-xs' kind='primary'>
            Quản lý bài viết
          </Button>
        </Link>
      </div>
      <form action='' onSubmit={handleSubmit(onSubmit, (errors)=>{
        console.log('Validation errors:', errors)
      })}>
        <div className='w-full grid grid-cols-10 gap-x-2'>
          <Input
            className='col-span-5'
            type='text'
            name='title'
            register={register}
            placeholder='Title'
            errorMessage={errors.title?.message as any}
          ></Input>
        </div>
        <div className='grid grid-cols-2 gap-x-5 mb-5'>
          <Controller
            name='author'
            control={control}
            render={({ field }) => (
              <ReactSelect
                {...field}
                options={userOptions}
                isMulti={false}
                value={selectedUser}
                onChange={(selectedOption) => {
                  setSelectedUserOptions(selectedOption)
                  field.onChange(selectedOption)
                }}
                placeholder='Select author'
              />
            )}
          />
          {errors.author && <p className='text-red-500'>{errors.author.message}</p>}

          <Controller
            name='topic'
            control={control}
            render={({ field }) => (
              <ReactSelect
                {...field}
                options={topicOptions}
                isMulti={false}
                value={selectedTopic}
                onChange={(selectedOption) => {
                  setSelectedTopicOptions(selectedOption)
                  field.onChange(selectedOption)
                }}
                placeholder='Select topic'
              />
            )}
          />
          {errors.topic && <p className='text-red-500'>{errors.topic.message}</p>}

        </div>
        <div>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
            )}
          />
          {errors.content && <p className='text-red-500'>{errors.content?.message}</p>}
        </div>


        <div className='mt-5 grid grid-cols-10 gap-x-5'>
          <div className='col-span-3'>
            <div
              {...getThumbnailRootProps()}
              className='h-[250px] border-2 rounded-md border-dashed flex justify-center items-center overflow-hidden bg-white'
            >
              <input type='file' {...getThumbnailInputProps()} />
              {thumbnail?.length > 0 ? (
                thumbnail.map((file) => (
                  <div key={file.name} className='w-full h-full relative'>
                    <img src={file.preview} alt='Preview' className='w-full h-full absolute object-contain' />
                    <button
                      className='absolute bg-white text-black left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-1 rounded-full shadow-lg'
                      onClick={() => removeThumbnail()}
                    >
                      <CiTrash size={30} />
                    </button>
                  </div>
                ))
              ) : (
                <img
                  className='object-contain h-full w-full'
                  src='https://static.vecteezy.com/system/resources/previews/004/968/473/original/upload-or-add-a-picture-jpg-file-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-etc-vector.jpg'
                  alt='Placeholder'
                />
              )}
            </div>
          </div>
        </div>
        <Button
          isLoading={addNewProductMutations.isLoading}
          type='submit'
          className='px-10 py-3 text-sm rounded mt-5'
          kind='secondary'
        >
          Thêm mới
        </Button>
      </form>
    </div>
  )
}

export default PostsAddNew
