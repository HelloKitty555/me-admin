import axios from 'axios'

//axios 默认配置
axios.defaults.baseURL = "http://localhost:8081/api"
axios.defaults.headers = {
  'Accept': 'text/x-json'
}
// 请求拦截器配置
axios.interceptors.request.use((request) => {
  return request
}, (error) => {
  return Promise.reject(error);
})
// 响应拦截器配置
axios.interceptors.response.use((response) => {
  return response
}, (error) => {
  return Promise.reject(error)
})

// 统一API对象，便于管理
const api = {
  createArticle: (article) => {
    return axios.post('/createArticle', article)
  },
  getArticle: (id) => {
    return axios.post('/getArticleInfo', {
      id: id
    })
  },
  listArticles: (options) => {
    return axios.post('/listArticles', options)
  },
  uploadFile: (formData) => {
    return axios.post('/uploadFile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data; charset=UTF-8'
      }
    })
  },
  getQiniuUploadToken: () => {
    return axios.post('/getQiniuUploadToken')
  }
}

export default api