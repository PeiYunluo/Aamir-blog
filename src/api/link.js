import request from '@/utils/request'

//得到所有的link
export function getAll(query) {
  return request({
    url: '/link/getAlllinks',
    method: 'get',
    params:query
  })
}
//编辑link
export function editLink(data) {
  return request({
    url: '/link/editlink',
    method: 'post',
    data
  })
}
//增加link
export function addLink(data) {
  return request({
    url: '/link/addLink',
    method: 'post',
    data
  })
}
//删除link
export function deleteLink(data) {
  return request({
    url: '/link/deleteLink',
    method: 'post',
    data
  })
}
