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
  if (response.status === 200) {
    return response.data
  } else {
    return Promise.reject(response.data)
  }
}, (error) => {
  return Promise.reject(error)
})

// 统一API对象，便于管理
const api = {
  login: (data) => {
    return axios.post('/login', data)
  },
  createArticle: (data) => {
    return axios.post('/createArticle', data)
  },
  getArticleInfo: (data) => {
    return axios.post('/getArticleInfo', data)
  },
  updateArticle: (data) => {
    return axios.post('/updateArticle', data)
  },
  listArticles: (data) => {
    return axios.post('/listArticles', data)
  },
  deleteArticle: (data) => {
    return axios.post('/deleteArticle', data)
  },
  listComments: (data) => {
    return axios.post('/listComments', data)
  },
  deleteComment: (data) => {
    return axios.post('/deleteComment', data)
  },
  authorReply: (data) => {
    return axios.post('/authorReply', data)
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