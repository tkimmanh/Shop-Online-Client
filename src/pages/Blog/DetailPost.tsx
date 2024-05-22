import { useSnackbar } from 'notistack'
import { useMutation, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import postsService from 'src/services/posts.service'
import commentsService from 'src/services/comment.service'
import { useForm, Controller } from 'react-hook-form';
import ReactQuill from 'react-quill';
import React from 'react';
import 'react-quill/dist/quill.snow.css';
import Button from 'src/components/Button'

const DetailBlog = () => {
  const { id: postId } = useParams();
  const { register, handleSubmit, control } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const { data: detailPost } = useQuery({
    queryKey: ['POST'],
    queryFn: () => {
      return postsService.getPosts(postId as string)
    }
  });

  const addNewCommentMutations = useMutation({
    mutationFn: ({ body, postId }) => postsService.comment(body, postId)
  });

  const onSubmit = (value) => {
    addNewCommentMutations.mutate({ body: value, postId }, {
      onSuccess: () => {
        enqueueSnackbar('Thêm comment mới thành công', { variant: 'success' })
      },
      onError: () => { }
    });
  };

  const { data: comment } = useQuery({
    queryKey: ['COMMENT'],
    queryFn: () => {
      return commentsService.getAllComments()
    }
  })
  console.log(comment);

  return (
    <div>
      <div className='w-[1440px] mx-auto mt-[70px] max-[1450px]:p-[10px]'>
        <div className="h-[625px] bg-center bg-no-repeat bg-cover flex items-center justify-center mb-[120px] w-full">
          <img id={detailPost?.data?.post._id}
            src={detailPost?.data?.post.thumbnail.url}
            alt=''
            className='w-full h-auto'
          />
        </div>

        <div className='min-[401px]:grid grid-cols-2 mb-[120px] max-[800px]:mx-auto'>
          <div className='flex flex-col justify-center'>
            <div className='w-[200%] '>
              <p className='text-[#000] text-[32px] mb-[44px] text-center'>{detailPost?.data?.post.title}</p>
              <p className='text-[#4e4e4e] text-[20px] leading-[24px] ' dangerouslySetInnerHTML={{ __html: detailPost?.data?.post.content }}>
              </p>
            </div>
          </div>
        </div>
      </div>

      <form action="" method="post" onSubmit={handleSubmit(onSubmit)} className="text-center">
        <div>
          <h2>Comment:</h2>
        </div>
        <div style={{ width: '400px', margin: '0 auto' }}>
          <Controller
            name="comment"
            control={control}
            render={({ field }) => (
              <ReactQuill theme="snow" value={field.value} onChange={field.onChange} />
            )}
          />
        </div>

        <Button
          isLoading={addNewCommentMutations.isLoading}
          type='submit'
          className='px-10 py-3 text-sm rounded mt-5'
          kind='secondary'
        >
          Thêm mới
        </Button>
      </form>

      <div style={{ width: '700px', margin: '20px auto', border: '1px solid #ccc', padding: '10px' }}>
        <h2 className='text-center'>Comments</h2>
        <div>
          {comment?.data?.comments.map((comment: any) => (
            <div key={comment._id} className="border-b border-gray-200 py-4">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">{comment.author.full_name || 'Unknown member'}</p>
                  <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <p className="text-gray-700">{comment.content}</p>
              {comment.error && (
                <div className="text-red-500 text-sm mt-2">
                  <span>Unable to publish. </span>
                  <a href="#" className="underline">Try again</a> or <a href="#" className="underline">Edit</a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DetailBlog;
