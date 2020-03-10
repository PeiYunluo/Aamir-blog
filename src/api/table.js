import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/tag/taglist',
    method: 'get',
    params
  })
}
