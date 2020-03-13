import request from '@/utils/request'

export function getAllcategoies() {
  return request({
    url: '/category/getAll',
    method: 'get',
  })
}
export function getlist(query) {
  return request({
    url: '/category/list',
    method: 'get',
    params:query
  })
}

//反转deleted
export function deleteCategory(data) {
  return request({
    url:'category/delete',
    method:'post',
    data
  })
}

export function updatename(data) {
  return request({
    url:'category/updatename',
    method:'post',
    data
  })
}

export function addcategory(data) {
  return request({
    url:'category/add',
    method:'post',
    data
  })
}
