import request from '@/utils/request'

export function getAlltags() {
  return request({
    url: '/tag/getAlltags',
    method: 'get',
  })
}


export function getAll() {
  return request({
    url: '/tag/getAll',
    method: 'get',
  })
}

export function gettaglist(query) {
  return request({
    url: '/tag/list',
    method: 'get',
    params: query
  })
}

export function addTag(data) {
  return request({
    url:'tag/addTag',
    method:'post',
    data
  })

}
export function updateTagname(data) {
  return request({
    url:'tag/updateTagname',
    method:'post',
    data
  })

}
export function deleteTag(data) {
  return request({
    url:'tag/deleteTag',
    method:'post',
    data
  })

}
