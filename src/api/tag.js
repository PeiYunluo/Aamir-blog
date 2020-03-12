import request from '@/utils/request'

export function getAlltags() {
  return request({
    url: '/tag/getAlltags',
    method: 'get',
  })
}
