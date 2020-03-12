import request from '@/utils/request'

export function creatpost(data) {
  return request({
    url: '/post/create',
    method: 'post',
    data
  })
}
