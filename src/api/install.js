import request from '@/utils/request'

export function install(data) {
  return request({
    url: '/user/install',
    method: 'post',
    data
  })
}
