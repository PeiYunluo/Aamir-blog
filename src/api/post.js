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
