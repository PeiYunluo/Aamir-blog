import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

//封装axios
// create an axios instance实例
const service = axios.create({
  baseURL: "http://localhost:8090", // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

//request interceptor拦截器
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      //TODO 将数据从store转移到cookie 或 本地存储等
      config.headers['token'] = store.getters.token
    }
    return config
  },
  error => {
    // do something with request error
   /* console.log(error) // for debug*/
    return Promise.reject(error)
  }
)



export default service
