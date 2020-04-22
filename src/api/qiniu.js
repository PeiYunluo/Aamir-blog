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


export function uploadFile() {
  return request({
    url: '/photo/uploadFile', // 假地址 自行替换
    method: 'get'
  })
}

export function getAlllocalphotos() {
  return request({
    url: '/photo/qiniu/getAlllocalphotos', // 假地址 自行替换
    method: 'get'
  })
}

export function getAllAliOssphotos() {
  return request({
    url: '/photo/AliOss/getAllAliOssphotos', // 假地址 自行替换
    method: 'get'
  })
}
