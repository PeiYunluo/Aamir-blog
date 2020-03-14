import request from '@/utils/request'

export function getToken() {
  return request({
    url: '/photo/qiniu/getToken', // 假地址 自行替换
    method: 'get'
  })
}

export function getAllphotos() {
  return request({
    url: '/photo/qiniu/getAllphotos', // 假地址 自行替换
    method: 'get'
  })
}
