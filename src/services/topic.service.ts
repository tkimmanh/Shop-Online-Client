import http from 'src/lib/axios'

const BASE_URL = '/topics'

const topicService = {
  createTopic(body: any) {
    return http.post(BASE_URL, body)
  },
  getAllTopic() {
    return http.get(BASE_URL)
  },
  getTopic(id: string) {
    return http.get(`${BASE_URL}/${id}`)
  },
  editTopic(body: any) {
    return http.put(`${BASE_URL}/${body.id}`, body)
  },
  deleteTopic(id: string) {
    return http.delete(`${BASE_URL}/${id}`)
  }
}

export default topicService
