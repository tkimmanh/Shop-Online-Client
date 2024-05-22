import http from 'src/lib/axios'

const BASE_URL = '/comments'

const postsService = {
  getAllComments(params?: any) {
    return http.get(BASE_URL, { params })
  },
}

export default postsService
