import { FaDribbble, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import postsService from 'src/services/posts.service'
import topicService from 'src/services/topic.service'
import React from 'react'
import { useQuery } from 'react-query'
import Card from 'src/components/Card/CardMain'

const Blog = () => {
  const { data: listPost } = useQuery({
    queryKey: ['POST'],
    queryFn: () => {
      return postsService.getAllPosts()
    }
  })
  console.log(listPost);
  const post = listPost?.data?.post;
  const { data: listTopic } = useQuery({
    queryKey: ['TOPIC'],
    queryFn: () => {
      return topicService.getAllTopic()
    }
  })
  const topics = listTopic?.data?.getAllTopic;

  const extractFirstLine = (htmlContent: string): string => {
    const div = document.createElement('div')
    div.innerHTML = htmlContent
    const firstLine = div.innerText.split('\n')[0]
    return firstLine
  }


  return (
    <div className='w-[1440px] mx-auto max-[1440px]:px-[10px]'>
      <p className='text-[#000] text-[35px] leading-[42px] text-center my-[50px]'>Blogs</p>
      <div className='grid grid-cols-12 gap-[20px]'>
        <div className='col-span-9 '>
          <div className='mb-[60px]'>
            <div className='relative'>
              {listPost?.data?.posts?.slice(0, 7).map((post: any) => {
                const firstLine = extractFirstLine(post.content)
                return (
                  <div key={post._id} className='mt-5'>
                    <img id={post._id}
                      src={post.thumbnail?.url}
                      alt=''
                      className='w-full h-auto'
                    />
                    <p className='text-[#4e4e4e] text-[12px] leading-[20px] mt-[26px]'>
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <Link className='inline-block' to={`posts/${post._id}/${post.slug}`}>
                      <p className='text-[#000000] text-[30px] leading-[36px] mt-[3px]'>{post.title}</p>
                    </Link>
                    <div className='text-[#4e4e4e] text-[16px] leading-[27px] mt-[16px]'>
                      {firstLine.length > 100 ? firstLine.slice(0, 100) + '...' : firstLine}
                    </div>

                    <Link className='inline-block' to={`posts/${post._id}/${post.slug}`}>
                      <button
                        className='w-[155px] text-[#fff] bg-[#000] hover:bg-[#fff] hover:text-[#000] font-[400] text-[12px] h-[40px] mt-[15px]'
                        style={{ border: '1px solid #000' }}
                      >
                        ĐỌC THÊM
                      </button>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className='col-span-3 pt-[30px]'>
          <div className='mb-[47px]'>
            <p className='font-medium text-[16px] leading-[20px] text-[#000] mb-[19px] cursor-pointer'>Chủ đề</p>
            {topics?.map((topic: any) => (
              <div key={topic._id}>
                <p className='text-[16px] leading-[27px] text-[#000] mb-[14px] cursor-pointer'>{topic.name}</p>
              </div>
            ))}
          </div>
          <div className='mb-[25px]'>
            <p className='font-medium text-[16px] leading-[20px] text-[#000] mb-[19px]'>Bài viết mới nhất</p>
            {listPost?.data?.posts?.slice(0, 3).map((post: any) => (
              <div key={post._id} className='flex mb-[30px] cursor-pointer'>
                <div className='h-[100px] w-[100px]'>
                  <img
                    id={post._id}
                    src={post.thumbnail?.url}
                    alt=''
                    className='w-full h-auto'
                  />
                </div>
                <div className='w-[calc(100%-115px)] ml-[15px]'>
                  <p className='text-[12px] text-[#4e4e4e] leading-[20px] mb-[6px]'>
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className='text-[18px] text-[#000] leading-[18px]'>{post.title}</p>
                </div>
              </div>
            ))}
          </div>
          <div className='mb-[45px]'>
            <p className='font-medium text-[16px] leading-[20px] text-[#000] mb-[19px]'>SOCIAL</p>
            <div className='flex gap-x-5'>
              <Link to='#' className='border border-[#ededed]  w-8 h-8 flex items-center justify-center'>
                <FaTwitter color='black' fontSize={13} />
              </Link>
              <Link to='#' className='border border-[#ededed]  w-8 h-8 flex items-center justify-center'>
                <FaInstagram color='black' fontSize={14} />
              </Link>
              <Link to='#' className='border border-[#ededed]  w-8 h-8 flex items-center justify-center'>
                <FaFacebookF color='black' fontSize={14} />
              </Link>
              <Link to='#' className='border border-[#ededed]  w-8 h-8 flex items-center justify-center'>
                <FaDribbble color='black' fontSize={14} />
              </Link>
            </div>
          </div>
          <div>
            <p className='font-medium text-[16px] leading-[20px] text-[#000] mb-[19px]'>TAG</p>
            <div className='flex flex-wrap gap-[10px]'>
              {topics?.map((topic: any) => (
                <div key={topic._id}>
                  <p className='tagcloud text-[12px] font-medium leading-[18px] cursor-pointer'>{topic.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog
