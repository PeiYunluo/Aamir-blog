import request from '@/utils/request'

export function getAllcategoies() {
  return request({
    url: '/category/getAll',
    method: 'get',
  })
}
export function countsposts() {
  return request({
    url: '/data/countsposts',
    method: 'get',
  })
}
export function countstags() {
  return request({
    url: '/data/countstags',
    method: 'get',
  })
}
export function countscategories() {
  return request({
    url: '/data/countscategories',
    method: 'get',
  })
}
export function countsvisits() {
  return request({
    url: '/data/countsvisits',
    method: 'get',
  })
}
export function countsnotifications() {
  return request({
    url: '/data/countsnotifications',
    method: 'get',
  })
}
