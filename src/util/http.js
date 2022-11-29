// 对于数据请求的封装
import axios from 'axios'
import { Toast } from 'vant'
const http = axios.create({
  baseURL: 'https://m.maizuo.com',
  timeout: 10000,
  headers: {
    'X-Client-Info': '{"a":"3000","ch":"1002",  "v":"5.2.1","e":"16640141322560315904491521","bc":"340800"}'
  }
})

// 在发请求之前拦截 --showLoading
http.interceptors.request.use(function (config) {
  Toast.loading({
    message: '加载中...',
    forbidClick: true
  })
  return config
}, function (error) {
  return Promise.reject(error)
})
// 在成功之后拦截 --hideLoading
http.interceptors.response.use(function (response) {
  Toast.clear()
  return response
}, function (error) {
  Toast.clear()
  return Promise.reject(error)
})

export default http
