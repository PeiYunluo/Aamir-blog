import request from '@/utils/request'

export function creatpost(data) {
  return request({
    url: '/post/create',
    method: 'post',
    data
  })
}

export function getposts(query) {
  return request({
    url: '/post/list',
    method: 'get',
    params: query
  })
}

export function deletePost(data) {
  return request({
    url: '/post/delete',
    method: 'post',
    data
  })
}

export function commentswitch(data) {
  return request({
    url: '/post/commentswitch',
    method: 'post',
    data
  })
}

export function gettagsbyid(data) {
  return request({
    url: '/post/gettagsbyid',
    method: 'post',
    data
  })
}

export function getcategoriesbyid(data) {
  return request({
    url: '/post/getcategoriesbyid',
    method: 'post',
    data
  })
}

export function updatePost(data) {
  return request({
    url: '/post/updatePost',
    method: 'post',
    data
  })
}

export function statusswitch(data) {
  return request({
    url: '/post/statusswitch',
    method: 'post',
    data
  })
}

export function getPostbyid(id) {
  return request({
    url: '/post/getPostbyid',
    method: 'get',
    params: id
  })
}
