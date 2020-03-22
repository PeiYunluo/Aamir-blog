import request from '@/utils/request'

//分页得到comment列表
export function getAll(query) {
  return request({
    url: '/comment/getComments',
    method: 'get',
    params:query
  })
}
//根据deleted属性查询并分页
export function getCommentsbydeleted(query) {
  return request({
    url: '/comment/getCommentsbydeleted',
    method: 'get',
    params: query
  })
}
//根据status属性分页
export function getCommentsbystatus(query) {
  return request({
    url: '/comment/getCommentsbystatus',
    method: 'get',
    params: query
  })
}
//根据notification属性分页
export function getCommentsbynotification(query) {
  return request({
    url: '/comment/getCommentsbynotification',
    method: 'get',
    params: query
  })
}

export function addComment(data) {
  return request({
    url: '/comment/addComment',
    method: 'post',
    data
  })
}
export function switchnotificationbyid(data) {
  return request({
    url: '/comment/switchnotificationbyid',
    method: 'post',
    data
  })
}
export function switchstatus(data) {
  return request({
    url: '/comment/switchstatus',
    method: 'post',
    data
  })
}
export function deletecomment(data) {
  return request({
    url: '/comment/deletecomment',
    method: 'post',
    data
  })
}

export function clearNotification() {
  return request({
    url: '/comment/clearNotification',
    method: 'get',
  })
}
