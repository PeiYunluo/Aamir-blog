import request from '@/utils/request'

export function getAllcategoies() {
  return request({
    url: '/category/getAll',
    method: 'get',

  })
}
