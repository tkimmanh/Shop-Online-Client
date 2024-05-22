import http from 'src/lib/axios'

const BASE_URL = '/posts'

const postsService = {
  createPosts(body: any) {
    return http.post(BASE_URL, body)
  },
  deletePosts(id: string | number) {
    return http.delete(BASE_URL + `/${id}`)
  },
  editPosts(body: any, id?: string) {
    return http.put(BASE_URL + `/${id}`, body)
  },
  getAllPosts(params?: any) {
    return http.get(BASE_URL, { params })
  },
  getPosts(id: string) {
    return http.get(`${BASE_URL}/${id}`)
  },
  comment(body: any, postId: string) {
    return http.post(`${BASE_URL}/${postId}/comment`, body);
  },
}

export default postsService
