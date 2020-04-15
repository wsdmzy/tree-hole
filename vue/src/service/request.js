import axios from 'axios'
import storageService from './storageService'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 1000 * 5,
})

// 请求拦截   携带Authorization请求
service.interceptors.request.use((config) => {
  // console.log(config,'+++')
  Object.assign(config.headers, { Authorization: `Bearer ${storageService.get(storageService.USER_TOKEN)}`})
  return config
}, (error) => {
  return Promise.reject(error)
})

// 响应拦截
service.interceptors.response.use((config) => {
  // console.log(config,'---')
  return config
}, err => {
  console.log(err.response)
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = err.response.data.msg
        break

      case 401:
        err.message = '未授权，请登录'
        break

      case 403:
        err.message = '拒绝访问'
        break

      case 404:
        err.message = `请求地址出错: ${err.response.config.url}`
        break

      case 422:
        err.message = err.response.data.msg
        break

      case 500:
        err.message = err.response.data.msg
        break

      case 501:
        err.message = '服务未实现'
        break

      case 502:
        err.message = '网关错误'
        break

      case 503:
        err.message = '服务不可用'
        break

      case 504:
        err.message = '网关超时'
        break

      case 505:
        err.message = 'HTTP版本不受支持'
        break
      default:
    }
  }
  return Promise.reject(err)
})



export default service