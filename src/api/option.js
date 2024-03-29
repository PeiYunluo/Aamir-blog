import request from '@/utils/request'

//得到所有的options
export function getAll(query) {
  return request({
    url: '/aamirconfig/getAlloptions',
    method: 'get',
    params:query
  })
}
//编辑link
export function editOption(data) {
  return request({
    url: '/aamirconfig/editOption',
    method: 'post',
    data
  })
}
//找到一个option
export function findOption(data) {
  return request({
    url: '/aamirconfig/findOption',
    method: 'post',
    data
  })
}

export function switches(data) {
  return request({
    url: '/aamirconfig/switches',
    method: 'post',
    data
  })
}
