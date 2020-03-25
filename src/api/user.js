import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}
export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: {token}
  })
}
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
export function logintoken(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
export function getInfobytoken(token) {
  return request({
    url: '/user/getinfobytoken',
    method: 'get',
    headers:{"Content-Type":"application/json;charset=UTF-8"},
    params:{token}
  })
}
export function getUserInfo() {
  return request({
    url: '/user/getUserInfo',
    method: 'get',
  })
}
export function updateUserInfo(data) {
  return request({
    url: '/user/updateUserInfo',
    method: 'post',
    data
  })
}

export function resetPassword(data) {
  return request({
    url: '/user/resetPassword',
    method: 'post',
    data
  })
}

export function forgotPassword(data) {
  return request({
    url: '/user/forgotPassword',
    method: 'post',
    data
  })
}
